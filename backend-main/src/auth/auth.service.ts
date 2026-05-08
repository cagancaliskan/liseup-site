import { Injectable } from '@nestjs/common';
import { Role } from '../entities/role';
import { UserPayload } from './entities/user.payload';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SessionService } from './providers/SessionService';
import { satisfiesAny } from './roles/role-hierarchy';
import { AuthRepository } from '../persistence';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
    private readonly config: ConfigService,
    private readonly authRepo: AuthRepository,
  ) { }

  /**
   * Verifies the token and checks the caller's role against the hierarchy.
   *
   * @param roles  The roles required by the route (OR semantics — satisfying any one is enough).
   *               Empty array → any authenticated user is accepted.
   * @param token  Raw JWT access token (without "Bearer " prefix).
   */
  async validateUser(roles: Role[], token: string): Promise<UserPayload | null> {
    let payload: UserPayload;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      });
    } catch {
      return null;
    }

    if (!roles || roles.length === 0) {
      return payload;
    }

    return satisfiesAny(payload.role, roles) ? payload : null;
  }

  /**
   * Checks the user identity against the database, verifies the password,
   * and creates a session.
   * @param username  The user's email address
   * @param password  The plaintext password to verify
   * @param userAgent The client's user-agent string (used as device name)
   * @returns session tokens, or null in case of access denial
   */
  async signIn(username: string, password: string, userAgent: string): Promise<{ user: UserPayload; accessToken: string; refreshToken: string } | null> {
    const user = await this.authRepo.findUserByEmail(username);
    if (!user) return null;

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return null;

    const deviceInfo = {
      name: userAgent,
      ip: '127.0.0.1',
      deviceId: null,
    };

    return this.sessionService.createSession(
      { id: user.id, name: user.email, email: user.email },
      deviceInfo,
      user.role as Role,
    );
  }

}
