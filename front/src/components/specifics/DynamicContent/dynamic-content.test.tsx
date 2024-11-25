import type { ContentByBffStatusProps } from "./dynamic-content.types";

import { render, waitFor } from "@testing-library/react";

import ContentByBffStatus from "./dynamic-content.component";

import * as BffRequest from "../../../requests/bff.request";
import { getFakeApi } from "@/helpers/api.helpers";

const makeSut = (props?: ContentByBffStatusProps) => render(<ContentByBffStatus {...props} />);

const props = {
  path: "any_path",
  status: {
    fetching: "any_fetching_content",
    default: "any_default_content",
    started: "any_started_content",
  },
};

describe("ContentByBffStatus", () => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter");

  useRouter.mockImplementation(() => ({
    reload: jest.fn(),
    query: {},
  }));
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render component", () => {
    const wrapper = makeSut(props);
    expect(wrapper).toBeTruthy();
  });

  it("should return started content when BffApi return status equals started", async () => {
    jest.spyOn(BffRequest, "getBffApi").mockResolvedValue({ status: "started" });
    const wrapper = makeSut(props);
    await waitFor(() => {
      expect(wrapper.container.textContent).toBe("any_started_content");
    });
  });

  it("should return default content when BffApi return status that is not present in props", async () => {
    jest.spyOn(BffRequest, "getBffApi").mockResolvedValue({ status: "any_random_status" });
    const wrapper = makeSut(props);
    await waitFor(() => {
      expect(wrapper.container.textContent).toBe("any_default_content");
    });
  });

  it("should return fetching content until the promise is resolved", async () => {
    jest.spyOn(BffRequest, "getBffApi").mockImplementation(getFakeApi);
    const wrapper = makeSut(props);
    await waitFor(() => {
      expect(wrapper.container.textContent).toBe("any_fetching_content");
    });
  });
});
