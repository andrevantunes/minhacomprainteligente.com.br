import type { EssayRatingProps } from "./essay-rating.types";

import { fireEvent, render, waitFor } from "@testing-library/react";

import EssayRating from "./essay-rating.component";
import * as GlobalStore from "@/store/store.global";
import * as EssaysRequest from "../../../requests/essays.request";
import dictionary from "@/configs/dictionary";

const updateEssaySpy = jest.spyOn(EssaysRequest, "updateEssay").mockResolvedValue(null);

const essayDictionary = dictionary.essay.rating;

const essayRatingProps = {
  essayId: "any_essay_id",
};

const makeGetUserStore = (user: any) => jest.spyOn(GlobalStore, "getStore").mockReturnValue(user);

const makeSut = (props?: EssayRatingProps) => render(<EssayRating {...props} />);

describe("<EssayRating>", () => {
  beforeAll(() => {
    makeGetUserStore({
      uid: "any_uid",
      name: "any_name",
    });
  });

  it("should see acknowledgment title when rate", async () => {
    const { findByText } = makeSut(essayRatingProps);
    const likeButton = await findByText(essayDictionary.thumbUp.text);
    fireEvent.click(likeButton);
    await findByText(essayDictionary.thumbUp.acknowledgmentTitle);
  });

  it("should update essay with rate 1 when liked", async () => {
    const { essayId } = essayRatingProps;
    const { findByText } = makeSut(essayRatingProps);
    const likeButton = await findByText(essayDictionary.thumbUp.text);
    fireEvent.click(likeButton);
    await waitFor(() => {
      expect(updateEssaySpy).toBeCalledTimes(1);
      expect(updateEssaySpy).toBeCalledWith(essayId, { rating: "1" });
    });
  });

  it("should update essay with rate 0 when disliked", async () => {
    const { essayId } = essayRatingProps;
    const { findByText } = makeSut(essayRatingProps);
    const likeButton = await findByText(essayDictionary.thumbDown.text);
    fireEvent.click(likeButton);
    await waitFor(() => {
      expect(updateEssaySpy).toBeCalledTimes(1);
      expect(updateEssaySpy).toBeCalledWith(essayId, { rating: "0" });
    });
  });

  it("should generate correct link", async () => {
    const { findByText, container } = makeSut(essayRatingProps);
    const likeButton = await findByText(essayDictionary.thumbUp.text);
    fireEvent.click(likeButton);
    await waitFor(() => {
      const anchor = container.querySelector("a");
      expect(anchor?.getAttribute("href")).toBe(
        "https://mesalva.typeform.com/to/pPlveoo4?name=any_name&uid=any_uid&permalink=any_essay_id&rate=1&typeform-source=www.mesalva.com"
      );
    });
  });
});
