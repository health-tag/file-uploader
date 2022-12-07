import { ConsoleGateway } from 'gateways/console.gateway';
import {
  Body,
  Controller,
  Get,
  Delete,
  Post,
  UploadedFiles,
  UseInterceptors,
  Param,
  StreamableFile,
} from '@nestjs/common';
import { ConsoleLine } from '@shared/models/console';

@Controller('api/python')
export class PythonController {
  constructor(private readonly consoleGateway: ConsoleGateway) {}

  @Get()
  hello() {
    console.log('Python client send Hello');
    return 'OK';
  }

  @Post()
  postConsoleLog(@Body() consoleLine: ConsoleLine) {
    if (consoleLine.line !== '\n' && consoleLine.line !== '\r\n') {
      this.consoleGateway.addLog(consoleLine);
    }
  }

  @Get(':id/finish')
  finishLog(@Param('id') id: string) {
    console.log('finish ' + id);
    this.consoleGateway.finishLog(id);
  }

  @Get(':id/error')
  errorLog(@Param('id') id: string) {
    console.log('error ' + id);
    this.consoleGateway.errorLog(id);
  }
}
