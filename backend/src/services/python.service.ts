import * as child_process from 'child_process';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PythonService {
  constructor() {
    const process = child_process.spawn('bash', ['my/path/to/script.sh']);
    process.stdout.on('data', (data) => {
      //grep.stdin.write(data);
    });

    process.stderr.on('data', (data) => {
      console.error(`ps stderr: ${data}`);
    });

    process.on('exit', (code) => {
      console.log('Child exited');
    });
  }
}
