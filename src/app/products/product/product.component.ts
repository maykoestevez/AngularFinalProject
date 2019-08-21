import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { productConstants } from '../models/products-constants';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public productsForm: FormGroup;
  private isNewItem = true;

  constructor(private productService: ProductService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private toastService: ToastrService,
    private router: Router) {

    this.productsForm = this.formBuilder.group({
      id: [0, [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      price: [0, [Validators.required]],
      details: ['', [Validators.required]],
      status: [true, [Validators.required]]
    });
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.isNewItem = false;
        const productId = params['id'];
        this.getProductById(productId);
      }
    });
  }

  async getProductById(id: number) {
    try {
      const product = await this.productService.getById(id);
      this.productsForm.patchValue(product);
    } catch (error) {
      this.toastService.error(error.message, productConstants.PRODUCTMANAGE);
    }

  }

  saveChanges() {
    this.isNewItem ? this.save() : this.update();
  }

  async save() {
    try {
      await this.productService.add(this.productsForm.value);
      this.toastService.success(productConstants.PRODUCTADDED, productConstants.PRODUCTMANAGE);
      this.router.navigate(['/products']);
    } catch (error) {
      this.toastService.error(error.message, productConstants.PRODUCTMANAGE);
    }
  }

  async update() {
    try {
      await this.productService.update(this.productsForm.value);
      this.toastService.success(productConstants.PRODUCTUPDATED, productConstants.PRODUCTMANAGE);
      this.router.navigate(['/products']);
    } catch (error) {
      this.toastService.error(error.message, productConstants.PRODUCTMANAGE);
    }
  }
}
