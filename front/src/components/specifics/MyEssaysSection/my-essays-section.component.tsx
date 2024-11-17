import { ComponentList } from "@/components/basics/ComponentList";
import { ModalContent } from "@/components/basics/ModalContent";
import { Title } from "@/components/adapters/Title";
import { Text } from "@/components/adapters/Text";
import { Button } from "@/components/adapters/Button";
import {
  LabelThemes,
  LabelVariants,
  Modal,
  ModalChildProps,
  Skeleton,
  SkeletonVariants,
  SubmitButton,
} from "@andrevantunes/andrevds";
import React, { useState } from "react";
import { Grid } from "@/components/basics/Grid";
import { notifyError } from "@/helpers/notify.helper";
import { cancelEssay } from "@/controllers";
import Router from "next/router";
import { ComponentItemProps } from "@/components/basics/ComponentItem";
import { removeBasePath } from "@/helpers/links.helpers";
import { Card } from "@andrevantunes/andrevds";
import { MyEssaysSectionProps } from "./my-essays-section.types";
import { makeArray } from "@/helpers/object.helper";
import * as AccessStore from "@/store/AccessesStore/accesses-store.action";

const MyEssaysSection = ({
  list,
  emptyMessage,
  pagination,
  enableFilter,
  filterLabel,
  ...props
}: MyEssaysSectionProps) => {
  const hasList = Array.isArray(list) && list.length > 0;

  const componentListProps = { emptyMessage, pagination, enableFilter, filterLabel };

  return (
    <Card {...props}>
      {hasList ? (
        <ComponentList list={list.map(parseEssayItem)} {...componentListProps} />
      ) : (
        <Text>{emptyMessage}</Text>
      )}
    </Card>
  );
};

MyEssaysSection.Skeleton = () => {
  return (
    <Card>
      <Grid columns={1} gap={24}>
        <Skeleton active height={56} />
        {makeArray(10).map((_, index) => (
          <MyEssaySkeletonItem key={index} />
        ))}
      </Grid>
    </Card>
  );
};

const MyEssaySkeletonItem = () => (
  <Grid className="align-items-center" columns="24px 1fr 32px" gap={32}>
    <Skeleton active height={24} width={24} variant={SkeletonVariants.Circle} />
    <Skeleton active variant={SkeletonVariants.Paragraph} />
    <Skeleton active height={32} width={32} />
  </Grid>
);

export default MyEssaysSection;

const parseEssayItem = ({ actions = [], ...item }: ComponentItemProps) => {
  switch (item?.status) {
    case "cancelled":
      return {
        ...item,
        link: {
          href: actions[0]?.href,
          target: "_blank",
        },
        actions: actions.map(parseEssayActionsItem(item)),
      };
    case "awaiting_correction":
    case "correcting":
      return {
        ...item,
        icon: {
          name: "clock",
          color: "var(--color-warning-500)",
        },
        labels: [
          {
            children: "Aguardando Correção",
            theme: "ghost" as LabelThemes.Ghost,
            variant: "warning" as LabelVariants.Warning,
          },
        ],
        link: {
          href: actions[0]?.href,
          target: "_blank",
        },
        actions: actions.map(parseEssayActionsItem(item)),
      };
    case "corrected":
      return {
        ...item,
        caption: "",
        icon: {
          name: "clock",
          color: "var(--color-warning-500)",
        },
        labels: [
          {
            children: "Aguardando Correção",
            theme: "ghost" as LabelThemes.Ghost,
            variant: "warning" as LabelVariants.Warning,
          },
        ],
        link: {
          href: actions[1]?.href,
          target: "_blank",
        },
        actions: [
          {
            label: actions[1]?.label,
            leftIconName: actions[1]?.leftIconName,
            href: actions[1]?.href,
            target: actions[1]?.target,
          },
        ],
      };
    case "uncorrectable":
      return {
        ...item,
        link: {
          onClick: (event: React.MouseEvent) => {
            event.preventDefault();
            Modal.open(UncorrectableModal, {
              childComponentProps: {
                title: item.title,
                rejectMessage: (item as any).rejectMessage,
                permalinkSlug: (item as any).permalinkSlug,
              },
            });
          },
        },
        actions: actions.map(parseEssayActionsItem(item)),
      };
    case "pending":
      return {
        ...item,
        link: {
          href: actions[1]?.href,
        },
        actions: actions.map(parseEssayActionsItem(item)),
      };
    default:
      return { ...item, actions: actions.map(parseEssayActionsItem(item)) };
  }
};

