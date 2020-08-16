import {
  Controller,
  Get,
  Render,
  Post,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root(): any {
    return { title: 'Home' };
  }
}
