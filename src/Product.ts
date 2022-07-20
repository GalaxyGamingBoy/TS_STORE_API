export default class Product {
  id: Number;
  name: string;
  price: Number;
  stock: Number;

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      stock: this.stock,
    };
  }

  constructor(id: number, name: string, price: number, stock: number) {
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.id = id;
  }
}
