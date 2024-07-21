import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    const apiKey = this.configService.get('API_KEY');
    const database = this.configService.get('DATABASE_NAME');
    return `Hello World!, we are using the API KEY: ${apiKey} and the Database ${database}`;
  }
}
