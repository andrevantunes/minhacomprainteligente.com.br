export const getPage = async (slug: string) => {
  const slugWithSlash = slug.startsWith("/") ? slug : `/${slug}`;
  return fetch(`${process.env.NEXT_PUBLIC_API_HOST}pages${slugWithSlash}`)
    .then((r) => r.json())
    .then((x) => x.value);
};
