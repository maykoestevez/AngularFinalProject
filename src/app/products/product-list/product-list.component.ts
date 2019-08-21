import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Products } from '../models/products';
import { ToastrService } from 'ngx-toastr';
import { productConstants } from '../models/products-constants';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public productsList$: Promise<Array<Products>>;
  public selectedProduct: Products;
  public show = false;
  public showModal: boolean;
  constructor(private productService: ProductService, private toastService: ToastrService) {
    this.selectedProduct = new Products();
  }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    try {
      this.productsList$ = this.productService.getAll();
    } catch (error) {
      this.toastService.error(error.message, productConstants.PRODUCTLIST);
    }

  }
  setSelected(product: Products, event: Event) {
    this.show = true;
    event.stopPropagation();
    this.selectedProduct = product;

  }

  async delete() {
    try {
      await this.productService.delete(this.selectedProduct.id);
      this.getAllProducts();
      this.show = false;
      this.toastService.success(productConstants.PRODUCTDELETED, productConstants.PRODUCTLIST);
    } catch (error) {
      this.toastService.error(error.message, productConstants.PRODUCTLIST);
    }
  }
  onHideModal() {
    this.show = false;
  }

}
