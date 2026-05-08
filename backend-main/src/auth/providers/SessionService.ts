import { ulid } from 'ulid';
import { UserPayload, DevicePayload } from '../entities/user.payload';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../../entities/role';
import { SessionStore } from '../store/session.store';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SessionService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly sessionStore: SessionStore,
        private readonly config: ConfigService,
    ) { }

    async generateTokens(userPayload: UserPayload): Promise<{ accessToken: string, refreshToken: string }> {
        // 1. Generate Access Token (Short-lived)
        const accessToken = await this.jwtService.signAsync(userPayload, {
            expiresIn: '15m',
            secret: this.config.get<string>('JWT_ACCESS_SECRET'),
        });

        // 2. Generate Refresh Token (Long-lived)
        // Keep this light to save bandwidth/storage
        const refreshToken = await this.jwtService.signAsync(
            { userId: userPayload.userId, sessionId: userPayload.sessionId },
            {
                expiresIn: '7d',
                secret: this.config.get<string>('JWT_REFRESH_SECRET'),
            }
        );

        return { accessToken, refreshToken }
    }

    async createSession(
        user: any,
        deviceInfo: any,
        role: Role,
    ): Promise<{
        user: UserPayload,
        accessToken: string,
        refreshToken: string
    }> {
        // In a real app, user.id usually comes from the DB, 
        // while sessionId is generated fresh for this login.
        const sessionId = ulid();
        const deviceId = deviceInfo.deviceId || ulid();

        // 1. Construct the Device Object
        const device: DevicePayload = {
            deviceId: deviceId,
            deviceName: deviceInfo.name || 'Unknown Device',
            ipAddress: deviceInfo.ip || '0.0.0.0',
            lastActivatedAt: new Date(),
            current: true
        };

        // 2. Construct the full UserPayload
        // This is what will be encoded into the Access Token
        const userPayload: UserPayload = {
            userId: user.id,
            sessionId: sessionId,
            userName: user.name,
            userEmail: user.email,
            role: role,
            rolePayload: {}, // Placeholder for future logic
            devices: [device] // Other devices can be found in database
        };

        // 3. Generate tokens
        const { accessToken, refreshToken } = await this.generateTokens(userPayload);

        // 4. save the sessions
        await this.sessionStore.saveSession(userPayload, refreshToken);

        return {
            user: userPayload,
            accessToken,
            refreshToken
        };
    }

    async refreshSession(oldRefreshToken: string): Promise<{
        user: UserPayload,
        accessToken: string,
        refreshToken: string
    }> {
        const payload = await this.jwtService.verifyAsync(oldRefreshToken, {
            secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        });
        // 2. Lookup session in DB
        const savedSession = await this.sessionStore.findSession(payload.sessionId);
        if (!savedSession) throw new Error('Session revoked or not found');

        // 3. Check hash (security check)
        const isMatch = await bcrypt.compare(oldRefreshToken, savedSession.tokenHash);
        if (!isMatch) throw new Error('Invalid token hash');

        // 4. Generate tokens
        const { accessToken, refreshToken } = await this.generateTokens(savedSession.userPayload);

        // 5. Save the new refreshToken hash back to the DB
        await this.sessionStore.saveSession(savedSession.userPayload, refreshToken);

        return { user: savedSession.userPayload, accessToken, refreshToken };
    }
}   