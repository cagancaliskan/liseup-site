import { messages } from '../schema';

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;

export abstract class MessagingRepository {
  abstract findMessageById(id: string): Promise<Message | null>;
  abstract findConversation(userA: string, userB: string): Promise<Message[]>;
  abstract findByReceiverId(receiverId: string): Promise<Message[]>;
  abstract sendMessage(data: NewMessage): Promise<Message>;
  abstract markAsRead(id: string): Promise<boolean>;
  abstract deleteMessage(id: string): Promise<boolean>;
}
