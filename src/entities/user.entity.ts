import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserRoles } from '../user/user.roles.enums';

@Entity()
@Unique(['UserName', 'Email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  Id: number;

  @Column('varchar', {
    nullable: false,
  })
  UserName: string;

  @Column('varchar', {
    nullable: false,
  })
  Email: string;

  @Column('varchar', {
    nullable: false,
  })
  Password: string;

  @Column('varchar', {
    nullable: false,
  })
  Salt: string;

  @Column('int', {
    nullable: false,
  })
  Type: UserRoles;

  @Column('varchar', {
    nullable: true,
    
  })
  ProfileImg: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.Salt);

    return hash === this.Password;
  }
}


