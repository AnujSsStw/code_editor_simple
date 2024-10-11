import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { codeProblem, CompilerResult, languageOptions } from "@/lib/constants";
import Editor from "@monaco-editor/react";

export default function Home() {
  const [language, setLanguage] =
    useState<keyof typeof codeProblem.boilerPlateCode>("javascript");
  const [code, setCode] = useState("// some comment");
  const [output, setOutput] = useState<CompilerResult[]>([]);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    if (codeProblem.boilerPlateCode[language] !== undefined) {
      setCode(codeProblem.boilerPlateCode[language]);
    } else {
      setCode("// boilerplate code not exist");
    }
  }, [language]);

  const handleEditorChange = (value: string) => {
    setCode(value);
  };

  const handleRun = async () => {
    const requestData = {
      language: language,
      version: languageOptions.find((l) => l.value === language)?.version,
      files: [
        {
          content: `${code}`,
        },
      ],
    };

    try {
      const exec = (await (
        await fetch("/api/compile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        })
      ).json()) as {
        output: CompilerResult[];
      };

      console.log(exec.output);

      setOutput(exec.output);
    } catch (e) {
      // error while running code
      console.log(e);
      setError(e);
    }
  };

  return (
    <div className="h-screen">
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border w-screen"
      >
        <ResizablePanel defaultSize={50}>
          <div className="h-full overflow-auto">
            <CodeProblem />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={75}>
              <div className="flex flex-col">
                <div className="flex justify-between mx-2">
                  <LanguageSelect
                    onSelect={setLanguage}
                    languages={languageOptions}
                  />
                  <Button variant="default" onClick={handleRun}>
                    Run
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setCode(codeProblem.boilerPlateCode[language]);
                      setOutput([]);
                    }}
                  >
                    Reset
                  </Button>
                </div>
                <div className="">
                  <Editor
                    height="100vh"
                    language={language}
                    value={code}
                    // @ts-ignore
                    onChange={handleEditorChange}
                    theme="vs-dark"
                  />
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25}>
              {output.length > 0 && (
                <div className="mt-4 overflow-auto h-full">
                  <h1 className="text-2xl font-bold mb-4">Output</h1>
                  {output.map((testCase, index) => (
                    <div key={index} className="mb-4">
                      <p className="font-semibold">Input:</p>
                      <pre className="bg-muted p-2 rounded">
                        {JSON.stringify(testCase.input)}
                      </pre>
                      <p className="font-semibold mt-2">Output:</p>
                      <pre className="bg-muted p-2 rounded">
                        {JSON.stringify(testCase.test_output)}
                      </pre>
                      <p className="font-semibold mt-2">Result:</p>
                      <pre className="bg-muted p-2 rounded">
                        {testCase.code_result}
                      </pre>
                    </div>
                  ))}
                </div>
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

const LanguageSelect = ({
  onSelect,
  languages,
}: {
  onSelect: React.Dispatch<
    React.SetStateAction<keyof typeof codeProblem.boilerPlateCode>
  >;
  languages: { id: number; name: string; label: string; value: string }[];
}) => {
  return (
    <Select
      onValueChange={(v) => {
        onSelect(v);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Javascript" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.id} value={language.value}>
            {language.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const CodeProblem = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{codeProblem.name}</h1>
      <Badge
        variant={
          codeProblem.difficulty === "easy" ? "secondary" : "destructive"
        }
        className="mb-4"
      >
        {codeProblem.difficulty}
      </Badge>
      <p className="text-lg mb-8">{codeProblem.description}</p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Test Cases</CardTitle>
        </CardHeader>
        <CardContent>
          {codeProblem.testCases.map((testCase, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">Input:</p>
              <pre className="bg-muted p-2 rounded">
                nums: {JSON.stringify(testCase.input.nums)}
                <br />
                target: {testCase.input.target}
              </pre>
              <p className="font-semibold mt-2">Output:</p>
              <pre className="bg-muted p-2 rounded">
                {JSON.stringify(testCase.output)}
              </pre>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Example</CardTitle>
          <CardDescription>
            {codeProblem.examples[0].explanation}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside mb-4">
            {codeProblem.examples[0].steps.map((step, index) => (
              <li key={index} className="mb-2">
                {step}
              </li>
            ))}
          </ol>
          <div className="mt-4">
            <p className="font-semibold">Input:</p>
            <pre className="bg-muted p-2 rounded">
              nums: {JSON.stringify(codeProblem.examples[0].input.nums)}
              <br />
              target: {codeProblem.examples[0].input.target}
            </pre>
            <p className="font-semibold mt-2">Output:</p>
            <pre className="bg-muted p-2 rounded">
              {JSON.stringify(codeProblem.examples[0].output)}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
