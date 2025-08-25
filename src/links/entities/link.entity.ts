import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Click } from './click.entity';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  originalUrl: string;

  @Column({ unique: true })
  shortCode: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Click, (click) => click.link)
  clicks: Click[];
}