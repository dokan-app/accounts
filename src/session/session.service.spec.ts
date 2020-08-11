// import { SessionService } from './session.service';
// import { AppTestingModule } from 'src/utils/AppTestingModule';
// import { sessionSchema, Session } from './session.schema';
// import { Model } from 'mongoose';

// describe('SessionService', () => {
//   let sessionService: SessionService;
//   let sessionModel: Model<Session>;

//   beforeEach(async () => {
//     const { service, model } = await AppTestingModule<SessionService>({
//       mongooseModelName: 'Session',
//       mongooseSchema: sessionSchema,
//       serviceClass: SessionService,
//     });

//     sessionService = service;
//     sessionModel = model;

//     await sessionModel.remove({});
//   });

//   it('should be defined', () => {
//     expect(sessionService).toBeDefined();
//   });
// });
