import { Injectable } from '@nestjs/common';
import { PostgresProvider, DrizzleDB } from './postgres/postgres.provider';
import {
  AuthRepository,
  EducationRepository,
  TeamsRepository,
  CommerceRepository,
  MessagingRepository,
} from './abstracts';

@Injectable()
export class PersistenceFacade {
  constructor(
    public readonly auth: AuthRepository,
    public readonly education: EducationRepository,
    public readonly teams: TeamsRepository,
    public readonly commerce: CommerceRepository,
    public readonly messaging: MessagingRepository,
    private readonly pg: PostgresProvider,
  ) {}

  async transaction<T>(fn: (tx: DrizzleDB) => Promise<T>): Promise<T> {
    return this.pg.transaction(fn);
  }
}
