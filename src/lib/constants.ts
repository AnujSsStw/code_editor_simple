import { argv } from "process";
import { formatTime } from "./utils";

export const languageOptions = [
  {
    id: 63,
    name: "JavaScript (Node.js 12.14.0)",
    label: "JavaScript (Node.js 12.14.0)",
    value: "javascript",
    version: "18.15.0",
    aliases: ["node-javascript", "node-js", "javascript", "js"],
    runtime: "node",
  },
  {
    id: 50,
    name: "C (GCC 9.2.0)",
    label: "C (GCC 9.2.0)",
    value: "c",
    version: "10.2.0",
    aliases: ["gcc"],
    runtime: "gcc",
  },
  {
    id: 54,
    name: "C++ (GCC 9.2.0)",
    label: "C++ (GCC 9.2.0)",
    value: "cpp",
    version: "10.2.0",
    aliases: ["cpp", "g++"],
    runtime: "gcc",
  },
  {
    id: 51,
    name: "C# (Mono 6.6.0.161)",
    label: "C# (Mono 6.6.0.161)",
    value: "csharp",
    version: "5.0.201",
    aliases: [
      "csharp",
      "c#",
      "cs",
      "c#.net",
      "cs.net",
      "c#-dotnet",
      "cs-dotnet",
      "csharp-dotnet",
      "dotnet-c#",
      "dotnet-cs",
      "dotnet-csharp",
    ],
    runtime: "dotnet",
  },
  {
    id: 60,
    name: "Go (1.13.5)",
    label: "Go (1.13.5)",
    value: "go",
    version: "1.16.2",
    aliases: ["go", "golang"],
  },
  {
    id: 62,
    name: "Java (OpenJDK 13.0.1)",
    label: "Java (OpenJDK 13.0.1)",
    value: "java",
    version: "15.0.2",
    aliases: [],
  },

  {
    id: 71,
    name: "Python (3.8.1)",
    label: "Python (3.8.1)",
    value: "python",
    version: "3.10.0",
    aliases: ["py", "py3", "python3", "python3.10"],
  },
  {
    id: 72,
    name: "Ruby (2.7.0)",
    label: "Ruby (2.7.0)",
    value: "ruby",
    version: "3.0.1",
    aliases: ["ruby3", "rb"],
  },
  {
    id: 81,
    name: "Scala (2.13.2)",
    label: "Scala (2.13.2)",
    value: "scala",
    version: "3.2.2",
    aliases: ["sc"],
  },
  {
    id: 83,
    name: "Swift (5.2.3)",
    label: "Swift (5.2.3)",
    value: "swift",
    version: "5.3.3",
    aliases: ["swift"],
  },
];

