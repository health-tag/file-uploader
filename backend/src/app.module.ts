import { Module } from '@nestjs/common';
import { JobService } from '@services/job.service';
import { JobController } from 'controllers/job/job.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, JobController],
  providers: [AppService, JobService],
})
export class AppModule {}
