import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
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
