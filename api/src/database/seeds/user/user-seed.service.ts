import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from '../../../roles/roles.enum';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { Users } from '../../../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(Users)
    private repository: Repository<Users>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count({
      where: {
        role: 'admin',
      },
    });

    if (!countAdmin) {
      await this.repository.save(
        this.repository.create({
          name: 'Super Admin',
          email: 'admin@example.com',
          password: 'secret',
          role: 'admin',
        }),
      );
    }

    const countUser = await this.repository.count({
      where: {
        role: 'user',
      },
    });

    if (!countUser) {
      await this.repository.save(
        this.repository.create({
          name: 'John',
          email: 'john.doe@example.com',
          password: 'secret',
          role: 'admin',
        }),
      );
    }
  }
}
