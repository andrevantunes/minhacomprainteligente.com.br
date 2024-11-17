export const parse = (
  json: any[any],
  checked: boolean,
  loading: boolean,
  handleChange: (value: boolean) => void,
  handleClick: () => void
): string => {
  return json?.map((item: any) => {
    if (item?.id === "checkbox-agree-terms") {
      item.checked = checked;
      item.onChange = handleChange;
    }

    if (item?.id === "button-confirm-agree-terms") {
      item.onClick = handleClick;
      item.disabled = !checked || loading;
      return item;
    }

    if (
      Array.isArray(item?.children) &&
      item?.children.some((item: any) => item?.id === "button-confirm-agree-terms")
    ) {
      item?.children?.map((item: any) => {
        if (item.id === "button-confirm-agree-terms") {
          item.onClick = handleClick;
          item.disabled = !checked || loading;
          return item;
        }
      });
    }

    return item;
  });
};
