import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { name } from '../../common';
import { JwtSysGuard, RoleGuard } from '../../middlewares/guards';
import { AccountService } from './account.service';
import { QueryAccountDTO } from './dto';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@ApiSecurity('x-api-key')
@Controller('accounts')
@ApiTags('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }


  @Get()
  @UseGuards(JwtSysGuard, RoleGuard)
  @ApiBearerAuth(name.JWT)
  findAll(@Req() req: any, @Query() query: QueryAccountDTO) {
    return this.accountService.findAll(req, query);
  }

  @Get(':id')
  @UseGuards(JwtSysGuard, RoleGuard)
  @ApiBearerAuth(name.JWT)
  findOne(@Param('id') id: number) {
    return this.accountService.findOne(id);
  }
  @Post()
  @UseGuards(JwtSysGuard, RoleGuard)
  @ApiBearerAuth(name.JWT)
  create(@Req() req:any, @Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(req,createAccountDto);
  }
  @Post('initial')
  createInitial(@Body() body: CreateAccountDto) {
    return this.accountService.createInitial(body)
  }
  @Put(':id')
  @UseGuards(JwtSysGuard, RoleGuard)
  @ApiBearerAuth(name.JWT)
  update(@Req() req:any, @Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(req, +id, updateAccountDto);
  }

  @Delete(':id')
  @UseGuards(JwtSysGuard, RoleGuard)
  @ApiBearerAuth(name.JWT)
  remove(@Param('id') id: number) {
    return this.accountService.remove(id);
  }
}
