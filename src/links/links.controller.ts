import { Controller, Get, Post, Param, Body, Redirect, Res, Req, HttpStatus } from '@nestjs/common';
import { Response,Request } from 'express';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  // Acortar una URL
  @Post()
  async createShortLink(@Body('url') originalUrl: string) {
    if (!originalUrl) {
      return { error: 'URL es requerida' };
    }

    try {
      new URL(originalUrl); // Validar que es una URL válida
    } catch (e) {
      return { error: 'URL no válida' };
    }

    const link = await this.linksService.createShortLink(originalUrl);
    return { 
      originalUrl: link.originalUrl, 
      shortUrl: `http://localhost:3000/links/${link.shortCode}`,
      shortCode: link.shortCode 
    };
  }

  // Redirigir a la URL original
  @Get(':code')
  @Redirect()
  async redirectToOriginal(
    @Param('code') code: string,
    @Res() res: Response,
    @Req() request: Request
  ) {
    const link = await this.linksService.findLinkByCode(code);
    
    if (!link) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: 'Link no encontrado' });
    }
    //capturamos la IP
    const ipAddress = request.ip || 
                   request.connection?.remoteAddress || 
                   request.headers['x-forwarded-for'] || 
                   'unknown';
    // Registrar el click
    await this.linksService.addClick(link.id,ipAddress as string);

    return { url: link.originalUrl, statusCode: 302 };
  }

  // Obtener estadísticas de un link
  @Get(':code/stats')
  async getLinkStats(@Param('code') code: string) {
    try {
      const stats = await this.linksService.getLinkStats(code);
      return {
        originalUrl: stats.link.originalUrl,
        shortCode: stats.link.shortCode,
        createdAt: stats.link.createdAt,
        clickCount: stats.clickCount,
        clicks: stats.link.clicks
      };
    } catch (error) {
      return { error: error.message };
    }
  }
}