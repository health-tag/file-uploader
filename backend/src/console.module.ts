import { Module } from '@nestjs/common';
import { ConsoleGateway } from 'gateways/console.gateway';

@Module({
  providers: [ConsoleGateway],
  exports: [ConsoleGateway]
})
export class ConsoleModule {}