import { Role } from '../../entities/role';

export type UserPayload = {
  // Base user info
  userId: string,
  sessionId: string,
  userName: string,
  userEmail: string,
  // Role info
  role: Role,
  rolePayload: any,
  // Current device info
  devices: DevicePayload[]
};

export type DevicePayload = {
  deviceId: string,
  deviceName: string,
  ipAddress: string,
  lastActivatedAt: Date,
  current: boolean
};

export type SessionRecord = {
  tokenHash: string;
  userPayload: UserPayload;
  expiresAt: Date;
};
// Role specific payloads will be defined in the future.