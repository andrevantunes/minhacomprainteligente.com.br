import request from 'request';

interface PagarmeItem {
  code: number | string;
  amount: number;
  quantity: number;
  description: string;
}

export default class PagarmeTransaction {
  AUTH_HEADER = `Basic ${Buffer.from(
    `${process.env.PAGARME_API_KEY}:`,
  ).toString('base64')}`;
  API_URI = 'https://api.pagar.me/core/v5/orders';
  amount?: number;
  options: any = {};
  constructor() {
    this.options = {
      method: 'POST',
      uri: this.API_URI,
      headers: this.headers,
      json: {},
    };
  }

  setItems(items: PagarmeItem[]) {
    this.options.json.amount = 3000;
    this.options.json.items = items;
  }

  setItemsFromCartProducts(products) {
    const items = products.map((product: any) => ({
      code: product.id,
      amount: product.unity_price,
      quantity: product.quantity,
      description: product.name,
    }));
    this.setItems(items);
  }
  setCode(code) {
    this.options.json.code = code;
  }
  setCustomer(customer) {
    this.options.json.customer = customer;
  }
  setCreditCardPayment({
    number,
    holder_name,
    exp_month,
    exp_year,
    expire_date,
    cvv,
    billing_address,
  }: {
    number: number | string;
    holder_name: string;
    exp_month?: number | string;
    exp_year?: number | string;
    expire_date?: string;
    cvv: number | string;
    billing_address: any;
  }) {
    if (expire_date && (!exp_month || !exp_year)) {
      exp_month = expire_date.split('/')[0];
      exp_year = expire_date.split('/')[1];
    }
    this.options.json.payments = [
      {
        payment_method: 'credit_card',
        antifraud_enabled: false,
        credit_card: {
          amount: this.options.json.amount,
          installments: 1,
          card: {
            number,
            holder_name,
            exp_month,
            exp_year: String(exp_year).slice(-2),
            cvv,
            // billing_address,
          },
        },
      },
    ];
  }

  setPixPayment(expires_in = 60 * 60 * 24) {
    this.options.json.payments = [
      {
        payment_method: 'pix',
        pix: { amount: this.amount, expires_in },
      },
    ];
  }

  executeTransaction() {
    return new Promise((resolve, reject) => {
      request(this.options, function (error: any, response: any, body: any) {
        if (error) return reject(error);
        return resolve(body);
      });
    });
  }

  private get headers() {
    return {
      Authorization: this.AUTH_HEADER,
      'Content-Type': 'application/json',
    };
  }
}
