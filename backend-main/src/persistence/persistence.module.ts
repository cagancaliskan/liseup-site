import { Global, Module } from '@nestjs/common';
import { PostgresProvider } from './postgres/postgres.provider';
import { PersistenceFacade } from './persistence.facade';

import {
  AuthRepository,
  EducationRepository,
  TeamsRepository,
  CommerceRepository,
  MessagingRepository,
} from './abstracts';

import { PgAuthRepository } from './postgres/auth.repository.impl';
import { PgEducationRepository } from './postgres/education.repository.impl';
import { PgTeamsRepository } from './postgres/teams.repository.impl';
import { PgCommerceRepository } from './postgres/commerce.repository.impl';
import { PgMessagingRepository } from './postgres/messaging.repository.impl';

const repositoryBindings = [
  { provide: AuthRepository, useClass: PgAuthRepository },
  { provide: EducationRepository, useClass: PgEducationRepository },
  { provide: TeamsRepository, useClass: PgTeamsRepository },
  { provide: CommerceRepository, useClass: PgCommerceRepository },
  { provide: MessagingRepository, useClass: PgMessagingRepository },
];

@Global()
@Module({
  providers: [
    PostgresProvider,
    ...repositoryBindings,
    PersistenceFacade,
  ],
  exports: [
    PersistenceFacade,
    ...repositoryBindings.map((b) => b.provide),
  ],
})
export class PersistenceModule {}
