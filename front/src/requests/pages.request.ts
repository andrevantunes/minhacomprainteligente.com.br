export const getPage = async (slug: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_HOST}pages/${slug}`).then((r) => r.json()).then(x => x.value);
};
