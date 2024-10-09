import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export async function compileCode(requestData: any) {}

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestData = req.body;
  console.log("Request Data:", requestData);

  const endpoint = "https://emkc.org/api/v2/piston/execute";
  try {
    const response = await axios.post(endpoint, requestData);
    // console.log("Response:", response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error });
  }
}
