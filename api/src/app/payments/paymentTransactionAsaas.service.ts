import { Injectable } from '@nestjs/common';
import request from 'request';
import { toBrCurrency } from '../../utils/currency-helper';

@Injectable()
export class PaymentTransactionAsaasService {
  ACCESSS_TOKEN = process.env.ASAAS_ACCESS_TOKEN;
  ACQUIRED = 'asaas';
  BASE_URL = 'https://sandbox.asaas.com/api/v3/';
  options: any = {};
  code?: string;
  _paymentResult: any;
  _value = 0;
  _method?: string;
  constructor() {
    this.options = {
      headers: this.headers,
      json: {},
    };
  }
  setItemsFromCartProducts(products) {
    this.options.json.description = `${this.codeMessage}Compra de produtos realizada no AirBnB:\n`;
    this._value = 0;
    products.forEach((product: any) => {
      this.options.json.description += `- ${product.quantity} x ${toBrCurrency(
        product.unity_price,
      )} - ${product.name}\n`;
      this._value += product.unity_price * product.unity_price;
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
  async setCustomer(customer?: string) {
    this.options.json.customer = customer ?? 'cus_000006408014'; // TODO: tratar isso
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
    this.options.uri = `${this.BASE_URL}payments`;
    this.options.json.billingType = 'CREDIT_CARD';
    this._method = 'credit_card';
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
    this._method = 'pix';
    this.options.json.addressKey = '8be74c86-0acc-4f05-831b-bbe2e63b2e51';
    this.options.uri = `${this.BASE_URL}pix/qrCodes/static`;
    this.options.format = 'ALL';
    this.options.json.format = 'ALL';
    this.options.json.description = this.codeMessage;
    this.options.json.allowsMultiplePayments = false;
  }

  get paymentResult() {
    console.log('A1', this._paymentResult);
    return {
      acquirer: this.ACQUIRED,
      acquirer_id: this._paymentResult.id,
      acquirer_metadata: this._paymentResult,
      amount: this._value,
      currency: 'BRL',
      status: this._paymentResult.status?.toLowerCase() ?? 'pending',
      method: this._method,
    };
  }
  async executeTransaction() {
    return new Promise((resolve, reject) => {
      console.log('b1: ', this.options);
      request(this.options, (error: any, _response: any, body: any) => {
        if (error) {
          console.log('e2: ', error);
          return reject(error);
        }
        this._paymentResult = body;
        console.log('b2: ', this._paymentResult);
        return resolve(body);
      });
    });
  }

  private get headers() {
    return {
      access_token: this.ACCESSS_TOKEN,
      accept: 'application/json',
      'User-Agent': 'insomnia/10.2.0',
      'Content-Type': 'application/json',
    };
  }
}
