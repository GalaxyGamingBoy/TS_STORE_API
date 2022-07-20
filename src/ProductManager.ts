import products from "../res/products.json";
import Product from "./Product";
import { addProductErrors } from "./enums";

export default class ProductManager {
  idValid(id: string): addProductErrors {
    let returnCode: addProductErrors;
    returnCode = addProductErrors.SUCCESS;

    if (id !== "NaN") {
      products.forEach((e) => {
        if (id == e.id.toString()) {
          returnCode = addProductErrors.CONFLICT;
        }
      });
    } else {
      returnCode = addProductErrors.BAD_REQUEST;
    }

    return returnCode;
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

  getProductByID(id: Number): any {
    let idValidResult: addProductErrors = this.idValid(id.toString());
    let returnValue: any;

    if (idValidResult == addProductErrors.CONFLICT) {
      products.forEach((value) => {
        if (value.id == id.toString()) {
          returnValue = value;
        }
      });
    } else {
      returnValue = 404;
    }

    return returnValue;
  }
}
