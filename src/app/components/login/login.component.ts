import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	username: String = "";

  constructor(private chatService: ChatService){
  }

  ngOnInit(): void {
  }

  connectToRoom(): void {
    this.chatService.establishWebSocketConnection();
  }





}
