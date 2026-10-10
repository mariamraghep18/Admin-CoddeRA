'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Code2,
  ListChecks,
  FileCode,
  Terminal,
  Save,
  Play,
  Eye,
  CheckCircle2,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';

export function TaskAuthoringScreen() {
  const { t, language, isRtl, showToast } = useApp();

  const [taskType, setTaskType] = useState<'mcq' | 'fill' | 'sandbox'>('mcq');

  // MCQ State
  const [mcqPrompt, setMcqPrompt] = useState('What happens if the recursive function lacks a base case?');
  const [mcqOptions, setMcqOptions] = useState([
    'The program runs infinitely until RecursionError: maximum recursion depth exceeded',
    'The turtle immediately turns 360 degrees and stops',
    'The computer restarts automatically',
    'The program converts itself into an iterative for-loop',
  ]);
  const [mcqCorrectIndex, setMcqCorrectIndex] = useState(0);
  const [mcqHint, setMcqHint] = useState('Remember that every recursion requires an exit condition to stop adding frames to the call stack!');

  // Fill in blank state
  const [fillCode, setFillCode] = useState(
    `def draw_star(size, order):\n    if {{order}} <= 0:\n        return\n    for i in range(5):\n        turtle.forward(size)\n        draw_star(size / 3, {{order - 1}})\n        turtle.left(144)`
  );

  // Sandbox state
  const [starterCode, setStarterCode] = useState(
    `def count_vowels(text):\n    # Write a function that returns the number of vowels (a, e, i, o, u)\n    vowels = "aeiouAEIOU"\n    return sum(1 for char in text if char in vowels)\n`
  );
  const [unitTests, setUnitTests] = useState(
    `assert count_vowels("codera") == 3\nassert count_vowels("xyz") == 0\nassert count_vowels("Artificial Intelligence") == 10\nprint("All test assertions passed successfully!")`
  );
  const [timeoutLimit, setTimeoutLimit] = useState(5);

  // Student Simulator Modal
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [simSelectedOption, setSimSelectedOption] = useState<number | null>(null);
  const [simOutput, setSimOutput] = useState<string | null>(null);

  const handleRunSimulation = () => {
    if (taskType === 'mcq') {
      if (simSelectedOption === mcqCorrectIndex) {
        setSimOutput('Correct! 100/100 points awarded.');
      } else {
        setSimOutput(`Incorrect. Hint: ${mcqHint}`);
      }
    } else {
      setSimOutput(`[Execution Sandbox Output]\n>>> Running Unit Tests...\n✓ Test 1: count_vowels("codera") == 3 (Passed)\n✓ Test 2: count_vowels("xyz") == 0 (Passed)\n✓ Test 3: count_vowels("Artificial Intelligence") == 10 (Passed)\n\nScore: 100% | Execution Time: 0.28s`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.nav.taskAuthoring}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Author and calibrate reusable interactive challenges: Multiple Choice, Tokenized Fill-in-Blank, and Sandboxed Code assertions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<Eye className="w-3.5 h-3.5" />}
            onClick={() => {
              setSimOutput(null);
              setIsSimulatorOpen(true);
            }}
          >
            Preview in Student Simulator
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={<Save className="w-3.5 h-3.5" />}
            onClick={() => showToast('Saved task definition to shared curricular catalog!', 'success')}
          >
            Save to Shared Library
          </Button>
        </div>
      </div>

      {/* Type Switcher Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-xl max-w-fit">
        <button
          onClick={() => setTaskType('mcq')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            taskType === 'mcq'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <ListChecks className="w-4 h-4 text-blue-600" />
          <span>1. Multiple Choice</span>
        </button>

        <button
          onClick={() => setTaskType('fill')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            taskType === 'fill'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <FileCode className="w-4 h-4 text-emerald-600" />
          <span>2. Fill in Blank {'{{placeholder}}'}</span>
        </button>

        <button
          onClick={() => setTaskType('sandbox')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            taskType === 'sandbox'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Terminal className="w-4 h-4 text-purple-600" />
          <span>3. Code Sandbox Assertion</span>
        </button>
      </div>

      {/* Type 1: MCQ Authoring */}
      {taskType === 'mcq' && (
        <Card>
          <CardHeader
            title="Multiple Choice Challenge Configuration"
            icon={<ListChecks className="w-4 h-4 text-blue-600" />}
          />
          <CardContent className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Question Prompt:
              </label>
              <textarea
                rows={2}
                value={mcqPrompt}
                onChange={(e) => setMcqPrompt(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold text-slate-700 dark:text-slate-300 block">
                Answer Options (Select the correct radio):
              </label>
              {mcqOptions.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="mcqAnswer"
                    checked={mcqCorrectIndex === idx}
                    onChange={() => setMcqCorrectIndex(idx)}
                    className="text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const newOpts = [...mcqOptions];
                      newOpts[idx] = e.target.value;
                      setMcqOptions(newOpts);
                    }}
                    className={`flex-1 p-2 rounded-lg border text-xs ${
                      mcqCorrectIndex === idx
                        ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20 font-semibold'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                    }`}
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Pedagogical Explanatory Hint (revealed after 1st failed attempt):
              </label>
              <input
                type="text"
                value={mcqHint}
                onChange={(e) => setMcqHint(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Type 2: Fill in the Blank */}
      {taskType === 'fill' && (
        <Card>
          <CardHeader
            title="Fill in the Blank Code Completion"
            subtitle="Wrap interactive inputs inside double brackets, e.g. {{order - 1}}"
            icon={<FileCode className="w-4 h-4 text-emerald-600" />}
          />
          <CardContent className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Python Snippet with {'{{placeholders}}'}:
              </label>
              <textarea
                rows={8}
                value={fillCode}
                onChange={(e) => setFillCode(e.target.value)}
                className="w-full p-3 font-mono text-xs bg-slate-950 text-emerald-400 border border-slate-800 rounded-xl"
              />
            </div>
            <div className="p-3 bg-blue-50/60 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-slate-700 dark:text-slate-300">
              <span className="font-bold block mb-1">Detected Tokens:</span>
              <div className="flex gap-2">
                <Badge variant="primary" size="sm">Token 1: order</Badge>
                <Badge variant="primary" size="sm">Token 2: order - 1</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Type 3: Code Sandbox Execution */}
      {taskType === 'sandbox' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader
              title="Student Starter Code (IDE Buffer)"
              icon={<Terminal className="w-4 h-4 text-purple-600" />}
            />
            <CardContent className="space-y-3 text-xs">
              <textarea
                rows={10}
                value={starterCode}
                onChange={(e) => setStarterCode(e.target.value)}
                className="w-full p-3 font-mono text-xs bg-slate-950 text-blue-300 border border-slate-800 rounded-xl"
              />
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Execution Timeout:</span>
                <span className="font-bold text-slate-900 dark:text-white">{timeoutLimit} seconds max</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title="Hidden Automated Unit Test Assertions"
              subtitle="Hidden test suite executed to calculate student grade"
              icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            />
            <CardContent className="space-y-3 text-xs">
              <textarea
                rows={10}
                value={unitTests}
                onChange={(e) => setUnitTests(e.target.value)}
                className="w-full p-3 font-mono text-xs bg-slate-950 text-amber-300 border border-slate-800 rounded-xl"
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Simulator Modal */}
      <Modal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        title="Student Interactive Simulator"
        subtitle="Simulate real-time student challenge experience"
        maxWidth="xl"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsSimulatorOpen(false)}>
              Close
            </Button>
            <Button variant="primary" size="sm" onClick={handleRunSimulation}>
              Submit Answer & Grade
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          {taskType === 'mcq' ? (
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                {mcqPrompt}
              </h4>
              <div className="space-y-2">
                {mcqOptions.map((opt, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      simSelectedOption === idx
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 font-semibold'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="simOpt"
                      checked={simSelectedOption === idx}
                      onChange={() => setSimSelectedOption(idx)}
                      className="text-blue-600"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-slate-500 mb-2">Simulated sandbox runner ready to execute unit assertions.</p>
              <pre className="p-3 bg-slate-950 text-emerald-400 font-mono text-xs rounded-xl">
                {starterCode}
              </pre>
            </div>
          )}

          {simOutput && (
            <div className="p-3.5 bg-slate-900 text-white rounded-xl font-mono text-xs border border-slate-800 animate-in fade-in">
              <pre className="whitespace-pre-wrap">{simOutput}</pre>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
