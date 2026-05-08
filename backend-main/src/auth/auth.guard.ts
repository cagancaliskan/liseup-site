import { 
  Injectable, 
  CanActivate, 
  ExecutionContext, 
  UnauthorizedException 
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { AUTH_TYPE_KEY } from './decorators/auth-type.decorator';
import { Role } from '../entities/role';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private authService: AuthService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // 1. Read the 'type' (e.g., 'vendor', 'user') from the Metadata set by our decorators
        const roles = this.reflector.getAllAndOverride<Role[]>(AUTH_TYPE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // If the route doesn't have the @Auth decorators, we allow it (it's public)
        // Or you can return false here to force everything to be private by default.
        if (!roles) {
            return true;
        }

        const request: Request = context.switchToHttp().getRequest();
        // Split authorization header, so that we can get the bearer token.
        const tokenSplit = request.headers.authorization?.split(" ");

        // Verify header value.
        if (!tokenSplit || tokenSplit.length != 2) throw new UnauthorizedException();

        const token = tokenSplit[1];

        try {
            // 2. Ask AuthService to find the right strategy and validate
            const user = await this.authService.validateUser(roles, token);

            if (!user) {
                throw new UnauthorizedException('Invalid credentials');
            }

            // 3. Attach the validated user to the request object
            // This allows you to use @Request() req in your controller later
            request['user'] = user;

            return true;
        } catch (error) {
            throw new UnauthorizedException(error.message || 'Authentication failed');
        }
    }
}