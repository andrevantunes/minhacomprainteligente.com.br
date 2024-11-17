import type { EssayRatingProps } from "./essay-rating.types";

import classNames from "classnames";
import { Button, Card, Heading, Loader, Text } from "@andrevantunes/andrevds";

import dictionary from "@/configs/dictionary";
import { updateEssay } from "@/requests";
import { useState } from "react";
import { notifyError, notifySuccess } from "@/helpers/notify.helper";
import { getStore, StoreType } from "@/store";

const essayDictionary = dictionary.essay.rating;

const EssayRating = ({ essayId, className, typeformUrl, ...props }: EssayRatingProps) => {
  const [alreadyRated, setAlreadyRated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rating, setRating] = useState(0);
  const cn = classNames("essay-rating", className);
  const { name = "", uid = "" } = getStore(StoreType.User);

  const getTypeformUrl = (): string => {
    const base = typeformUrl || "https://mesalva.typeform.com/to/pPlveoo4";

    const params = {
      name,
      uid,
      "permalink": essayId,
      "rate": String(rating),
      "typeform-source": "www.mesalva.com",
    };

    const paramsString = new URLSearchParams(params).toString();
    return `${base}?${paramsString}`;
  };

  const handleRate = (rating: number) => {
    setIsProcessing(true);
    setRating(rating);
    updateEssay(essayId, { rating: String(rating) })
      .then(() => {
        setAlreadyRated(true);
        notifySuccess(essayDictionary.submit.success);
      })
      .catch(() => {
        notifyError(essayDictionary.submit.error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  if (isProcessing) {
    return (
      <Card className={cn} {...props}>
        <div className="essay-rating__loader-container">
          <Loader />
        </div>
      </Card>
    );
  }

  if (!alreadyRated) {
    return (
      <Card className={cn} {...props}>
        <Heading level={6} size="xs" className="essay-rating__title">
          {essayDictionary.title}
        </Heading>
        <div className="essay-rating__footer">
          <Button
            className="essay-rating__footer__button-thumb-up"
            iconName="thumb-up"
            onClick={() => handleRate(1)}
          >
            {essayDictionary.thumbUp.text}
          </Button>
          <Button
            className="essay-rating__footer__button-thumb-down"
            iconName="thumb-down"
            onClick={() => handleRate(0)}
          >
            {essayDictionary.thumbDown.text}
          </Button>
        </div>
      </Card>
    );
  }

  const title = rating
    ? essayDictionary.thumbUp.acknowledgmentTitle
    : essayDictionary.thumbDown.acknowledgmentTitle;

  const text = rating
    ? essayDictionary.thumbUp.acknowledgmentText
    : essayDictionary.thumbDown.acknowledgmentText;
  return (
    <Card className={cn} {...props}>
      <Heading level={6} size="xs" className="essay-rating__title">
        {title}
      </Heading>
      <Text
        className="essay-rating__acknowledgment-text"
        html={text.replace("{url}", getTypeformUrl())}
      />
    </Card>
  );
};

export default EssayRating;
