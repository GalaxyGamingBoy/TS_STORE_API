import settings from "../res/settings.json";
import ProductManager from "./ProductManager";
import Product from "./Product";
import products from "../res/products.json";
import { addProductErrors } from "./enums";

const express = require("express");
const cors = require("cors");
const env = require("env-var");
const webApp = express();

let productManager: ProductManager = new ProductManager();

webApp.use(
  cors({
    origin: "*",
  })
);

webApp.get("/", (req, res) => {
  res.status(418).end("I am a teapot!");
});

webApp.get("/getProducts", (req, res) => {
  res.status(200).end(JSON.stringify(products));
});

webApp.get("/getProductByID", (req, res) => {
  const id: string = req.query.id;

  let productValue: any = productManager.getProductByID(Number(id));

  if (productValue == 404) {
    res.status(404).end(`Product with ID ${id}, not found`);
  } else {
    res.status(200).end(JSON.stringify(productValue));
  }
});

webApp.get("/getProductByName", (req, res) => {
  const name: string = req.query.name;

  let productValue = productManager.getProductByName(name);

  if (productValue == 404) {
    res.status(404).end(`Product with name ${name}, not found`);
  } else {
    res.status(200).end(productValue);
  }
});

webApp.get("/getProductByPrice", (req, res) => {
  const price: string = req.query.price;

  let productValue = productManager.getProductByPrice(Number(price));

  if (productValue == 404) {
    res.status(404).end(`Product with price ${price}, not found`);
  } else {
    res.status(200).end(productValue);
  }
});

webApp.post("/addProduct", (req, res) => {
  const id: string = req.query.id;
  const name: string = req.query.name;
  const price: string = req.query.price;
  const stock: string = req.query.stock;

  let addProductStatus: addProductErrors = productManager.addProduct(
    new Product(
      parseInt(id, 10),
      name,
      parseInt(price, 10),
      parseInt(stock, 10)
    )
  );

  switch (addProductStatus) {
    case addProductErrors.BAD_REQUEST:
      res.status(400).end("Bad Request!");
      break;
    case addProductErrors.CONFLICT:
      res.status(409).end("Product ID Conflict!");
      break;
    default:
      res.status(200).end("Product Added!");
      break;
  }
});

webApp.post("/debug/testProducts", (req, res) => {
  const debugPassword: string = req.query.debugPassword;
  var internalDebugPassword: string;
  try {
    internalDebugPassword = env
      .get("STORE_DEBUG_PASSWORD")
      .required()
      .asString();
  } catch (e) {
    res
      .status(500)
      .end("Administrator did not set DEBUG Password. Please notify them.");
  }
  if (debugPassword == internalDebugPassword) {
    productManager.addProduct(new Product(1, "Product A", 1, 25));
    productManager.addProduct(new Product(2, "Product B", 2, 50));
    productManager.addProduct(new Product(3, "Product C", 4, 75));
    productManager.addProduct(new Product(4, "Product D", 8, 100));
    res.status(200).end("Added Test Products");
  } else {
    res.status(401).end("Invalid password");
  }
});

webApp.listen(settings["server"]["port"], () => {
  var internalDebugPassword: string;
  try {
    internalDebugPassword = env
      .get("STORE_DEBUG_PASSWORD")
      .required()
      .asString();
  } catch (e) {
    console.log(
      "Administrator did not set DEBUG Password. Please notify them."
    );
  }

  console.log(
    `API on Port: ${settings["server"]["port"]}, with DEBUG Password: ${internalDebugPassword}`
  );
});
