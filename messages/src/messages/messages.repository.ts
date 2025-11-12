import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessagesRepository {
  async findOne(id: string): Promise<string | null> {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    return messages[id] || null;
  }

  async findAll() {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    return messages;
  }

  async create(content: string): Promise<{ content: string, id: string }> {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    const id = Math.floor(Math.random() * 999).toString();
    messages[id] = { content, id };
    await writeFile('messages.json', JSON.stringify(messages, null, 2));
    return { content, id };
  }
}