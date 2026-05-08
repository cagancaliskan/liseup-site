import { Injectable } from '@nestjs/common';
import { eq, or, and } from 'drizzle-orm';
import { MessagingRepository, Message, NewMessage } from '../abstracts';
import { PostgresProvider } from './postgres.provider';
import { messages } from '../schema';

@Injectable()
export class PgMessagingRepository extends MessagingRepository {
  constructor(private readonly pg: PostgresProvider) {
    super();
  }

  private get db() {
    return this.pg.db;
  }

  async findMessageById(id: string): Promise<Message | null> {
    const rows = await this.db.select().from(messages).where(eq(messages.id, id));
    return rows[0] ?? null;
  }

  async findConversation(userA: string, userB: string): Promise<Message[]> {
    return this.db
      .select()
      .from(messages)
      .where(
        or(
          and(eq(messages.sender_id, userA), eq(messages.receiver_id, userB)),
          and(eq(messages.sender_id, userB), eq(messages.receiver_id, userA)),
        ),
      )
      .orderBy(messages.id);
  }

  async findByReceiverId(receiverId: string): Promise<Message[]> {
    return this.db.select().from(messages).where(eq(messages.receiver_id, receiverId));
  }

  async sendMessage(data: NewMessage): Promise<Message> {
    const rows = await this.db.insert(messages).values(data).returning();
    return rows[0];
  }

  async markAsRead(id: string): Promise<boolean> {
    const rows = await this.db
      .update(messages)
      .set({ is_read: true })
      .where(eq(messages.id, id))
      .returning();
    return rows.length > 0;
  }

  async deleteMessage(id: string): Promise<boolean> {
    const rows = await this.db.delete(messages).where(eq(messages.id, id)).returning();
    return rows.length > 0;
  }
}
