import { Notification, NotificationVariants } from "@andrevantunes/andrevds";

type NotificationType = typeof NotificationVariants[keyof typeof NotificationVariants];

const notify = (content: string, variant?: NotificationType) =>
  Notification.open({ content, variant });

export const notifyError = (content: string) => notify(content, NotificationVariants.Error);
export const notifyWarning = (content: string) => notify(content, NotificationVariants.Warning);
export const notifySuccess = (content: string) => notify(content, NotificationVariants.Success);
