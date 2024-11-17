import type { EssaySendFormProps } from "./essay-send-form.types";

import { render } from "@testing-library/react";

import EssaySendForm from "./essay-send-form.component";
import * as AccessStore from "@/store/AccessesStore/accesses-store.action";
import { ActionName } from "@/store/store.types";

const essayCreditsMock = 1;
AccessStore.update({ essayCredits: essayCreditsMock }, ActionName.Update);

jest.mock("@/requests", () => {
  return {
    getEssayProposals: async () => [{ label: "any_proposal_label", value: "any_proposal_value" }],
    sendEssayProposal: async () => jest.fn().mockReturnValue(""),
  };
});

const makeSut = (props?: EssaySendFormProps) => render(<EssaySendForm {...props} />);

describe("EssaySendForm", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper.container).toMatchSnapshot();
  });
});
