import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Link } from './link.entity';

@Entity()
export class Click {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ nullable: true })
  ipAddress: string;

  @ManyToOne(() => Link, (link) => link.clicks, { onDelete: 'CASCADE' })
  link: Link;
}