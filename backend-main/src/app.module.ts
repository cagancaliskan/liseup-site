import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from './persistence';
import { validate } from './config/env.config';
import { EducationModule } from './education/education.module';
import { TeamsModule } from './teams/teams.module';
import { CommerceModule } from './commerce/commerce.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
      isGlobal: true,
      validate,
    }),
    PersistenceModule,
    AuthModule,
    EducationModule,
    TeamsModule,
    CommerceModule,
    MessagingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
