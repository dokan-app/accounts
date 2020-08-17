import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppValidationPipe } from './utils/AppValidationPipe';

/**
 * Session and passport
 */
import * as session from 'express-session';
import flash = require('connect-flash');
import * as passport from 'passport';
import * as cookie from 'cookie-parser';

import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PageNotFoundExceptionFilter } from './shared/filters/PageNotFound.filters';
import { ValidationExceptionFilter } from './shared/filters/ValidationError.filters';
import { PermissionDeniedExceptionFilter } from './shared/filters/PermissionDeniedExceptionFilter';
import { ForbiddenExceptionFilter } from './shared/filters/ForbiddenExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const express = app.getHttpAdapter().getInstance();
  app.useGlobalPipes(new AppValidationPipe());

  /**
   * Initialize config
   */
  const config = app.get(ConfigService);

  /**
   * Template engine
   */
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.set('view engine', 'pug');
  express.locals.basedir = join(__dirname, '../views');
  app.set('views', join(__dirname, '../views'));

  const options = new DocumentBuilder()
    .setTitle('Dokan OAuth API')
    .setDescription('Dokan OAuth API documentation')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  app.use(
    session({
      secret: config.get('APP_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
  );

  /**
   * Initialize Passport
   */
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(cookie());

  app.use(function(req, res, next) {
    res.locals.isAutenticated = req.isAuthenticated();
    res.locals.user = req.user;
    res.locals.errorMsg = req.flash('errorMsg');
    res.locals.successMsg = req.flash('successMsg');
    res.locals.errors = req.flash('errors')[0] || {};
    res.locals.dump = function(obj: any) {
      return JSON.stringify(obj, undefined, 4);
    };
    next();
  });

  app.useGlobalFilters(new ForbiddenExceptionFilter());
  app.useGlobalFilters(new PageNotFoundExceptionFilter());
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalFilters(new PermissionDeniedExceptionFilter());

  const port = config.get<string>('PORT');
  await app.listen(port || 3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
