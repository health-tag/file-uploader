import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JobService } from '@services/job.service';
import { JobController } from 'controllers/job/job.controller';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'client'),
      exclude: ['/api*'],
    }),
    HttpModule,
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class AppModule {}
