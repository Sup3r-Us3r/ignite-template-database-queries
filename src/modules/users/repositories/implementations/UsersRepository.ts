import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = await this.repository.findOne({
      relations: ['games'],
      where: { id: user_id }
    });

    if (!user) {
      throw new Error('User does not exists!');
    }

    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    // Complete usando raw query
    return this.repository.query(
      'SELECT * FROM users u ORDER BY u.first_name'
    );
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    // Complete usando raw query
    return this.repository.query(
      'SELECT * FROM users u WHERE LOWER(u.first_name) = $1 AND LOWER(u.last_name) = $2',
      [
        first_name.toLowerCase(),
        last_name.toLowerCase(),
      ]
    );
  }
}
