export const fetchData = async ({
  url,
  settings
}: {
  url: string;
  settings: object;
}) => {
  const resp = await fetch(url, { ...settings });
  return await resp.json();
};
