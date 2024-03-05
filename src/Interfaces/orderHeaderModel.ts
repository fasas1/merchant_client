import OrderDetail from "./orderDetailsModel";
import userModel from "./userModel";

export default interface OrderHeader {
  orderHeaderId: number;
  applicationUserId: string;
  orderDate: string;
  orderDetails: OrderDetail[];
  orderTotal: number;
  paystackPaymentIntentId: string;
  pickUpEmail: string;
  pickUpName: string;
  pickUpPhoneNumber: string;
  status: "pending" | "paid";
  totalItems: number;
  user: null | userModel;
}
