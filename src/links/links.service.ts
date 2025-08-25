import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { Click } from './entities/click.entity';


@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private linksRepository: Repository<Link>,
    @InjectRepository(Click)
    private clicksRepository: Repository<Click>,
  ) {}

  // Generar un código corto aleatorio
  private generateShortCode(length: number = 6): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // Crear un nuevo link acortado
  async createShortLink(originalUrl: string): Promise<Link> {
    const shortCode = this.generateShortCode();
    
    // Verificar que el código no exista (aunque es poco probable)
    const existingLink = await this.linksRepository.findOne({ where: { shortCode } });
    if (existingLink) {
      // Si existe, generar otro código (recursivo)
      return this.createShortLink(originalUrl);
    }

    const newLink = this.linksRepository.create({
      originalUrl,
      shortCode,
    });

    return await this.linksRepository.save(newLink);
  }

  // Encontrar un link por su código corto
  async findLinkByCode(shortCode: string): Promise<Link | null> {
    return await this.linksRepository.findOne({ 
      where: { shortCode },
      relations: ['clicks'] 
    });
  }

  // Registrar un click en un link
  async addClick(linkId: number, ipAddress?: string): Promise<Click> {
    const link = await this.linksRepository.findOne({ where: { id: linkId } });
    if (!link) {
      throw new Error('Link no encontrado');
    }

    const newClick = this.clicksRepository.create({
      link,
      ipAddress,
    });

    return await this.clicksRepository.save(newClick);
  }

  // Obtener estadísticas de un link
  async getLinkStats(shortCode: string): Promise<{ link: Link, clickCount: number }> {
    const link = await this.findLinkByCode(shortCode);
    if (!link) {
      throw new Error('Link no encontrado');
    }

    const clickCount = link.clicks ? link.clicks.length : 0;

    return {
      link,
      clickCount,
    };
  }
}