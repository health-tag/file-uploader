import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JobService } from '@services/job.service';
import { JobController } from 'controllers/job/job.controller';
import { join } from 'path';
import { ConsoleModule } from 'console.module';
import { PythonController } from 'controllers/job/python.controller';
import { ConsoleGateway } from 'gateways/console.gateway';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'client'),
      exclude: ['/api*'],
    }),
    HttpModule,
    ConsoleModule,
  ],
  controllers: [JobController, PythonController],
  providers: [JobService],
})
export class AppModule {}
