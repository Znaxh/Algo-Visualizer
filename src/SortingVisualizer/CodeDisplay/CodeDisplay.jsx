import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { FaPython } from "react-icons/fa";
import { TbBrandCpp } from "react-icons/tb";
import { IoLogoJavascript } from "react-icons/io";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./CodeDisplay.css"; // Import the CSS for styling

const CodeDisplay = ({ language, code, onLanguageChange ,index }) => {
  const [copySuccess, setCopySuccess] = useState("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000); // Clear the success message after 2 seconds
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };
  const algorithmFileNames = {
    0: 'Selection Sort',
    1: 'Bubble Sort',
    2: 'Insertion Sort',
    3: 'Merge Sort',
    4: 'Quick Sort'
  };
  
  const fileName = algorithmFileNames[index]; // Assume selectedAlgorithmIndex is a state or prop that indicates the currently selected algorithm.
  

  return (
    <div className="code-container">
      <div className="code-header">
        <div className="circles-container">
          <div
            className="circle"
            style={{ backgroundColor: "rgb(255, 95, 87)" }}
          ></div>
          <div
            className="circle"
            style={{ backgroundColor: "rgb(254, 188, 45)" }}
          ></div>
          <div
            className="circle"
            style={{ backgroundColor: "rgb(40, 200, 64)" }}
          ></div>
        </div>
        <div className="language-buttons">
          <button
            className={language === "python" ? "active" : ""}
            onClick={() => onLanguageChange("python")}
          >
            <FaPython color="rgb(81,154,186)" />
            {fileName}.py
          </button>
          <button
            className={language === "cpp" ? "active" : ""}
            onClick={() => onLanguageChange("cpp")}
          >
            <TbBrandCpp color="rgb(81,154,186)" />
            {fileName}.cpp
          </button>
          <button
            className={language === "javascript" ? "active" : ""}
            onClick={() => onLanguageChange("javascript")}
          >
            <IoLogoJavascript color="rgb(245,196,0)" />
            {fileName}.js
          </button>
        </div>
        <div className="copy-section">
          <button
            onClick={handleCopy}
            className={`copy-button ${copySuccess ? "copied" : ""}`}
          >
            {copySuccess ? "Copied!" : "Copy Code"}
          </button>
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        style={atomDark}
        className="syntax-highlighter"
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const Codes = ({ index }) => {
  const [language, setLanguage] = useState("python");
  const codeSnippets = {
    0: {
      python: `
  def selection_sort(arr):
      for i in range(len(arr)):
          min_idx = i
          for j in range(i+1, len(arr)):
              if arr[min_idx] > arr[j]:
                  min_idx = j
          arr[i], arr[min_idx] = arr[min_idx], arr[i]
      return arr
      `,
      cpp: `
  #include <iostream>
  #include <vector>
  
  void selectionSort(std::vector<int>& arr) {
      int n = arr.size();
      for (int i = 0; i < n-1; i++) {
          int min_idx = i;
          for (int j = i+1; j < n; j++)
              if (arr[j] < arr[min_idx])
                  min_idx = j;
          std::swap(arr[min_idx], arr[i]);
      }
  }
      `,
      javascript: `
  function selectionSort(arr) {
      for (let i = 0; i < arr.length; i++) {
          let minIdx = i;
          for (let j = i + 1; j < arr.length; j++) {
              if (arr[j] < arr[minIdx]) {
                  minIdx = j;
              }
          }
          [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      }
      return arr;
  }
      `,
    },
    1: {
      python: `
  def bubble_sort(arr):
      n = len(arr)
      for i in range(n):
          for j in range(0, n-i-1):
              if arr[j] > arr[j+1]:
                  arr[j], arr[j+1] = arr[j+1], arr[j]
      return arr
      `,
      cpp: `
  #include <iostream>
  #include <vector>
  
  void bubbleSort(std::vector<int>& arr) {
      int n = arr.size();
      for (int i = 0; i < n-1; i++) {
          for (int j = 0; j < n-i-1; j++) {
              if (arr[j] > arr[j+1]) {
                  std::swap(arr[j], arr[j+1]);
              }
          }
      }
  }
      `,
      javascript: `
  function bubbleSort(arr) {
      for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr.length - i - 1; j++) {
              if (arr[j] > arr[j + 1]) {
                  [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
              }
          }
      }
      return arr;
  }
      `,
    },
    2: {
      python: `
  def insertion_sort(arr):
      for i in range(1, len(arr)):
          key = arr[i]
          j = i-1
          while j >= 0 and key < arr[j]:
              arr[j + 1] = arr[j]
              j -= 1
          arr[j + 1] = key
      return arr
      `,
      cpp: `
  #include <iostream>
  #include <vector>
  
  void insertionSort(std::vector<int>& arr) {
      int n = arr.size();
      for (int i = 1; i < n; i++) {
          int key = arr[i];
          int j = i - 1;
          while (j >= 0 && arr[j] > key) {
              arr[j + 1] = arr[j];
              j = j - 1;
          }
          arr[j + 1] = key;
      }
  }
      `,
      javascript: `
  function insertionSort(arr) {
      for (let i = 1; i < arr.length; i++) {
          let key = arr[i];
          let j = i - 1;
          while (j >= 0 && arr[j] > key) {
              arr[j + 1] = arr[j];
              j = j - 1;
          }
          arr[j + 1] = key;
      }
      return arr;
  }
      `,
    },
    3: {
      python: `
  def merge_sort(arr):
      if len(arr) > 1:
          mid = len(arr) // 2
          L = arr[:mid]
          R = arr[mid:]
          merge_sort(L)
          merge_sort(R)
          i = j = k = 0
          while i < len(L) and j < len(R):
              if L[i] < R[j]:
                  arr[k] = L[i]
                  i += 1
              else:
                  arr[k] = R[j]
                  j += 1
              k += 1
          while i < len(L):
              arr[k] = L[i]
              i += 1
              k += 1
          while j < len(R):
              arr[k] = R[j]
              j += 1
              k += 1
      return arr
      `,
      cpp: `
  #include <iostream>
  #include <vector>
  
  void merge(std::vector<int>& arr, int l, int m, int r) {
      int n1 = m - l + 1;
      int n2 = r - m;
      std::vector<int> L(n1), R(n2);
      for (int i = 0; i < n1; i++)
          L[i] = arr[l + i];
      for (int j = 0; j < n2; j++)
          R[j] = arr[m + 1 + j];
      int i = 0, j = 0, k = l;
      while (i < n1 && j < n2) {
          if (L[i] <= R[j]) {
              arr[k] = L[i];
              i++;
          } else {
              arr[k] = R[j];
              j++;
          }
          k++;
      }
      while (i < n1) {
          arr[k] = L[i];
          i++;
          k++;
      }
      while (j < n2) {
          arr[k] = R[j];
          j++;
          k++;
      }
  }
  
  void mergeSort(std::vector<int>& arr, int l, int r) {
      if (l >= r) return;
      int m = l + (r - l) / 2;
      mergeSort(arr, l, m);
      mergeSort(arr, m + 1, r);
      merge(arr, l, m, r);
  }
      `,
      javascript: `
  function mergeSort(arr) {
      if (arr.length <= 1) {
          return arr;
      }
      const mid = Math.floor(arr.length / 2);
      const left = mergeSort(arr.slice(0, mid));
      const right = mergeSort(arr.slice(mid));
      return merge(left, right);
  }
  
  function merge(left, right) {
      let resultArray = [], leftIndex = 0, rightIndex = 0;
      while (leftIndex < left.length && rightIndex < right.length) {
          if (left[leftIndex] < right[rightIndex]) {
              resultArray.push(left[leftIndex]);
              leftIndex++;
          } else {
              resultArray.push(right[rightIndex]);
              rightIndex++;
          }
      }
      return resultArray
              .concat(left.slice(leftIndex))
              .concat(right.slice(rightIndex));
  }
      `,
    },
    4: {
      python: `
  def quick_sort(arr):
      if len(arr) <= 1:
          return arr
      pivot = arr[len(arr) // 2]
      left = [x for x in arr if x < pivot]
      middle = [x for x in arr if x == pivot]
      right = [x for x in arr if x > pivot]
      return quick_sort(left) + middle + quick_sort(right)
      `,
      cpp: `
  #include <iostream>
  #include <vector>
  
  int partition(std::vector<int>& arr, int low, int high) {
      int pivot = arr[high];
      int i = (low - 1);
      for (int j = low; j <= high - 1; j++) {
          if (arr[j] < pivot) {
              i++;
              std::swap(arr[i], arr[j]);
          }
      }
      std::swap(arr[i + 1], arr[high]);
      return (i + 1);
  }
  
  void quickSort(std::vector<int>& arr, int low, int high) {
      if (low < high) {
          int pi = partition(arr, low, high);
          quickSort(arr, low, pi - 1);
          quickSort(arr, pi + 1, high);
      }
  }
      `,
      javascript: `
  function quickSort(arr) {
      if (arr.length <= 1) {
          return arr;
      }
      const pivot = arr[arr.length - 1];
      const left = [], right = [];
      for (const el of arr.slice(0, arr.length - 1)) {
          el < pivot ? left.push(el) : right.push(el);
      }
      return [...quickSort(left), pivot, ...quickSort(right)];
  }
      `,
    },
  };
    
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const currentCode = codeSnippets[index][language];

  return (
    <div style={{ padding: "20px" }}>
      <CodeDisplay
        language={language}
        code={currentCode}
        onLanguageChange={handleLanguageChange}
        index = {index}
      />
    </div>
  );
};

export default Codes;
