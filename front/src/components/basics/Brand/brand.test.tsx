import type { BrandProps, ProviderDefaultProps } from "./brand.types";

import { render } from "@testing-library/react";

import {
  defaultPlatformContextValue,
  PlatformContext,
  PlatformContextProviderValue,
} from "@/contexts/PlatformContext";
import { AccessesStore, ActionName, UserStore } from "@/store";
import Brand from "./brand.component";
import { userMed, userWithoutImage } from "./brand.mock";

const makeSut = (
  props?: BrandProps,
  providerDefaultProps: ProviderDefaultProps = {
    brand: {
      logos: {
        default: undefined,
        enem: undefined,
        med: undefined,
      },
    },
  }
) => {
  const value: PlatformContextProviderValue = {
    ...defaultPlatformContextValue,
    ...providerDefaultProps,
  };
  return render(
    <PlatformContext.Provider value={value}>
      <Brand {...props} />
    </PlatformContext.Provider>
  );
};

describe("Brand", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });

  it("should receive med image when user is med", () => {
    const src = "any_med_image_src";
    AccessesStore.update({ type: "medicina" }, "update");
    const { container } = makeSut(undefined, { brand: { logos: { med: { src } } } });
    const el = container.querySelector(`[src="${src}"]`);
    expect(el).toBeTruthy();
  });

  it("should receive med image when user is experimentacao", () => {
    const src = "any_med_image_src";
    AccessesStore.update({ type: "experimentacao" }, "update");
    const { container } = makeSut(undefined, { brand: { logos: { med: { src } } } });
    const el = container.querySelector(`[src="${src}"]`);
    expect(el).toBeTruthy();
  });

  it("should receive enem image when user is enem", () => {
    const src = "any_enem_image_src";
    AccessesStore.update({ type: "enem-e-vestibulares" }, "update");
    const { container } = makeSut(undefined, { brand: { logos: { enem: { src } } } });
    const el = container.querySelector(`[src="${src}"]`);
    expect(el).toBeTruthy();
  });

  it("should receive default image when user is other types", () => {
    const src = "any_default_image_src";
    AccessesStore.update({ type: "some_other_type" }, "update");
    const { container } = makeSut(undefined, { brand: { logos: { default: { src } } } });
    const el = container.querySelector(`[src="${src}"]`);
    expect(el).toBeTruthy();
  });
});
