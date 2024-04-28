import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Inbox {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  messageId: string;

  @Column()
  pattern: string;

  @Column({ enum: ['pending', 'processed'] })
  status: 'pending' | 'processed';

  @Column({ type: 'json' })
  payload: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
