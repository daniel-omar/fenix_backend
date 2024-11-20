import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import * as request from 'supertest';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService, private userService: UserService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    // console.log(context)
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token,
        {
          secret: process.env.JWT_SEED
        }
      );

      const user = await this.userService.findById(payload.id_usuario);
      if (!user) throw new UnauthorizedException("User does not exists");
      if (!user.es_activo) throw new UnauthorizedException("User is not active");

      request['user'] = user;
      request['token'] = token;
    } catch {
      throw new UnauthorizedException();
    }

    return Promise.resolve(true);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers["authorization"]?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}