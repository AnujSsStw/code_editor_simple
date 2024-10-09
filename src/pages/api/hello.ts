// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const languages = await axios.get("https://emkc.org/api/v2/piston/runtimes", {
    withCredentials: false,
  });
  res.status(200).json(languages.data);
}
