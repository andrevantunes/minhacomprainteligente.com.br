import { Title } from "@/components/adapters/Title";
import { Text } from "@/components/adapters/Text";
import { DangerousHTML } from "@/components/basics/DangerousHTML";
import { findEssayProposals, getEssayProposals, sendEssayProposal } from "@/requests";
import { useStore, StoreType } from "@/store";
import {
  Card,
  Checkbox,
  FileField,
  List,
  Notification,
  SelectField,
  SelectFieldOption,
  Skeleton,
  SkeletonVariants,
  SubmitButton,
  TextField,
} from "@andrevantunes/andrevds";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import {
  dictionary,
  getCorrectionType,
  IMAGE_EXTENSIONS,
  mountEssayExplanationList,
  successRedirectPath,
  TEN_MB,
} from "./essay-send-form.helper";
import { Button } from "@/components/adapters/Button";
import { useRouter } from "next/router";
import { removeBasePath } from "@/helpers/links.helpers";
import * as AccessStore from "@/store/AccessesStore/accesses-store.action";

const EssaySendForm = () => {
  const [{ essayPersonalCorrection, essayCredits, essayUnlimited }] = useStore(StoreType.Accesses);
  const hasEssay = essayCredits > 0 || essayUnlimited;

  const router = useRouter();
  const { token: mediumToken, battery: batteryToken } = router?.query || {};

  const { data: options, error } = useSWR("essays/proposals", getEssayProposals);

  const [file, setFile] = useState<string | null>(null);
  const [proposal, setProposal] = useState<SelectFieldOption | undefined>(undefined);
  const [confirmation, setConfirmation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [singleProposal, setSingleProposal] = useState<any>(null);

  const cn = classNames("essay-send-form", { "essay-send-form--is-disabled": !hasEssay });
  const isLoading = !options && !singleProposal;
  const correctionStyleName = proposal?.value?.correctionStyleName;
  const correctionType = getCorrectionType(essayPersonalCorrection);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await sendEssayProposal({
        file,
        correctionType,
        mediumToken,
        batteryToken,
        ...proposal?.value,
      });
      AccessStore.decreaseEssayCredits();
      Notification.success(dictionary.form.submit.success);
      router.push(removeBasePath(successRedirectPath));
    } catch (error: any) {
      Notification.error(error?.message || dictionary.form.submit.error);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (mediumToken) {
      findEssayProposals(String(mediumToken)).then(setSingleProposal);
    }
  }, [mediumToken]);

  if (error) {
    return (
      <Card className={cn} elevation="md">
        <Title size="xs">Não foi possível carregar as propostas de redação :(</Title>
        <Text className="my-md">Tente mais tarde ou entre em contato com o nosso time.</Text>
        <Button variant="neutral" size="sm" onClick={location.reload}>
          Tentar novamente
        </Button>
      </Card>
    );
  }

  return (
    <Card className={cn} elevation="md">
      <form data-testid="essay-send-form" className="essay-send-form__form" onSubmit={handleSubmit}>
        <input type="hidden" value={batteryToken} name="battery_token" />
        <div>
          <Skeleton active={isLoading} width={200}>
            <Title level={3} size="xs" className="mb-sm">
              {dictionary.form.proposal.title}
            </Title>
          </Skeleton>
          <Skeleton active={isLoading}>
            {!singleProposal && (
              <SelectField
                defaultOption={proposal}
                disabled={!hasEssay || submitting}
                autoComplete="off"
                name={dictionary.form.proposal.name}
                required
                label={dictionary.form.proposal.label}
                enableFilter
                options={options || []}
                onSelect={setProposal}
              />
            )}
            {singleProposal && (
              <>
                <input
                  type="hidden"
                  value={singleProposal.id}
                  name={dictionary.form.proposal.name}
                />
                <TextField
                  disabled={true}
                  autoComplete="off"
                  value={singleProposal.name}
                  label="Proposta selecionada"
                />
              </>
            )}
          </Skeleton>
        </div>
        <div>
          <Skeleton active={isLoading} width={200}>
            <Title level={3} size="xs" className="mb-sm">
              {dictionary.form.file.title}
            </Title>
          </Skeleton>
          <Skeleton active={isLoading}>
            <FileField
              data-testid={dictionary.form.file.name}
              name={dictionary.form.file.name}
              disabled={!hasEssay || submitting}
              maxSize={TEN_MB}
              onUploadFile={setFile}
              extensions={IMAGE_EXTENSIONS}
            />
          </Skeleton>
        </div>
        <Skeleton active={isLoading} variant={SkeletonVariants.Paragraph}>
          <List
            className="essay-send-form__form-list"
            defaultBulletIconName="checkmark"
            list={mountList({ correctionStyleName, essayPersonalCorrection })}
          />
        </Skeleton>
        <div>
          <Skeleton active={isLoading}>
            <Checkbox
              disabled={!hasEssay || submitting}
              defaultChecked={confirmation}
              onClick={() => setConfirmation(!confirmation)}
              name={dictionary.form.confirmation.name}
              label={dictionary.form.confirmation.label}
            />
          </Skeleton>
        </div>
        <Skeleton active={isLoading}>
          <SubmitButton
            label={dictionary.form.submit.label}
            disabled={!hasEssay || (!proposal && !singleProposal) || !file || !confirmation}
            iconName={submitting ? undefined : "send"}
            submitting={submitting}
          />
        </Skeleton>
      </form>
    </Card>
  );
};

const mountList = (props: { essayPersonalCorrection: boolean; correctionStyleName?: string }) => {
  const list = mountEssayExplanationList(props);
  return list.map((item) => ({
    children: <DangerousHTML>{item}</DangerousHTML>,
  }));
};

export default EssaySendForm;
