import { Body, Controller, Post, Get, Patch, Param, Query, Delete} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }

  @Get('/:id') //it alsways loks at the string string needs to be parsed as a number
  findUser(@Param('id') id: string) { //paerse handles this
    return this.usersService.findOne(parseInt(id));

  }

  @Get() 
  findAllUsers(@Query('email') email: string) { 
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/id') 
  UpdateUser(id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

}
