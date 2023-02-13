import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExtraService } from '../../extra/extra.service';
import { ProductService } from '../../product/product.service';
import { ProteinService } from '../../protein/protein.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { CartProducts } from './entities/cartProducts.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private repo: Repository<Cart>,
    private productService: ProductService,
    private extraService: ExtraService,
    private proteinService: ProteinService,
  ) {}

  private getTotalPrice(cart: Cart) {
    let totalPrice = 0;
    cart.products.forEach((element) => {
      totalPrice = totalPrice + element.totalPrice;
    });
    return totalPrice;
  }

  async create(dto: CreateCartDto) {
    const cart = new Cart();
    cart.products = await Promise.all(
      dto.products.map(async (productInput) => {
        if (productInput.hasOnlyExtra === true) {
          let auxiliar = 0;
          const cartProducts = new CartProducts();
          cartProducts.productId = productInput.productId;
          cartProducts.quantity = productInput.quantity;
          cartProducts.hasExtra = productInput.hasExtra;
          cartProducts.hasProtein = productInput.hasProtein;
          cartProducts.hasOnlyExtra = productInput.hasOnlyExtra;
          cartProducts.extra = []
          productInput.extra.map(async (extraInput) => {
          const extra = await this.extraService.findByName(extraInput.name);
          cartProducts.extra.push(extra);
        })
          let totalExtraPrecio: number = await this.extraService.getTotalPrice(
            productInput.extra,
          );
          auxiliar = auxiliar + totalExtraPrecio;
          cartProducts.totalPrice = auxiliar;
          return cartProducts;
        } else {
          const product = await this.productService.findOne(
            productInput.product.id,
          );
          if (!product)
            throw new NotFoundException(
              `Product ${productInput.product.id} not found`,
            );
          const cartProducts = new CartProducts();
          cartProducts.product = product;
          cartProducts.quantity = productInput.quantity;
          cartProducts.hasExtra = productInput.hasExtra;
          cartProducts.hasProtein = productInput.hasProtein;
          cartProducts.hasOnlyExtra = productInput.hasOnlyExtra;

          
          cartProducts.totalPrice = this.productService.getTotalPrice(
            product,
            cartProducts.quantity,
          );
          if (productInput.hasExtra === true) {
              cartProducts.extra = []
              productInput.extra.map(async (extraInput) => {
              const extra = await this.extraService.findByName(extraInput.name);
              cartProducts.extra.push(extra);
            }); 

            let totalExtraPrecio: number =
              await this.extraService.getTotalPrice(productInput.extra);
            cartProducts.totalPrice =
              cartProducts.totalPrice + totalExtraPrecio;
          }
          if (productInput.hasProtein === true) {
            cartProducts.protein = productInput.protein;
            let totalProteinPrecio: number =
              await this.proteinService.getTotalPrice(productInput.protein);
            cartProducts.totalPrice =
              cartProducts.totalPrice + totalProteinPrecio;
          }
          return cartProducts;
        }
      }),
    );
    cart.totalPrice = this.getTotalPrice(cart);

    return await this.repo.save(cart);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOne(id);
  }

  async update(id: number, dto: UpdateCartDto) {
    return await this.repo.update(id, dto);
  }

  async remove(id: number) {
    return await this.repo.softDelete(id);
  }
}
