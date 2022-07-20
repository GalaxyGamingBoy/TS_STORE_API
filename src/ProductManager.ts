import products from "../res/products.json";
import Product from "./Product";
import { addProductErrors } from "./enums";

export default class ProductManager {
  idValid(id: string): addProductErrors {
    if (id !== "NaN") {
      products.forEach((e) => {
        if (id == e.id) {
          return addProductErrors.CONFLICT;
        }
      });
    } else {
      return addProductErrors.BAD_REQUEST;
    }

    return addProductErrors.SUCCESS;
  }

  addProduct(product: Product): number {
    let idValidResult: addProductErrors = this.idValid(product.id.toString());

    if (idValidResult == addProductErrors.SUCCESS) {
      let newProduct = {
        id: product.id.toString(),
        name: product.name,
        price: product.price.toString(),
        stock: product.stock.toString(),
      };
      products.push(newProduct);
    }

    return idValidResult;
  }
}
