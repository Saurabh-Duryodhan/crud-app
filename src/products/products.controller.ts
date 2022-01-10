import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') ProdPrice: number,
  ) {
    const generatedId = this.productService.insertProduct(
      prodTitle,
      prodDesc,
      ProdPrice,
    );
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('descriptoin') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return null;
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    return this.productService.deleteProduct(prodId);
  }
}
