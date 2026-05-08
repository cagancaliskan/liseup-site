import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { Auth } from '../auth/decorators/auth-type.decorator';
import { Role } from '../entities/role';
import { MessagingRepository } from '../persistence';
import type { NewMessage } from '../persistence';

@Controller('/api/messaging')
export class MessagingController {
  constructor(private readonly messaging: MessagingRepository) {}

  @Auth()
  @Get('messages/inbox')
  getInbox(@Req() req: Request) {
    const userId = (req as any).user.userId as string;
    return this.messaging.findByReceiverId(userId);
  }

  @Auth()
  @Get('messages/conversation')
  getConversation(@Req() req: Request, @Query('with') otherId: string) {
    const userId = (req as any).user.userId as string;
    return this.messaging.findConversation(userId, otherId);
  }

  @Auth()
  @Post('messages')
  sendMessage(@Req() req: Request, @Body() data: NewMessage) {
    const userId = (req as any).user.userId as string;
    return this.messaging.sendMessage({ ...data, sender_id: userId });
  }

  @Auth()
  @Patch('messages/:id/read')
  markAsRead(@Param('id') id: string) {
    return this.messaging.markAsRead(id);
  }

  @Auth(Role.Admin)
  @Delete('messages/:id')
  deleteMessage(@Param('id') id: string) {
    return this.messaging.deleteMessage(id);
  }
}
