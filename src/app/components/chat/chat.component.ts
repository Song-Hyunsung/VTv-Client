import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
	messageInput: String = "";

  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
  }

  sendMessage(): void {
	if(this.messageInput){
		this.chatService.sendMessage(this.messageInput);
	}

  	this.messageInput = "";
  }

  showAll(): void {
 		console.log(this.chatService.messageArray);
  }

}
