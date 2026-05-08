import { Body, Controller, HttpCode, HttpStatus, Post, Query, Req, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth-type.decorator';
import { SessionService } from './providers/SessionService';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private sessionService: SessionService
  ) { }

  @Post('')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signInDto: { username: string; password: string } | null,
    @Req() request: Request
  ): Promise<any> {
    const result = !signInDto ? null : await this.authService.signIn(
      signInDto.username,
      signInDto.password,
      request.headers['user-agent'] // Express headers are lowercase
    );

    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return result;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Query('rt') refreshToken: string, @Req() request: Request): Promise<any> {
    if (!refreshToken) throw new UnauthorizedException('Refresh token required');

    return await this.sessionService.refreshSession(refreshToken);
  }

  @Auth()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async signOut(@Req() req: Request): Promise<any> {
    // In a real implementation this would call sessionService.revokeSession(req.user.sessionId)
    // For now we just return success as per the scope
    return { success: true };
  }
}
