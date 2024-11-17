import type { LabelItemProps } from "@/components";
import type { Order, OrderApiResponse } from "@/types/order.types";

import { LabelThemes, LabelVariants } from "@andrevantunes/andrevds";

import { dateToLocaleString } from "@/helpers/date.helper";
import { OrderStatus } from "@/types/order.types";

const translateOrderStatus = (status: OrderStatus): string => {
  const texts: Record<OrderStatus, string> = {
    [OrderStatus.GIFT]: "Cortesia",
    [OrderStatus.PAID]: "Pago",
    [OrderStatus.FREEZE]: "Temporariamente inativo",
    [OrderStatus.INACTIVE]: "Inativo",
    [OrderStatus.PENDING]: "Pendente",
    [OrderStatus.PRE_APPROVED]: "Pré-aprovado",
    [OrderStatus.PROCESSING]: "Processando pagamento",
    [OrderStatus.CANCELED]: "Cancelado",
    [OrderStatus.EXPIRED]: "Expirado",
    [OrderStatus.FAILED]: "Erro no pagamento",
    [OrderStatus.INVALID]: "Inválido",
    [OrderStatus.NOT_FOUND]: "Não encontrado",
    [OrderStatus.REFUNDED]: "Reembolsado",
    [OrderStatus.REMOVED]: "Removido",
  };

  return texts[status];
};

const getLabelVariantByStatus = (status: OrderStatus): LabelVariants => {
  switch (status) {
    case OrderStatus.GIFT:
    case OrderStatus.PAID:
      return LabelVariants.Success;
    case OrderStatus.FREEZE:
    case OrderStatus.INACTIVE:
    case OrderStatus.PENDING:
    case OrderStatus.PRE_APPROVED:
    case OrderStatus.PROCESSING:
      return LabelVariants.Warning;
    case OrderStatus.CANCELED:
    case OrderStatus.EXPIRED:
    case OrderStatus.FAILED:
    case OrderStatus.INVALID:
    case OrderStatus.NOT_FOUND:
    case OrderStatus.REFUNDED:
    case OrderStatus.REMOVED:
    default:
      return LabelVariants.Error;
  }
};

export const getLabelByStatus = (status: OrderApiResponse["status"]): LabelItemProps[] => {
  if (!status) return [];

  return [
    {
      theme: LabelThemes.Ghost,
      variant: getLabelVariantByStatus(status),
      children: translateOrderStatus(status),
    },
  ];
};

export const parseExpiresAt = (date: OrderApiResponse["accessExpires"]): string => {
  return `Expira em ${dateToLocaleString(date)}`;
};

export const serializeUserOrders = (data: OrderApiResponse[]): { orders: Order[] } => ({
  orders: data.map((order) => ({
    title: order.name,
    labels: getLabelByStatus(order.status),
    expiresAt: parseExpiresAt(order.accessExpires),
    history: order.history,
    isSubscription: order.isSubscription,
    subscriptionStatus: order.subscriptionStatus,
    token: order?.token,
  })),
});
