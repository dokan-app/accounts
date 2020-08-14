import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppValidationPipe } from './utils/AppValidationPipe';
import * as hbs from 'hbs';

/**
 * Session and passport
 */
import * as session from 'express-session';
import flash = require('connect-flash');
import * as passport from 'passport';

import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new AppValidationPipe());
  const config = app.get(ConfigService);

  /**
   * Template engine
   */
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  app.setViewEngine('hbs');

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

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.use(function(req, res, next) {
    res.locals.isAutenticated = req.isAuthenticated();
    res.locals.user = req.user;
    res.locals.errorMsg = req.flash('errorMsg');
    next();
  });

  const port = config.get<string>('PORT');
  await app.listen(port || 3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
