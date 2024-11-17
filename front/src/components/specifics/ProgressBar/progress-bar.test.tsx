import Router from "next/router";
import { render } from "@testing-library/react";

import ProgressBar from "./progress-bar.component";

const mockStart = jest.fn();
const mockDone = jest.fn();

xdescribe("ProgressBar", () => {
  beforeEach(() => {
    render(<ProgressBar />);
  });

  describe("Next.js router events", () => {
    it("should start the progress bar when route change starts", () => {
      Router.events.emit("routeChangeStart");
      expect(mockStart).toHaveBeenCalled();
    });

    it("should stop the progress bar when route change completes", () => {
      Router.events.emit("routeChangeComplete");
      expect(mockDone).toHaveBeenCalled();
    });

    it("should stop the progress bar when route change errors", () => {
      Router.events.emit("routeChangeError");
      expect(mockDone).toHaveBeenCalled();
    });
  });
});
