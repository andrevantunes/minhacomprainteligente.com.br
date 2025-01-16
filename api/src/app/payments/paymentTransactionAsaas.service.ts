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
  _valueInCents = 0;
  _billingType?: string;
  constructor() {
    this.options = {
      headers: this.headers,
      json: {},
    };
  }
  setItemsFromCartProducts(products: any[]) {
    this.options.description = `${this.codeMessage}Compra de produtos realizada no AirBnB:\n`;
    this._valueInCents = 0;
    products.forEach((product: any) => {
      this.options.description += `- ${product.quantity} x ${toBrCurrency(
        product.unity_price,
      )} - ${product.name}\n`;
      this._valueInCents += product.quantity * product.unity_price;
    });

    this.options.value = this._valueInCents / 100;
  }

  async findPayment(id: string): Promise<any> {
    return this.request(`v3/payments/${id}`, 'GET');
  }
  setCode(code) {
    this.code = code;
    this.options.externalReference = code;
  }

  get codeMessage() {
    if (!this.code) return '';
    return `(#${this.code}) `;
  }
  async setCustomer(customer: any) {
    return this.request('v3/customers', 'POST', {
      name: customer.name,
      cpfCnpj: customer.document,
      foreignCustomer: this.isInvalidCustomerDocument(customer.document),
    }).then((result: any) => {
      this.options.customer = result.id;
    });
  }

  private isInvalidCustomerDocument(document?: string) {
    if (!document) return true;
    return document.length < 10;
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
    this.options.billingType = 'CREDIT_CARD';
    this._billingType = 'credit_card';
    if (expire_date && (!exp_month || !exp_year)) {
      exp_month = expire_date.split('/')[0];
      exp_year = expire_date.split('/')[1];
    }
    this.options.dueDate = new Date().toISOString().split('T')[0];
    this.options.postalService = false;
    this.options.creditCard = {
      holderName: holder_name,
      number: number,
      expiryMonth: exp_month,
      expiryYear: exp_year,
      ccv: cvv,
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setPixPayment(_expires_in = 60 * 60 * 24) {
    this._billingType = 'pix';
    this.options.dueDate = new Date().toISOString().split('T')[0];
    this.options.billingType = 'PIX';
    this.options.format = 'ALL';
    this.options.description = this.codeMessage;
    this.options.allowsMultiplePayments = false;
  }

  get paymentResult() {
    // console.log('A1', this._paymentResult);
    return {
      acquirer: this.ACQUIRED,
      acquirer_id: this._paymentResult.id,
      acquirer_metadata: this._paymentResult,
      amount: this._valueInCents,
      currency: 'BRL',
      status: this._paymentResult.status?.toLowerCase() ?? 'pending',
      method: this._billingType,
    };
  }
  async executeTransaction() {
    console.log('executeTransaction request', this.options);
    return this.request(`v3/payments`, 'POST', this.options).then(
      (body: any) => {
        console.log('executeTransaction response', this.options);
        return this.getPixInfo(body.id).then((pixInfo) => {
          this._paymentResult = { ...body, ...pixInfo };
          return this._paymentResult;
        });
      },
    );
  }

  async getPixInfo(id: string): Promise<any> {
    if (this._billingType != 'pix') return {};
    return this.request(`v3/payments/${id}/pixQrCode`, 'GET');
  }

  private get headers() {
    return {
      ACCESS_TOKEN: this.ACCESS_TOKEN,
      ACCEPT: 'application/json',
      'User-Agent': 'insomnia/10.2.0',
      'Content-Type': 'application/json',
    };
  }

  private async request(route: string, method: string, json?: any) {
    const uri = `${this.BASE_URL}${route}`;
    const options = { headers: this.headers, method, uri, json };
    console.log('request', options);
    return new Promise(async (resolve, reject) => {
      request(options, (error: any, _response: any, body: any) => {
        if (error) return reject(error);
        if (typeof body !== 'string') return resolve(body);
        try {
          console.log('json', body);
          return resolve(JSON.parse(body));
        } catch (e) {
          console.log(body);
          return resolve(body);
        }
      });
    });
  }
}
