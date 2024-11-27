import { putBffApi } from "@/requests/bff.request";

export const updateCartOnApi = (hash: string, data: any) => {
  if (data.products) {
    data.products = data.products.map((product: any) => ({
      id: product.id,
      quantity: product.quantity,
      unity_price: product.unity_price,
    }));
  }
  return putBffApi(`carts/${hash}`, data);
};
