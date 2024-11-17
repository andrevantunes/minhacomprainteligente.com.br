import type { VideoProps } from "./card-youtube-notification.types";

import { render } from "@testing-library/react";

import CardYoutubeNotification from "./card-youtube-notification.component";

const makeSut = (props?: VideoProps) => render(<CardYoutubeNotification {...props} />);

describe("Video", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
