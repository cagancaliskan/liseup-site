import { apiFetch } from "../api-client";

export type Message = { id: string; sender_id: string; receiver_id: string; content: string; is_read: boolean };

export const messagingApi = {
  getInbox:        () => apiFetch<Message[]>("/api/messaging/messages/inbox"),
  getConversation: (withUserId: string) => apiFetch<Message[]>(`/api/messaging/messages/conversation?with=${encodeURIComponent(withUserId)}`),
  sendMessage:     (body: Omit<Message, "id" | "sender_id" | "is_read">) => apiFetch<Message>("/api/messaging/messages", { method: "POST", body: JSON.stringify(body) }),
  markAsRead:      (id: string) => apiFetch<boolean>(`/api/messaging/messages/${id}/read`, { method: "PATCH" }),
  deleteMessage:   (id: string) => apiFetch<boolean>(`/api/messaging/messages/${id}`, { method: "DELETE" }),
};
