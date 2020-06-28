import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
declare var SockJS: any;
declare var Stomp: any;

@Injectable({
  providedIn: 'root'
})

export class ChatService {
	// CONSTANT for the websocket server URL
	// TODO -> Set in config or env variable
	WEBSOCKET_SERVER_URL: String = "http://localhost:7000/ws";
	// Variable for stomp client
	stompClient: any;
  username: String;
  // Temporary in-memory array to store messages
  messageArray: String[] = [];

  constructor(private router: Router){ }

  establishWebSocketConnection(username: String): void {
  	let socket = new SockJS(this.WEBSOCKET_SERVER_URL);
  	this.stompClient = Stomp.over(socket);
    this.username = username;

  	// Connect to stomp client, provide anonymous onConnect callback function and onError callback function
  	this.stompClient.connect({}, this.onConnect.bind(this, username), this.onError);
  }

  onConnect(username: String): void {
    this.stompClient.subscribe("/topic/public", this.onMessageReceived.bind(this));
    this.stompClient.send("/app/chat.addUser", {}, JSON.stringify({ sender: username, type: "JOIN" }));
    this.router.navigate(['/room']);
  }

  onError(): void {
    alert("Service is not available at this moment, Please try again later");
    console.log("onError method in ChatService invoked");
    this.router.navigate(["/"]);
  }

  onMessageReceived(payload: any): void {
  	let message: any = JSON.parse(payload.body);

  	if(message.type === "JOIN"){
      this.messageArray.push(message.sender + " joined the room");
  	} else if(message.type === "LEAVE"){
      this.messageArray.push(message.sender + " left the room");
  	} else {
      this.messageArray.push(message.sender + ": " + message.content);
  	}
  }

  sendMessage(message: String): void {
    if(message && this.stompClient){
      let chatMessage = {
        sender: this.username,
        content: message,
        type: "CHAT"
      };

      this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
    }
  }
}
