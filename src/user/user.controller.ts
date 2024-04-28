import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';


@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@GetUser('id') userId: number) {
    return userId;
  }

  @Patch()
  editUser() {}
}
