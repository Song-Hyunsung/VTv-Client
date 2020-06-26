import { Injectable } from '@angular/core';
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

  constructor(){ }

  establishWebSocketConnection(): void {
  	let socket = new SockJS(this.WEBSOCKET_SERVER_URL);
  	this.stompClient = Stomp.over(socket);

  	// Connect to stomp client, provide anonymous onConnect callback function and onError callback function
  	this.stompClient.connect({}, ()=>{
	  	this.stompClient.subscribe("/topic/public", this.onMessageReceived);
	  	this.stompClient.send("/app/chat.addUser", {}, JSON.stringify({ sender: "HARDCODED USERNAME", type: "JOIN" }));
  	}, this.onError);
  }

  onError(): void {
  	console.log("ON ERROR FUNCTION INVOKED");
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
