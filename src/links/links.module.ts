import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { Link } from './entities/link.entity';
import { Click } from './entities/click.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Link, Click])],
  providers: [LinksService],
  controllers: [LinksController],
})
export class LinksModule {}