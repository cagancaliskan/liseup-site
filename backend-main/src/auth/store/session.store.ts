import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserPayload, SessionRecord } from '../entities/user.payload';
import { AuthRepository } from '../../persistence';
import { Role } from '../../entities/role';

@Injectable()
export class SessionStore {
    constructor(private readonly authRepo: AuthRepository) {}

    async saveSession(payload: UserPayload, refreshToken: string): Promise<void> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(refreshToken, salt);

        const existing = await this.authRepo.findSessionById(payload.sessionId);
        if (existing) {
            await this.authRepo.updateSession(payload.sessionId, {
                refresh_token: hash,
            });
        } else {
            await this.authRepo.createSession({
                id: payload.sessionId,
                user_id: payload.userId,
                user_agent: payload.devices[0]?.deviceName ?? 'Unknown',
                refresh_token: hash,
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            });
        }
    }

    async findSession(sessionId: string): Promise<SessionRecord | null> {
        const session = await this.authRepo.findSessionById(sessionId);
        if (!session) return null;

        const user = await this.authRepo.findUserById(session.user_id);
        if (!user) return null;

        return {
            tokenHash: session.refresh_token,
            userPayload: {
                userId: session.user_id,
                sessionId: session.id,
                userName: user.email,
                userEmail: user.email,
                role: user.role as Role,
                rolePayload: {},
                devices: [],
            },
            expiresAt: session.expires_at ?? new Date(),
        };
    }

    async deleteSession(sessionId: string): Promise<boolean> {
        return this.authRepo.deleteSession(sessionId);
    }

    async deleteUserSessions(userId: string): Promise<number> {
        return this.authRepo.deleteSessionsByUserId(userId);
    }
}
