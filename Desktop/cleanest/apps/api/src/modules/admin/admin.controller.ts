import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole } from '@laundry/shared';

@ApiTags('admin')
@Controller('admin')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminController {
  constructor(private adminService: AdminService) {}

  private checkAdmin(user: any) {
    if (user.role !== UserRole.ADMIN) {
      throw new Error('Forbidden');
    }
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Get admin dashboard stats' })
  async getDashboard(@CurrentUser() user: any) {
    this.checkAdmin(user);
    return this.adminService.getDashboardStats();
  }

  @Get('settings')
  @ApiOperation({ summary: 'Get all settings' })
  async getSettings(@CurrentUser() user: any) {
    this.checkAdmin(user);
    const settings = await this.adminService.getAllSettings();
    return { settings };
  }

  @Get('settings/:key')
  @ApiOperation({ summary: 'Get a setting by key' })
  async getSetting(@CurrentUser() user: any, @Param('key') key: string) {
    this.checkAdmin(user);
    const setting = await this.adminService.getSetting(key);
    return { setting };
  }

  @Post('settings')
  @ApiOperation({ summary: 'Create or update a setting' })
  async setSetting(
    @CurrentUser() user: any,
    @Body() body: { key: string; value: string; description?: string },
  ) {
    this.checkAdmin(user);
    const setting = await this.adminService.setSetting(body.key, body.value, body.description);
    return { setting };
  }

  @Get('audit-logs')
  @ApiOperation({ summary: 'Get audit logs' })
  async getAuditLogs(
    @CurrentUser() user: any,
    @Query('actorId') actorId?: string,
    @Query('action') action?: string,
    @Query('entityType') entityType?: string,
    @Query('entityId') entityId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    this.checkAdmin(user);
    const logs = await this.adminService.getAuditLogs({
      actorId,
      action,
      entityType,
      entityId,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      limit: limit ? parseInt(limit) : 100,
      offset: offset ? parseInt(offset) : 0,
    });
    return { logs };
  }

  // Provider approval
  @Get('providers/pending')
  @ApiOperation({ summary: 'Get pending provider approvals' })
  async getPendingProviders(@CurrentUser() user: any) {
    this.checkAdmin(user);
    // This would call providers service
    return { providers: [] };
  }

  // Rider approval
  @Get('riders/pending')
  @ApiOperation({ summary: 'Get pending rider approvals' })
  async getPendingRiders(@CurrentUser() user: any) {
    this.checkAdmin(user);
    return { riders: [] };
  }

  // Orders
  @Get('orders')
  @ApiOperation({ summary: 'Get all orders with filters' })
  async getOrders(@CurrentUser() user: any, @Query() query: any) {
    this.checkAdmin(user);
    // TODO: Implement with filters
    return { orders: [] };
  }

  // Disputes
  @Get('disputes')
  @ApiOperation({ summary: 'Get all disputes' })
  async getDisputes(@CurrentUser() user: any) {
    this.checkAdmin(user);
    return { disputes: [] };
  }

  @Get('disputes/:id')
  @ApiOperation({ summary: 'Get dispute details' })
  async getDispute(@CurrentUser() user: any, @Param('id') id: string) {
    this.checkAdmin(user);
    return { dispute: null };
  }

  @Post('disputes/:id/resolve')
  @ApiOperation({ summary: 'Resolve a dispute' })
  async resolveDispute(@CurrentUser() user: any, @Param('id') id: string, @Body() body: any) {
    this.checkAdmin(user);
    return { success: true };
  }
}
