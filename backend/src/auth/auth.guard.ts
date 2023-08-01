import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getAction } from '@nestjsx/crud';
import permissions from './permissions';

export const IS_PUBLIC_KEY = 'isPublic';
export const IS_IN_REGISTRATION_PROGRESS = 'IS_IN_REGISTRATION_PROGRESS';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const InRegistrationProgress = () =>
  SetMetadata(IS_IN_REGISTRATION_PROGRESS, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    const handler = context.getHandler();

    const feature = context
      .getClass()
      .name.replace(/Controller$/gi, '')
      .toLocaleLowerCase();
    const action = getAction(handler) || 'custom';
    const { user } = request;
    const isInRegistrationProgress = this.reflector.getAllAndOverride<boolean>(
      IS_IN_REGISTRATION_PROGRESS,
      [context.getHandler(), context.getClass()],
    );
    if (!user.is_verified && !isInRegistrationProgress) {
      throw new UnauthorizedException('user unverified');
    }

    const role = user?.role || 'public';
    const permission = permissions[role]?.[feature];

    if (permission) {
      let isAllow = false;
      permission.forEach((element) => {
        if (element === '*') {
          isAllow = true;
        }

        if (element === action) {
          isAllow = true;
        }
      });
      return isAllow;
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