const parseEssayActionsItem = (item: any) => {
  return (action: any) => {
    if (/cancel/i.test(action.name || "")) return parseEssayCancelAction(action, item);
    if (/reject/i.test(action.name || "")) return parseEssayRejectAction(action, item);
    return action;
  };
};

const parseEssayCancelAction = (action: any, item: any) => ({
  ...action,
  onClick: (event: React.MouseEvent) => {
    event.preventDefault();
    Modal.open(CancelEssayConfirmation, {
      size: "sm",
      childComponentProps: { essayId: item.id, title: item.title },
    });
  },
});

const parseEssayRejectAction = (action: any, item: any) => ({
  ...action,
  onClick: (event: React.MouseEvent) => {
    event.preventDefault();
    Modal.open(UncorrectableModal, {
      childComponentProps: {
        title: item.title,
        rejectMessage: (item as any).rejectMessage,
        permalinkSlug: (item as any).permalinkSlug,
      },
    });
  },
});

const CancelEssayConfirmation = ({ close, title, essayId, onSuccess }: ModalChildProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onConfirmation = async () => {
    setIsSubmitting(true);
    try {
      await cancelEssay(essayId);
      Modal.open(CancelEssayInfo, { size: "sm" });
      // This line force client reload page
      Router.push({
        pathname: Router.pathname,
        query: { ...Router.query, data: new Date().toISOString() },
      });
      onSuccess?.();
      AccessStore.increaseEssayCredits();
    } catch (error) {
      console.error(error);
      notifyError("Erro ao cancelar a redação!");
    } finally {
      setIsSubmitting(false);
      close();
    }
  };

  return (
    <ModalContent>
      <Title>Cancelar correção ⚠️</Title>
      <Title variant="caption" className="my-lg">
        {title}
      </Title>
      <Text>
        Sua redação ainda não foi corrigida. Tem certeza de que quer cancelar o pedido de correção
        agora?
      </Text>
      <Grid className="mt-xl" columns={{ md: 2 }}>
        <Button variant="neutral" onClick={close} disabled={isSubmitting}>
          Agora não
        </Button>
        <SubmitButton
          style={{ whiteSpace: "nowrap" }}
          onClick={onConfirmation}
          submitting={isSubmitting}
        >
          Sim, quero cancelar
        </SubmitButton>
      </Grid>
    </ModalContent>
  );
};

const CancelEssayInfo = ({ close }: ModalChildProps) => {
  return (
    <ModalContent>
      <Grid>
        <Title>Redação cancelada! 👍</Title>
        <Text>Um crédito de correção retornou para você. Use quando quiser.</Text>
        <Button onClick={close}>Ok, entendi</Button>
      </Grid>
    </ModalContent>
  );
};

const UncorrectableModal = ({ close, title, rejectMessage, permalinkSlug }: ModalChildProps) => {
  const handleClick = () => {
    close();
    Router.push(removeBasePath(`/app/redacao/enviar?proposta=${permalinkSlug}`));
  };

  const reject = getRejectMessage(rejectMessage);

  return (
    <ModalContent>
      <Title>{reject.title ? `Motivo: ${reject.title}` : "Motivo da recusa"}</Title>
      <Title variant="caption" className="my-lg">
        {title}
      </Title>
      <Text>{reject.text}</Text>
      <Grid className="mt-xl" columns={{ md: 2 }}>
        <Button variant="neutral" onClick={close}>
          Voltar
        </Button>
        <Button iconName="send" onClick={handleClick}>
          Enviar nova redação
        </Button>
      </Grid>
    </ModalContent>
  );
};

const getRejectMessage = (message: string) => {
  if (!/^.*:/.test(message)) {
    return {
      title: undefined,
      text: message,
    };
  }
  const [title, ...text] = message.split(":");
  return {
    title,
    text: text.join(":"),
  };
};
