import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Redis } from 'ioredis';
import { RedisService } from 'nestjs-redis';
import { SessionModule } from 'nestjs-session';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  private client: Redis;
  constructor(private readonly redis: RedisService) {
    this.client = redis.getClient('dokan-app');
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // this.client.get('')
    throw new UnauthorizedException();
  }
}
