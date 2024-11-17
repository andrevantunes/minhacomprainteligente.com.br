import type { LabelItemProps } from "@/components";

enum OrderPaymentMethod {
  BANK_SLIP = "bank_slip",
  CARD = "card",
  CREDIT_CARD = "credit_card",
  MULTIPLE = "multiple",
  PIX = "pix",
}

enum OrderBroker {
  APP_STORE = "app_store",
  ASAAS = "asaas",
  IUGU = "iugu",
  KOIN = "koin",
  PAGARME = "pagarme",
  PLAY_STORE = "play_store",
  SCHOLARSHIP = "scholarship",
}

enum OrderStatus {
  CANCELED = "canceled",
  EXPIRED = "expired",
  FAILED = "failed",
  FREEZE = "freeze",
  GIFT = "gift",
  INACTIVE = "inactive",
  INVALID = "invalid",
  NOT_FOUND = "not_found",
  PAID = "paid",
  PENDING = "pending",
  PRE_APPROVED = "pre_approved",
  PROCESSING = "processing",
  REFUNDED = "refunded",
  REMOVED = "removed",
}

interface OrderApiResponse {
  name: string;
  slug: string;
  educationSegmentSlug: string;
  accessStarts: string;
  accessExpires: string;
  gift: boolean;
  paymentMethod: OrderPaymentMethod;
  remainingDays: number | null;
  status: OrderStatus | null;
  pricePaid: number;
  installments: number | null;
  history: string[];
  valid: boolean;
  subscriptionId: string | null;
  broker: OrderBroker;
  isSubscription: boolean;
  subscriptionStatus: string | null;
  pdf: string | null;
  date: string;
  token?: string;
  active?: boolean;
}

interface Order {
  title: string;
  labels: LabelItemProps[];
  expiresAt: string;
  history: OrderApiResponse["history"];
  isSubscription: OrderApiResponse["isSubscription"];
  subscriptionStatus: OrderApiResponse["subscriptionStatus"];
  token: OrderApiResponse["token"];
}

export type { Order, OrderApiResponse };
export { OrderBroker, OrderPaymentMethod, OrderStatus };
