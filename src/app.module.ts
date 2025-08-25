import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinksModule } from './links/links.module';
import { Link } from './links/entities/link.entity';
import { Click } from './links/entities/click.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'sqlite',
    database:'link-shield.db',
    entities: [Link, Click],
    synchronize:true,
  }),LinksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
