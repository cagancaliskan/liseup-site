import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { Auth } from '../auth/decorators/auth-type.decorator';
import { Role } from '../entities/role';
import { CommerceRepository } from '../persistence';
import type {
  NewVendor,
  NewProduct,
  NewCartItem,
  NewTransaction,
} from '../persistence';

@Controller('/api/commerce')
export class CommerceController {
  constructor(private readonly commerce: CommerceRepository) {}

  // ── Vendors ────────────────────────────────────────────────────────────────

  @Auth()
  @Get('vendors/:id')
  findVendorById(@Param('id') id: string) {
    return this.commerce.findVendorById(id);
  }

  @Auth(Role.Vendor, Role.Admin)
  @Post('vendors')
  createVendor(@Body() data: NewVendor) {
    return this.commerce.createVendor(data);
  }

  @Auth(Role.Vendor, Role.Admin)
  @Patch('vendors/:id')
  updateVendor(@Param('id') id: string, @Body() data: Partial<NewVendor>) {
    return this.commerce.updateVendor(id, data);
  }

  // ── Products ───────────────────────────────────────────────────────────────

  @Auth()
  @Get('products/:id')
  findProductById(@Param('id') id: string) {
    return this.commerce.findProductById(id);
  }

  @Auth()
  @Get('products')
  findProductsByVendorId(@Query('vendorId') vendorId: string) {
    return this.commerce.findProductsByVendorId(vendorId);
  }

  @Auth(Role.Vendor, Role.Admin)
  @Post('products')
  createProduct(@Body() data: NewProduct) {
    return this.commerce.createProduct(data);
  }

  @Auth(Role.Vendor, Role.Admin)
  @Patch('products/:id')
  updateProduct(@Param('id') id: string, @Body() data: Partial<NewProduct>) {
    return this.commerce.updateProduct(id, data);
  }

  @Auth(Role.Vendor, Role.Admin)
  @Delete('products/:id')
  deleteProduct(@Param('id') id: string) {
    return this.commerce.deleteProduct(id);
  }

  // ── Cart ───────────────────────────────────────────────────────────────────

  @Auth(Role.User)
  @Get('cart')
  getCart(@Req() req: Request) {
    const userId = (req as any).user.userId as string;
    return this.commerce.findCartByUserId(userId);
  }

  @Auth(Role.User)
  @Post('cart')
  addToCart(@Req() req: Request, @Body() data: NewCartItem) {
    const userId = (req as any).user.userId as string;
    return this.commerce.addToCart({ ...data, user_id: userId });
  }

  @Auth(Role.User)
  @Patch('cart/:id')
  async updateCartItem(@Req() req: Request, @Param('id') id: string, @Body() data: NewCartItem) {
    const userId = (req as any).user.userId as string;
    const item = await this.commerce.findCartItemById(id);
    if (!item || item.user_id !== userId) throw new ForbiddenException();
    return this.commerce.updateCartItem(id, data);
  }

  @Auth(Role.User)
  @Delete('cart/:id')
  async removeFromCart(@Req() req: Request, @Param('id') id: string) {
    const userId = (req as any).user.userId as string;
    const item = await this.commerce.findCartItemById(id);
    if (!item || item.user_id !== userId) throw new ForbiddenException();
    return this.commerce.removeFromCart(id);
  }

  // ── Transactions ───────────────────────────────────────────────────────────

  @Auth(Role.Admin)
  @Post('transactions')
  createTransaction(@Body() data: NewTransaction) {
    return this.commerce.createTransaction(data);
  }

  @Auth(Role.Admin)
  @Get('transactions/:id')
  findTransactionById(@Param('id') id: string) {
    return this.commerce.findTransactionById(id);
  }
}
