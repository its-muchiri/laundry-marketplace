import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateAddressDto, UpdateAddressDto } from './dto/address.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@CurrentUser() user: any) {
    const { passwordHash, otpCode, otpExpiresAt, ...sanitized } = user;
    return { user: sanitized };
  }

  @Get('me/addresses')
  @ApiOperation({ summary: 'Get user addresses' })
  async getAddresses(@CurrentUser() user: any) {
    const addresses = await this.usersService.findAddressesByUserId(user.userId);
    return { addresses };
  }

  @Post('me/addresses')
  @ApiOperation({ summary: 'Create a new address' })
  async createAddress(@CurrentUser() user: any, @Body() createAddressDto: CreateAddressDto) {
    const address = await this.usersService.createAddress({
      ...createAddressDto,
      userId: user.userId,
    });
    return { address };
  }

  @Patch('me/addresses/:id')
  @ApiOperation({ summary: 'Update an address' })
  async updateAddress(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    const address = await this.usersService.updateAddress(id, updateAddressDto);
    return { address };
  }

  @Delete('me/addresses/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an address' })
  async deleteAddress(@Param('id') id: string) {
    await this.usersService.deleteAddress(id);
  }

  @Patch('me/addresses/:id/default')
  @ApiOperation({ summary: 'Set address as default' })
  async setDefaultAddress(@CurrentUser() user: any, @Param('id') id: string) {
    await this.usersService.setDefaultAddress(user.userId, id);
    return { success: true };
  }
}
