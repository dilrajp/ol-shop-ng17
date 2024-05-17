import { Component } from "@angular/core";
import { ProductsService } from "../services/products.service";
import { Product, Products } from "../types";
import { PaginatorModule } from "primeng/paginator";
import { ProductComponent } from "../components/product/product.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  constructor(private productService: ProductsService) {}

  products: Product[] = [];
  rows = 5;
  totalRecords = 0;

  ngOnInit() {
    this.fetchProduct(0, 5);
  }

  ngOnChanges() {}

  onProductOutput(product: Product) {
    console.log(product, "Output");
  }

  onPageChange(event: any) {
    this.fetchProduct(event.page, event.rows);
  }

  fetchProduct(page: number, perPage: number) {
    this.productService
      .getProducts("http://localhost:3000/clothes", {
        page: page,
        perPage: perPage,
      })
      .subscribe((products: Products) => {
        this.products = products.items;
        this.totalRecords = products.total;
      });
  }
}
