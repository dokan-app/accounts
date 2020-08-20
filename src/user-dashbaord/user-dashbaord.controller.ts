import {
  Controller,
  Get,
  Render,
  UseGuards,
  Post,
  Body,
  Req,
  Res,
} from '@nestjs/common';
import { AuthenticatedUserGuard } from 'src/auth/guards/authenticated-user.guard';
import { UsersService } from 'src/users/users.service';
import { UpdateUserDTO, UpdatePasswordDTO } from 'src/users/user.dto';
import { AppRequest } from 'src/shared/types';
import { Response } from 'express';

@UseGuards(AuthenticatedUserGuard)
@Controller('user-dashboard')
export class UserDashbaordController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Render('user/root')
  index() {
    return;
  }

  @Post('/update-profile')
  updateProfile(
    @Body() data: UpdateUserDTO,
    @Req() req: AppRequest,
    @Res() res: Response,
  ) {
    this.userService.update(req.user._id, data);
    req.flash('successMsg', 'Profile updated successfully');
    res.redirect('back');
  }

  @Post('/update-password')
  updatePassword(
    @Body() data: UpdatePasswordDTO,
    @Req() req: AppRequest,
    @Res() res: Response,
  ) {
    this.userService.updatePassword(req.user._id, data.password);
    req.flash('successMsg', 'Password updated successfully');
    res.redirect('back');
  }
}
