import { MessagesRepository } from "./messages.repository";

export class MessagesService {
  private messagesRepository: MessagesRepository;

  constructor() {
    // WILL BE INJECTED LATER VIA DEPENDENCY INJECTION
    this.messagesRepository = new MessagesRepository();
  }

  async findOne(id: string) {
    return this.messagesRepository.findOne(id);
  }

  async findAll() {
    return this.messagesRepository.findAll();
  }

  async create(content: string) {
    return this.messagesRepository.create(content);
  }
}