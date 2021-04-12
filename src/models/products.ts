import { dbQuery, dbQueryFirst } from "../services/db"


export type Product = {
  id: number;
  name: string;
  price: number;
}

const insertProduct = async (product: Product) => {
  await dbQuery(`INSERT INTO product (name, price) VALUES (?, ?)`, [ product.name, product.price ]);

  let retorno = await dbQuery(`SELECT seq AS id FROM sqlite_sequence WHERE name='product'`);
  return getProduct(retorno[0].id);
}

const listProducts = async () => {
  const retorno = await dbQuery(`SELECT * FROM product`);

  return retorno as Product[];
}

const getProduct = async (id: number) => {
  const retorno = await dbQueryFirst(`SELECT * FROM product WHERE id=?`, [id]);

  return retorno as Product | undefined;
}

const deleteProduct = async (id:number) => {
  await dbQuery(`DELETE FROM product WHERE id=?`, [id]);
}

const updateProduct = async (product: Product, id:number) => {
  await dbQuery(`UPDATE product SET name=?, price=? WHERE id=?`, [ product.name, product.price, id ]);

  return getProduct(id);
}

export const productModel = {
  insertProduct,
  listProducts,
  getProduct,
  deleteProduct,
  updateProduct
}