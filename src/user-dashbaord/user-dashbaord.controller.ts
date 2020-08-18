import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AuthenticatedUserGuard } from 'src/auth/guards/authenticated-user.guard';

@Controller('user-dashboard')
@UseGuards(AuthenticatedUserGuard)
export class UserDashbaordController {
  @Get()
  @Render('user/root')
  index() {
    return;
  }
}
