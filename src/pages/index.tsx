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
import React, { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { codeProblem, CompilerResult, languageOptions } from "@/lib/constants";
import { checkCompletion, formatTime } from "@/lib/utils";
import Editor from "@monaco-editor/react";
import { MonacoEditorWithReadOnlySection } from "@/components/codeEditor";

export default function CodingChallenge() {
  const [language, setLanguage] =
    useState<keyof typeof codeProblem.boilerPlateCode>("javascript");
  const [code, setCode] = useState("// some comment");
  const [output, setOutput] = useState<CompilerResult[]>([]);
  // const [error, setError] = useState<any | null>(null);
  const [prompt, setPrompt] = useState("");
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [runCount, setRunCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (isRunning) {
        setTimer((prevTimer) => prevTimer + 1);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

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
    setRunCount((prevCount) => prevCount + 1);
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
      checkCompletion(exec.output, setIsRunning, timer, runCount);
    } catch (e) {
      console.log("ERROR WHILE EXECUTING THE CODE MAYBE", e);
    }
  };

  const handleSubmit = async () => {
    await handleRun();
    setIsSubmitted(true);
    setIsRunning(false);
    console.log(
      `Final submission - Time taken: ${formatTime(timer)}, Run count: ${
        runCount + 1
      }`
    );
  };

  const handlePromptSubmit = async () => {
    // Implement AI prompt submission logic here
    console.log("Submitting prompt:", prompt);
  };

  return (
    <div className="h-screen">
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border w-screen"
      >
        <ResizablePanel defaultSize={25}>
          <div className="h-full overflow-auto p-4">
            <CodeProblem />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction="vertical">
            {/* prompt */}
            <ResizablePanel defaultSize={15}>
              <div className="p-4 h-full overflow-auto">
                <h2 className="text-lg font-semibold mb-2">Prompt to AI</h2>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter your prompt here"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <Button onClick={handlePromptSubmit}>Submit Prompt</Button>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />

            {/* code editor */}
            <ResizablePanel defaultSize={60}>
              <div className="flex flex-col h-full">
                <div className="flex justify-between p-4">
                  <LanguageSelect
                    onSelect={setLanguage}
                    languages={languageOptions}
                  />
                  <div className="space-x-2">
                    <span className="mr-4">Time: {formatTime(timer)}</span>
                    <span className="mr-4">Runs: {runCount}</span>
                    <Button
                      variant="default"
                      onClick={handleRun}
                      disabled={isSubmitted}
                    >
                      Run
                    </Button>
                    <Button
                      variant="default"
                      onClick={handleSubmit}
                      disabled={isSubmitted}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setCode(codeProblem.boilerPlateCode[language]);
                        setOutput([]);
                      }}
                      disabled={isSubmitted}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
                <div className="flex-grow">
                  <MonacoEditorWithReadOnlySection
                    code={code}
                    handleCodeChange={handleEditorChange}
                    language={language}
                  />
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />

            {/* output */}
            {output.length > 0 && (
              <ResizablePanel defaultSize={25}>
                <div className="p-4 h-full overflow-auto">
                  <h2 className="text-lg font-semibold mb-2">Output</h2>
                  {output.length > 0 ? (
                    output.map((testCase, index) => (
                      <div key={index} className="mb-4">
                        {testCase.code_result.toString().trim() ===
                        testCase.test_output.toString().trim() ? (
                          <Badge variant="default">Passed</Badge>
                        ) : (
                          <Badge variant="destructive">Failed</Badge>
                        )}
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
                    ))
                  ) : (
                    <p>No output yet. Run your code to see results.</p>
                  )}
                </div>
              </ResizablePanel>
            )}
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
      onValueChange={(v) =>
        onSelect(v as keyof typeof codeProblem.boilerPlateCode)
      }
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
    <div>
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
                {JSON.stringify(testCase.input)}
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
