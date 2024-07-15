import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { HttpService, HttpModule } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [HttpModule, UsersModule, ProductsModule, DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await firstValueFrom(
          http.get('https://jsonplaceholder.typicode.com/todos'),
        );
        return tasks;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
