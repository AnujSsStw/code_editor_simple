import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CompilerResult } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const checkCompletion = (
  output: CompilerResult[],
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>,
  timer: number,
  runCount: number
) => {
  const allPassed = output.every((result) => {
    result.code_result.toString().trim() ===
      result.test_output.toString().trim();
  });
  if (allPassed) {
    setIsRunning(false);
    console.log(
      `Challenge completed - Time taken: ${formatTime(timer)}, Run count: ${
        runCount + 1
      }`
    );
  }
};
