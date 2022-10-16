import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
} from '@nestjs/websockets';
import { ConsoleLine } from '@shared/models/console';
import {} from '@nestjs/platform-ws';
import { WebSocket, WebSocketServer as Server } from 'ws';

@WebSocketGateway({ path: '/ws', cors: { origin: '*' } })
export class ConsoleGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  logs = {};

  /*@SubscribeMessage('events')
  onEvent(client: any, data: any): WsResponse {
    return { event: 'events', data: data.data };
  }*/

  addLog(consoleLine: ConsoleLine) {
    if (!Object.hasOwn(this.logs, consoleLine.jobId)) {
      this.logs[consoleLine.jobId] = new Array<ConsoleLine>();
    }
    consoleLine['order'] = this.logs[consoleLine.jobId].length;
    this.logs[consoleLine.jobId].push(consoleLine);
    console.log('addLog');
    this.broadcast('log', consoleLine);
  }

  finishLog(logId: string) {
    if (Object.hasOwn(this.logs, logId)) {
      delete this.logs[logId];
    }
    console.log(`Send finishLog to clients`);
    this.broadcast('finishLog', logId);
  }

  errorLog(logId: string) {
    if (Object.hasOwn(this.logs, logId)) {
      delete this.logs[logId];
    }
    console.log(`Send errorLog to clients`);
    this.broadcast('errorLog', logId);
  }

  async handleConnection(client: WebSocket) {
    console.log(`Client is connected.`);
    this.send(client, 'currentLogs', this.logs);
  }
  async handleDisconnect(client: WebSocket) {
    console.log(`Client is disconnected.`);
  }

  private send(client: WebSocket, eventName: string, data: any) {
    let prep: WsResponse = { event: eventName, data: data };
    let payload = JSON.stringify(prep);
    client.send(payload);
  }

  private broadcast(eventName: string, data: any) {
    let prep: WsResponse = { event: eventName, data: data };
    let payload = JSON.stringify(prep);
    this.server.clients.forEach((c) => {
      c.send(payload);
    });
  }
}
