export async function fetchFromStrapi(endpoint: string, params: string = "") {
  const res = await fetch(
    `https://ambitious-butterfly-502c332a19.strapiapp.com/api/${endpoint}${params}`,
    {
      headers: {
        Authorization: `Bearer 20b8044bbc71050c74f76bc7b6ea42a3fc4253b48fdc553b99ca0444b424014a3e9b84d2cc0ed41a6a1ad4b3f693b9271fd080ad371e79d14becf1f8d5ecd4966b763d5b646530c5286753a86c0c008b2349d0be19e4709cf626a2cad54d3f87a8e683be8ab0a816a82cf2dea693a0459206b4b2ddc3a80520cac9add2acde26`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return res.json();
}

export async function getTermOfTheDay() {
  return fetchFromStrapi(
    "terms",
    "?sort[0]=createdAt:desc&pagination[limit]=1"
  );
}

export async function getTerms() {
  return fetchFromStrapi("terms");
}
