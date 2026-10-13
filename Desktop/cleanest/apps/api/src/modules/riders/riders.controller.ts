import { Controller, Get, Post, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RidersService } from './riders.service';
import { CreateRiderDto, UpdateRiderDto, UpdateLocationDto } from './dto/rider.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole } from '@laundry/shared';

@ApiTags('riders')
@Controller('riders')
export class RidersController {
  constructor(private ridersService: RidersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current rider profile' })
  async getMyProfile(@CurrentUser() user: any) {
    const rider = await this.ridersService.findByUserId(user.userId);
    return { rider };
  }

  @Post('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create rider profile (onboarding)' })
  async createRider(@CurrentUser() user: any, @Body() createRiderDto: CreateRiderDto) {
    const rider = await this.ridersService.create({
      ...createRiderDto,
      userId: user.userId,
      verificationStatus: 'pending' as any,
    });
    return { rider };
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update rider profile' })
  async updateRider(@CurrentUser() user: any, @Body() updateRiderDto: UpdateRiderDto) {
    const rider = await this.ridersService.findByUserId(user.userId);
    if (!rider) {
      return { error: 'Rider profile not found' };
    }
    const updated = await this.ridersService.update(rider.id, updateRiderDto);
    return { rider: updated };
  }

  @Patch('me/location')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update rider location' })
  async updateLocation(@CurrentUser() user: any, @Body() updateLocationDto: UpdateLocationDto) {
    const rider = await this.ridersService.findByUserId(user.userId);
    if (!rider) {
      return { error: 'Rider profile not found' };
    }
    const updated = await this.ridersService.updateLocation(
      rider.id,
      updateLocationDto.latitude,
      updateLocationDto.longitude,
    );
    return { rider: updated };
  }

  @Patch('me/availability')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update rider availability' })
  async updateAvailability(@CurrentUser() user: any, @Body() body: { isAvailable: boolean }) {
    const rider = await this.ridersService.findByUserId(user.userId);
    if (!rider) {
      return { error: 'Rider profile not found' };
    }
    const updated = await this.ridersService.updateAvailability(rider.id, body.isAvailable);
    return { rider: updated };
  }

  // Admin endpoints
  @Get('admin/pending')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get riders pending approval (admin)' })
  async getPendingRiders(@CurrentUser() user: any) {
    if (user.role !== UserRole.ADMIN) {
      return { error: 'Forbidden' };
    }
    // TODO: Implement findPendingApproval in service
    return { riders: [] };
  }

  @Patch('admin/:id/approve')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Approve rider (admin)' })
  async approveRider(@CurrentUser() user: any, @Param('id') id: string) {
    if (user.role !== UserRole.ADMIN) {
      return { error: 'Forbidden' };
    }
    const rider = await this.ridersService.updateVerificationStatus(id, 'approved' as any);
    return { rider };
  }

  @Patch('admin/:id/reject')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reject rider (admin)' })
  async rejectRider(@CurrentUser() user: any, @Param('id') id: string) {
    if (user.role !== UserRole.ADMIN) {
      return { error: 'Forbidden' };
    }
    const rider = await this.ridersService.updateVerificationStatus(id, 'rejected' as any);
    return { rider };
  }
}
