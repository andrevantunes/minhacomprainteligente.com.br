import { handlePersonaActions } from "@/helpers/persona.helper";
import { ToggleDropdown } from "@andrevantunes/andrevds";

import type { DropdownActionAdapterProps } from "./dropdown-action-adapter.types";

const DropdownActionAdapter = ({ list, ...props }: DropdownActionAdapterProps) => {
  const newList = list.map(({ action, successText, errorText, ...itemList }) => ({
    ...itemList,
    onClick: () => action && handlePersonaActions({ action, successText, errorText }),
  }));
  return <ToggleDropdown list={newList} {...props} />;
};

export default DropdownActionAdapter;
