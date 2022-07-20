import products from "../res/products.json";
import Product from "./Product";
import { addProductErrors } from "./enums";
import { arrayToJSON } from "./utils";

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

  productNameExists(name: string): boolean {
    let returnCode: boolean = false;

    products.forEach((e) => {
      if (e.name == name) returnCode = true;
    });

    return returnCode;
  }

  productPriceExists(price: Number): boolean {
    let returnCode: boolean = false;

    products.forEach((e) => {
      if (e.price == price.toString()) returnCode = true;
    });

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

  getProductByName(name: string): any {
    let returnValue: any = 404;

    if (this.productNameExists(name)) {
      let tmp: Array<string> = [];
      products.forEach((value) => {
        if (value.name == name) tmp.push(JSON.stringify(value));
      });
      returnValue = arrayToJSON(tmp);
    }

    return returnValue;
  }

  getProductByPrice(price: number): any {
    let returnValue: any = 404;

    if (this.productPriceExists(price)) {
      let tmp: Array<string> = [];
      products.forEach((value) => {
        if (value.price == price.toString()) tmp.push(JSON.stringify(value));
      });
      returnValue = arrayToJSON(tmp);
    }

    return returnValue;
  }
}
