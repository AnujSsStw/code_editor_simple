import { codeProblem, CompilerResult } from "@/lib/constants";
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
  const requestData = req.body as {
    language: string;
    version: string;
    files: { content: string }[];
    args?: any[];
  };
  console.log("Request Data:", requestData.files);
  const endpoint = "https://emkc.org/api/v2/piston/execute";

  const ans: CompilerResult[] = [];
  for (const testCase of codeProblem.testCases) {
    requestData.args = testCase.input;

    try {
      const response = await axios.post(endpoint, requestData);
      const responseData = response.data as {
        run: { output: string; stderr: string };
      };

      if (responseData.run.stderr) {
        ans.push({
          input: testCase.input,
          test_output: testCase.output,
          code_result: responseData.run.stderr,
        });
      } else {
        const code_res = responseData.run.output;
        const result = code_res.split("\n").join("").replace(" ", ""); // might need to change this

        ans.push({
          input: testCase.input,
          test_output: testCase.output,
          code_result: result,
        });
      }
    } catch (error) {
      ans.push({
        input: testCase.input,
        test_output: testCase.output,
        code_result: error,
      });
    }
  }

  return res.status(200).json({ output: ans });
}
