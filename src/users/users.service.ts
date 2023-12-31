import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  findOneBy(id: number) {
    return this.repo.findOne({id}); //returns one or null
  }

  find(email: string) {
    return this.repo.find({where: {email}}); //returns an array of all the matches if there is no                             
  }                                 //we reveive an empty array

  async update(id: number, attrs: Partial<User>) { //asyncbronus operation thats why await
    const user = await this.findOneBy(id); 
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs) //all props and values of users on attrs are getting overwritten
    return this.repo.save(user); //user saved to repository


  } //<User> reference to entity. Partial means that the object passed inside attrs
    //has no, one, or all the propertie of the user defined in the entity User

  async remove(id: number) {
    const user = await this.findOneBy(id);
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return this.repo.remove(user)

  }
}
