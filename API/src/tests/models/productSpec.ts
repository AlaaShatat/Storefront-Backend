import { productStorage } from '../../models/product';
import { Product } from '../../types/product';

const products = new productStorage();

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(products.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(products.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(products.create).toBeDefined();
  });

  it('create should create new product', async () => {
    const product: Product = {
      id: null,
      pname: 'bag',
      price: 50,
    };
    const res: Product = await products.create(product);
    expect(res).toBeDefined();
  });

  it('index should return products', async () => {
    const res: Product[] = await products.index();
    expect(res.length).toBeGreaterThanOrEqual(1);
  });

  it('should return product by id', async () => {
    const resBefore: Product[] = await products.index();
    const res: Product = await products.show(Number(resBefore[0].id));
    expect(res).toBeDefined();
  });
});
