import { Controller, Get, Post, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProvidersService } from './providers.service';
import {
  CreateProviderDto,
  UpdateProviderDto,
  CreateServiceItemDto,
  UpdateServiceItemDto,
} from './dto/provider.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole } from '@laundry/shared';

@ApiTags('providers')
@Controller('providers')
export class ProvidersController {
  constructor(private providersService: ProvidersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current provider profile' })
  async getMyProfile(@CurrentUser() user: any) {
    const provider = await this.providersService.findByUserId(user.userId);
    return { provider };
  }

  @Post('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create provider profile (onboarding)' })
  async createProvider(@CurrentUser() user: any, @Body() createProviderDto: CreateProviderDto) {
    const provider = await this.providersService.create({
      ...createProviderDto,
      userId: user.userId,
      verificationStatus: 'pending' as any,
    });
    return { provider };
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update provider profile' })
  async updateProvider(@CurrentUser() user: any, @Body() updateProviderDto: UpdateProviderDto) {
    const provider = await this.providersService.findByUserId(user.userId);
    if (!provider) {
      return { error: 'Provider profile not found' };
    }
    const updated = await this.providersService.update(provider.id, updateProviderDto);
    return { provider: updated };
  }

  @Get('me/service-items')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get provider service items' })
  async getServiceItems(@CurrentUser() user: any) {
    const provider = await this.providersService.findByUserId(user.userId);
    if (!provider) {
      return { items: [] };
    }
    const items = await this.providersService.findServiceItemsByProviderId(provider.id);
    return { items };
  }

  @Post('me/service-items')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a service item' })
  async createServiceItem(
    @CurrentUser() user: any,
    @Body() createServiceItemDto: CreateServiceItemDto,
  ) {
    const provider = await this.providersService.findByUserId(user.userId);
    if (!provider) {
      return { error: 'Provider profile not found' };
    }
    const item = await this.providersService.createServiceItem({
      ...createServiceItemDto,
      providerId: provider.id,
    });
    return { item };
  }

  @Patch('me/service-items/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a service item' })
  async updateServiceItem(
    @Param('id') id: string,
    @Body() updateServiceItemDto: UpdateServiceItemDto,
  ) {
    const item = await this.providersService.updateServiceItem(id, updateServiceItemDto);
    return { item };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get provider by ID (public)' })
  async getProvider(@Param('id') id: string) {
    const provider = await this.providersService.findById(id);
    return { provider };
  }

  @Get(':id/service-items')
  @ApiOperation({ summary: 'Get provider service items (public)' })
  async getProviderServiceItems(@Param('id') id: string) {
    const items = await this.providersService.findServiceItemsByProviderId(id);
    return { items };
  }

  // Admin endpoints
  @Get('admin/pending')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get providers pending approval (admin)' })
  async getPendingProviders(@CurrentUser() user: any) {
    if (user.role !== UserRole.ADMIN) {
      return { error: 'Forbidden' };
    }
    const providers = await this.providersService.findPendingApproval();
    return { providers };
  }

  @Patch('admin/:id/approve')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Approve provider (admin)' })
  async approveProvider(@CurrentUser() user: any, @Param('id') id: string) {
    if (user.role !== UserRole.ADMIN) {
      return { error: 'Forbidden' };
    }
    const provider = await this.providersService.updateVerificationStatus(id, 'approved' as any);
    return { provider };
  }

  @Patch('admin/:id/reject')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reject provider (admin)' })
  async rejectProvider(@CurrentUser() user: any, @Param('id') id: string) {
    if (user.role !== UserRole.ADMIN) {
      return { error: 'Forbidden' };
    }
    const provider = await this.providersService.updateVerificationStatus(id, 'rejected' as any);
    return { provider };
  }
}
