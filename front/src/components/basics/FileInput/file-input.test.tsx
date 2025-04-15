import type { FileInputProps } from "./file-input.types";

import { render } from "@testing-library/react";

import FileInput from "./file-input.component";

const makeSut = (props?: FileInputProps) => render(<FileInput {...props} />);

describe("FileInput", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
