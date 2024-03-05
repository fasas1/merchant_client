import productModel from "./productModel";

export default interface OrderDetail {
  orderDetailsId: number;
  itemName: string;
  orderHeaderId: number;
  price: number;
  product: productModel;
  productId: number;
  quantity: number;
}
