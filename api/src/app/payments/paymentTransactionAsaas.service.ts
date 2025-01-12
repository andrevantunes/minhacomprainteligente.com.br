import { Injectable } from '@nestjs/common';
import request from 'request';
import { toBrCurrency } from '../../utils/currency-helper';

@Injectable()
export class PaymentTransactionAsaasService {
  ACCESS_TOKEN = process.env.ASAAS_ACCESS_TOKEN;
  ACQUIRED = 'asaas';
  BASE_URL = process.env.ASAAS_BASE_URL;
  options: any = {};
  code?: string;
  _paymentResult: any;
  _value = 0;
  _billingType?: string;
  constructor() {
    this.options = {
      headers: this.headers,
      json: {},
    };
  }
  setItemsFromCartProducts(products: any[]) {
    this.options.json.description = `${this.codeMessage}Compra de produtos realizada no AirBnB:\n`;
    this._value = 0;
    products.forEach((product: any) => {
      this.options.json.description += `- ${product.quantity} x ${toBrCurrency(
        product.unity_price,
      )} - ${product.name}\n`;
      this._value += product.quantity * product.unity_price;
    });

    this.options.json.value = this._value / 100;
  }
  setCode(code) {
    this.code = code;
    this.options.json.externalReference = code;
  }

  get codeMessage() {
    if (!this.code) return '';
    return `(#${this.code}) `;
  }
  async setCustomer(customer: any) {
    if (customer) {
      //TODO find_customer_id from customer
    }
    this.options.json.customer = 'cus_000006408014'; // TODO: tratar isso
  }
  setCreditCardPayment({
    number,
    holder_name,
    exp_month,
    exp_year,
    expire_date,
    cvv,
  }: {
    number: number | string;
    holder_name: string;
    exp_month?: number | string;
    exp_year?: number | string;
    expire_date?: string;
    cvv: number | string;
    billing_address: any;
  }) {
    this.options.method = 'POST';
    this.options.uri = `${this.BASE_URL}v3/payments`;
    this.options.json.billingType = 'CREDIT_CARD';
    this._billingType = 'credit_card';
    if (expire_date && (!exp_month || !exp_year)) {
      exp_month = expire_date.split('/')[0];
      exp_year = expire_date.split('/')[1];
    }
    this.options.json.dueDate = new Date().toISOString().split('T')[0];
    this.options.json.postalService = false;
    this.options.json.creditCard = {
      holderName: holder_name,
      number: number,
      expiryMonth: exp_month,
      expiryYear: exp_year,
      ccv: cvv,
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setPixPayment(_expires_in = 60 * 60 * 24) {
    this.options.method = 'POST';
    this._billingType = 'pix';
    // this.options.json.addressKey = process.env.ASAAS_PIX_KEY;
    // this.options.uri = `${this.BASE_URL}v3/pix/qrCodes/static`;

    this.options.uri = `${this.BASE_URL}v3/payments`;
    this.options.json.dueDate = new Date().toISOString().split('T')[0];
    this.options.json.billingType = 'PIX';
    this.options.json.format = 'ALL';
    this.options.json.description = this.codeMessage;
    this.options.json.allowsMultiplePayments = false;
  }

  get paymentResult() {
    // console.log('A1', this._paymentResult);
    return {
      acquirer: this.ACQUIRED,
      acquirer_id: this._paymentResult.id,
      acquirer_metadata: this._paymentResult,
      amount: this._value,
      currency: 'BRL',
      status: this._paymentResult.status?.toLowerCase() ?? 'pending',
      method: this._billingType,
    };
  }
  async executeTransaction() {
    return new Promise(async (resolve, reject) => {
      request(this.options, (error: any, _response: any, body: any) => {
        if (error) return reject(error);
        void this.getPixInfo(body.id).then((pixInfo) => {
          this._paymentResult = { ...body, ...pixInfo };
          return resolve(this._paymentResult);
        });
      });
    });
  }

  async getPixInfo(id: string): Promise<any> {
    if (this._billingType != 'pix') return {};

    return new Promise(async (resolve, reject) => {
      const options = {
        headers: this.headers,
        method: 'GET',
        uri: `${this.BASE_URL}v3/payments/${id}/pixQrCode`,
      };

      request(options, (error: any, _response: any, body: any) => {
        if (error) return reject(error);
        if (typeof body === 'string') {
          try {
            return resolve(JSON.parse(body));
          } catch (e) {
            console.log('json error', e);
            console.log(body);
            return resolve(body);
          }
        }
        return resolve(body);
      });
    });
  }

  private get headers() {
    return {
      ACCESS_TOKEN: this.ACCESS_TOKEN,
      ACCEPT: 'application/json',
      'User-Agent': 'insomnia/10.2.0',
      'Content-Type': 'application/json',
    };
  }
}
