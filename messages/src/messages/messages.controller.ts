/**
 * This controller was generated using the NestJS CLI.
 * Command: nest generate controller messages/messages --flat
 * --flat avoids creating a subfolder for the controller.
 */

import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {
    return 'Message list';
  }

  @Post()
  createMessage() {
    return 'Message created';
  }

  @Get('/:id')
  getMessage() {
    return 'Message details';
  }
}
