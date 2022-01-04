import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  productForm!: FormGroup;
  product!: Product;
  pageTitle: string = '';
  errorMessage="";
  
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createForm();

    const param = this.activatedRoute.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
  }

  createForm() {
    this.productForm = this.fb.group({
      productName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      productCode: ['', Validators.required],
      starRating: [''],
      tags: this.fb.array([]),
      description: '',
    });
  }

  get tags(): FormArray {
    return this.productForm.get('tags') as FormArray;
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }
  deleteTag(i: number): void  {
    this.tags.removeAt(i);
    this.tags.markAsDirty();
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: (product: Product) => this.displayProduct(product),
      //error: (err) => (this.errorMessage = err),
    });
  }
  displayProduct(product: Product): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;

    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }

    // Update the data on the form
    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description,
    });
    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }
  deleteProduct() {}
  saveProduct() {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        
        // Copies any changed form values over the original product values
        const p = { ...this.product, ...this.productForm.value };

        if (p.id === 0) {
          this.productService.createProduct(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          // this.productService.updateProduct(p)
          //   .subscribe({
          //     next: () => this.onSaveComplete(),
          //     error: err => this.errorMessage = err
          //   });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }
  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['/products']);
  }
}