export const codeProblem = {
  id: 1,
  name: "Two Sum",
  description:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
  difficulty: "easy",
  testCases: [
    {
      input: [[2, 7, 11, 15], 9],
      output: [0, 1],
    },
    {
      input: [[3, 2, 4], 6],
      output: [1, 2],
    },
    {
      input: [[3, 3], 6],
      output: [0, 1],
    },
  ],
  examples: [
    {
      explanation: "To solve this problem, you can:",
      steps: [
        "Create an empty object to store the index of each number.",
        "Iterate through the array of numbers.",
        "For each number, calculate the difference between the target and the number.",
        "Check if the difference exists in the object.",
        "If it exists, return the index of the difference and the current index.",
        "If it doesn't exist, store the current index in the object.",
      ],
      input: {
        nums: [2, 7, 11, 15],
        target: 9,
      },
      output: [0, 1],
    },
  ],
  boilerPlateCode: {
    javascript: `
//#region readonly
const process = require("process");
function main() {
    // Test case input
    const nums = process.argv[2].split(",").map(Number);
    const target = parseInt(process.argv[3]);
    
    // Call your function and print the result
    const result = twoSum(nums, target);
    console.log(JSON.stringify(result));
}
//#endregion readonly

function twoSum(nums, target) {
    // Your code here
}

main();
`,

    python: `
import sys

def main():
    # Test case input
    nums = list(map(int, sys.argv[1].split(",")))
    target = int(sys.argv[2])
    
    # Call your function and print the result
    result = twoSum(nums, target)
    print(result)

def twoSum(nums, target):
    # Your code here
    pass

if __name__ == "__main__":
    main()
`,

    java: `
public class Main {
    public static void main(String[] args) {
        // Test case input
        String[] numStrings = args[0].split(",");
        int[] nums = new int[numStrings.length];
        for (int i = 0; i < numStrings.length; i++) {
            nums[i] = Integer.parseInt(numStrings[i]);
        }
        int target = Integer.parseInt(args[1]);
        
        // Call your function and print the result
        int[] result = twoSum(nums, target);
        System.out.println("[" + result[0] + "," + result[1] + "]");
    }

    public static int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{0, 0};
    }
}
`,

    cpp: `
#include <iostream>
#include <vector>
#include <string>
#include <sstream>

std::vector<int> twoSum(std::vector<int>& nums, int target) {
    // Your code here
    return std::vector<int>{0, 0};
}

int main(int argc, char* argv[]) {
    // Test case input
    std::vector<int> nums;
    std::string numsStr = argv[1];
    std::stringstream ss(numsStr);
    std::string token;
    while (std::getline(ss, token, ',')) {
        nums.push_back(std::stoi(token));
    }
    int target = std::stoi(argv[2]);
    
    // Call your function and print the result
    std::vector<int> result = twoSum(nums, target);
    std::cout << "[" << result[0] << "," << result[1] << "]" << std::endl;
    return 0;
}
`,

    go: `
package main

import (
    "fmt"
    "os"
    "strconv"
    "strings"
)

func twoSum(nums []int, target int) []int {
    // Your code here
    return []int{0, 0}
}

func main() {
    // Test case input
    numsStr := strings.Split(os.Args[1], ",")
    nums := make([]int, len(numsStr))
    for i, str := range numsStr {
        nums[i], _ = strconv.Atoi(str)
    }
    target, _ := strconv.Atoi(os.Args[2])
    
    // Call your function and print the result
    result := twoSum(nums, target)
    fmt.Printf("[%d,%d]\n", result[0], result[1])
}
`,

    ruby: `
def two_sum(nums, target)
    # Your code here
end

def main
    # Test case input
    nums = ARGV[0].split(",").map(&:to_i)
    target = ARGV[1].to_i
    
    # Call your function and print the result
    result = two_sum(nums, target)
    puts result.inspect
end

main
`,

    csharp: `
using System;
using System.Linq;

public class Program {
    public static void Main(string[] args) {
        // Test case input
        int[] nums = args[0].Split(',').Select(int.Parse).ToArray();
        int target = int.Parse(args[1]);
        
        // Call your function and print the result
        int[] result = TwoSum(nums, target);
        Console.WriteLine($"[{result[0]},{result[1]}]");
    }

    public static int[] TwoSum(int[] nums, int target) {
        // Your code here
        return new int[] {0, 0};
    }
}
`,

    scala: `
object Main extends App {
    def twoSum(nums: Array[Int], target: Int): Array[Int] = {
        // Your code here
        Array(0, 0)
    }

    // Test case input
    val nums = args(0).split(",").map(_.toInt)
    val target = args(1).toInt
    
    // Call your function and print the result
    val result = twoSum(nums, target)
    println(s"[result(0),result(1)]")
}
`,

    swift: `
import Foundation

func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
    // Your code here
    return [0, 0]
}

// Test case input
let nums = CommandLine.arguments[1].split(separator: ",").map { Int(String($0))! }
let target = Int(CommandLine.arguments[2])!

// Call your function and print the result
let result = twoSum(nums, target)
print("[\(result[0]),\(result[1])]")
`,

    c: `
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void twoSum(int* nums, int numsSize, int target, int* returnArray) {
    // Your code here
    returnArray[0] = 0;
    returnArray[1] = 0;
}

int main(int argc, char* argv[]) {
    if (argc != 3) {
        printf("Usage: %s <comma-separated numbers> <target>\n", argv[0]);
        return 1;
    }

    // Parse the comma-separated numbers
    char* input = argv[1];
    int numsSize = 1;
    for (int i = 0; input[i]; i++) {
        if (input[i] == ',') numsSize++;
    }

    int* nums = malloc(numsSize * sizeof(int));
    char* token = strtok(input, ",");
    int i = 0;
    while (token != NULL) {
        nums[i++] = atoi(token);
        token = strtok(NULL, ",");
    }

    // Parse the target
    int target = atoi(argv[2]);

    // Prepare return array
    int returnArray[2];

    // Call the function
    twoSum(nums, numsSize, target, returnArray);

    // Print result
    printf("[%d,%d]\n", returnArray[0], returnArray[1]);

    // Clean up
    free(nums);
    return 0;
}
`,
  },
  t: { input: [[2, 7, 11, 15], 9] }, // for types
  o: [0, 1], // for types
};

export interface CompilerResult {
  input: typeof codeProblem.t.input;
  test_output: typeof codeProblem.o;
  code_result: string | unknown | any;
}
