import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JobService } from '@services/job.service';
import { JobController } from 'controllers/job/job.controller';
import { join } from 'path';
import { ConsoleModule } from 'console.module';
import { PythonController } from 'controllers/python/python.controller';
import { MetaController } from 'controllers/meta/meta.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'client'),
      exclude: ['/api*'],
    }),
    HttpModule,
    ConsoleModule,
  ],
  controllers: [JobController, PythonController, MetaController],
  providers: [JobService],
})
export class AppModule {}
