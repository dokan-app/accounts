import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Session } from './session.model';

@Module({
  imports: [TypegooseModule.forFeature([Session])],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
