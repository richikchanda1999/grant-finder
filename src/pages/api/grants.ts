// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from "cheerio";
import { ResponseType } from "src/types";

async function getBlockworksGrants() {
  const URL = "https://blockworks.co/grants";
  const res = await fetch(URL);

  if (!res.ok) {
    throw new Error(`Failed to fetch grants info from ${URL}`);
  }

  const text = await res.text();
  const $ = cheerio.load(text);

  const data = $($('script[id="__NEXT_DATA__"]')[0]).text();

  const json = JSON.parse(data)["props"]["pageProps"];

  const assets = json['assets']

  const individualGrants = json["individualGrants"].filter(
    (grant: any) =>
      grant.status === "Active" && grant.project.ecosystem.includes("SOL")
  );

  return individualGrants.map((grant: any) => {
    grant["project"]["grants"] = undefined;
    if (grant["project"]["imageUrl"] === "" && grant["project"]["assetCode"] !== "") {
      grant["project"]["imageUrl"] = assets[grant["project"]["assetCode"]]['imageUrl']
    }
    return grant;
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  try {
    const blockworkGrants = await getBlockworksGrants();
    res.status(200).json({ data: { blockworkGrants } });
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
