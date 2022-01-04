import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  errorMessage = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}


  product!: Product  ;
  ngOnInit(): void {
    const param = this.activatedRoute.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
   
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: (product) => (this.product = product),
      error: (err) => (this.errorMessage = err),
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
