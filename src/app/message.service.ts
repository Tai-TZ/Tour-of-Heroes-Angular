import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  messages: string[] = []

  add(messageIn: string) {
    this.messages.push(messageIn)
  }

  clear() {
    this.messages = []
  }
}
