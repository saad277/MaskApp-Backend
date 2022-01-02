import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Media extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  Id: number;

  @Column('varchar')
  Description: string;

  @Column({ type: 'json' })
  Location: object;

  @Column('varchar')
  Area: string;

  @Column('int')
  WithMask: number;

  @Column('int')
  WithoutMask: number;

  @Column('int')
  UserId: number;

  @Column('varchar')
  Img: string;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;
}
