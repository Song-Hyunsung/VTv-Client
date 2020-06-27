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

  constructor(private router: Router){ }

  establishWebSocketConnection(username: String): void {
  	let socket = new SockJS(this.WEBSOCKET_SERVER_URL);
  	this.stompClient = Stomp.over(socket);

  	// Connect to stomp client, provide anonymous onConnect callback function and onError callback function
  	this.stompClient.connect({}, ()=>{
	  	this.stompClient.subscribe("/topic/public", this.onMessageReceived);
	  	this.stompClient.send("/app/chat.addUser", {}, JSON.stringify({ sender: username, type: "JOIN" }));
      this.router.navigate(['/room']);
  	}, this.onError);
  }

  onError(): void {
    alert("Service is not available at this moment, Please try again later");
    console.log("onError method in ChatService invoked");
    this.router.navigate(["/"]);

  }

  onMessageReceived(payload: any): void {
  	let message: any = JSON.parse(payload.body);

  	if(message.type === "JOIN"){
  		console.log("ON MESSAGE RECEIVED: USER JOINED");
  	} else if(message.type === "LEAVE"){
  		console.log("ON MESSAGE RECEIVED: USER LEFT");
  	} else {
  		console.log("ON MESSAGE RECEIVED: USER SENT MESSAGE");
  	}
  }
}
