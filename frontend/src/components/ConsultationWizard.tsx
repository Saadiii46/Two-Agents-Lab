import React, { useState } from "react";
import { WizardQuestion } from "../types";
import { X, Sparkles, Check, ChevronRight, ChevronLeft, ShieldCheck, Heart, Award, ArrowRight, Star } from "lucide-react";

interface ConsultationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const wizardQuestions: WizardQuestion[] = [
  {
    id: "duty",
    text: "What superpower duty do you want your robot to handle?",
    options: [
      {
        label: "The Super Cleaner 🧹",
        description: "Clears your messy inbox, files receipts, and auto-checks long boring papers for details.",
        value: "inbox_cleaner",
        icon: "inbox"
      },
      {
        label: "The Secret Spy 👀",
        description: "Scrapes internet pages, tracks competitors, and tells you the coolest trends before anyone else.",
        value: "competitor_spy",
        icon: "search"
      },
      {
        label: "The Code Wizard 🧙‍♂️",
        description: "Scans code, fixes boring bugs, and deploys scalable web apps in a heartbeat.",
        value: "code_sorcerer",
        icon: "terminal"
      },
      {
        label: "The Mega Promoter 🚀",
        description: "Drafts fun tweets, edits graphic copies, and tells everyone how cool your startup is.",
        value: "marketing_champion",
        icon: "megaphone"
      }
    ]
  },
  {
    id: "speed",
    text: "How fast should your smart helper run inside the computer cables?",
    options: [
      {
        label: "Speedy Sonic Mode ⚡",
        description: "Performs steps in under 3 seconds using optimized neural pipelines. (Standard)",
        value: "sonic",
        icon: "zap"
      },
      {
        label: "Warp Space-Time Mode 🌀",
        description: "Ultra-parallel clusters run tasks immediately in background orbits. (Super Turbo)",
        value: "warp",
        icon: "wind"
      }
    ]
  }
];

export default function ConsultationWizard({ isOpen, onClose, isDarkMode }: ConsultationWizardProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [agentName, setAgentName] = useState<string>("");
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [isCompiled, setIsCompiled] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleOptionSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep === 0 && !agentName.trim()) {
      alert("Please name your friendly helper agent first!");
      return;
    }
    if (currentStep > 0) {
      const questionId = wizardQuestions[currentStep - 1].id;
      if (!answers[questionId]) {
        alert("Please pick an option to proceed!");
        return;
      }
    }

    if (currentStep < wizardQuestions.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Trigger compilation phase
      setIsCompiling(true);
      setTimeout(() => {
        setIsCompiling(false);
        setIsCompiled(true);
      }, 2000);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const selectedDuty = wizardQuestions[0].options.find(opt => opt.value === answers["duty"]);
  const selectedSpeed = wizardQuestions[1].options.find(opt => opt.value === answers["speed"]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md transition-colors ${
      isDarkMode ? "bg-black/95" : "bg-gray-900/40"
    }`}>
      
      {/* Container Card with solid Black/White backdrop and high contrast border */}
      <div 
        className={`relative w-full max-w-2xl border rounded-xl flex flex-col overflow-hidden max-h-[90vh] transition-all duration-300 ${
          isDarkMode ? "bg-[#030305] border-[#22222a] text-white" : "bg-white border-gray-300 text-gray-950 shadow-2xl"
        }`}
        id="wizard-container"
      >
        {/* Glow corner to resemble screenshot style */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className={`flex items-center justify-between px-6 py-5 border-b transition-colors ${
          isDarkMode ? "border-[#14141c]" : "border-gray-200"
        }`}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-500" />
            <h2 className={`font-display font-bold text-base md:text-lg transition-colors ${
              isDarkMode ? "text-white" : "text-gray-950"
            }`}>
              Two Agents Workshop: Agent Constructor
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-1 px-2.5 rounded-md transition-colors font-mono text-xs cursor-pointer border ${
              isDarkMode 
                ? "bg-[#14141c] hover:bg-rose-950/40 text-gray-400 hover:text-rose-400 border-transparent" 
                : "bg-gray-100 hover:bg-rose-100 text-gray-600 hover:text-rose-600 border-gray-350"
            }`}
            id="wizard-close-btn"
          >
            DISMISS ✕
          </button>
        </div>

        {/* Modal Body Scroll Area */}
        <div className="flex-1 p-6 overflow-y-auto no-scrollbar">
          
          {/* Progress Indication */}
          {!isCompiled && !isCompiling && (
            <div className="flex items-center gap-2 mb-6 select-none">
              {[0, 1, 2].map((s) => (
                <div key={s} className="flex-1 flex items-center gap-1">
                  <div className={`h-1.5 flex-1 rounded-full transition-all ${
                    currentStep >= s ? "bg-gradient-to-r from-violet-600 to-fuchsia-600" : isDarkMode ? "bg-[#14141d]" : "bg-gray-200"
                  }`} />
                  <span className={`text-[10px] font-mono ${
                    currentStep === s ? "text-violet-600 font-bold" : "text-gray-455"
                  }`}>
                    S{s + 1}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Compile Phase UI */}
          {isCompiling && (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-center font-sans">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-violet-500/20 border-t-violet-500 animate-spin" />
                <Sparkles className="w-6 h-6 text-fuchsia-500 animate-pulse" />
              </div>
              <div>
                <h3 className={`font-display font-bold text-xl transition-colors ${isDarkMode ? "text-white" : "text-gray-950"}`}>
                  Assembling {agentName}...
                </h3>
                <p className={`text-xs font-mono mt-2 animate-pulse ${isDarkMode ? "text-gray-400" : "text-gray-700 font-semibold"}`}>
                  &gt; Binding Reason Heuristics... [OK]<br />
                  &gt; Calibrating Warp Speed Drive... [OK]<br />
                  &gt; Securing Sandbox Env... [OK]
                </p>
              </div>
            </div>
          )}

          {/* Compiled Success Card UI */}
          {isCompiled && (
            <div className="flex flex-col gap-6 py-4 font-sans">
              <div className={`flex flex-col items-center justify-center text-center p-6 border rounded-lg relative overflow-hidden ${
                isDarkMode 
                  ? "bg-gradient-to-tr from-violet-950/20 via-black to-fuchsia-950/10 border-[#20202a]" 
                  : "bg-gradient-to-tr from-violet-50 via-white to-fuchsia-50 border-gray-250 shadow-sm"
              }`}>
                
                {/* Visual badge highlight */}
                <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 border border-emerald-500/35">
                  <Award className="w-7 h-7 text-emerald-500 animate-bounce" />
                </div>
                
                <h3 className={`font-display font-bold text-2xl transition-colors ${isDarkMode ? "text-white" : "text-gray-950"}`}>
                  Success! {agentName} is Live!
                </h3>
                <p className={`text-xs max-w-md mt-1.5 leading-relaxed font-sans ${isDarkMode ? "text-gray-400" : "text-gray-650 font-medium"}`}>
                  Your smart helper is successfully initialized on the cloud host. Even a 6-year-old could tell you that your digital helper is officially ready to roll!
                </p>

                {/* Cyber Card specs summary */}
                <div className={`w-full max-w-sm mt-6 p-4 border rounded-md text-left font-mono text-[11px] leading-relaxed relative ${
                  isDarkMode ? "bg-black border-[#22222a]" : "bg-gray-50 border-gray-300 shadow-sm text-gray-900 font-semibold"
                }`}>
                  <span className="absolute top-3 right-3 text-emerald-500 font-bold animate-ping">
                    ● DEPLOYED
                  </span>
                  
                  <div className={`font-bold text-center border-b pb-2 mb-3 ${
                    isDarkMode ? "text-violet-400 border-[#14141d]" : "text-violet-750 border-gray-350"
                  }`}>
                    🚀 SMART HELPER CERTIFICATE 🚀
                  </div>
                  
                  <p className="mb-1">
                    <span className="text-gray-500">AGENT CODE-NAME:</span>{" "}
                    <span className={isDarkMode ? "text-white font-bold" : "text-gray-950 font-bold"}>{agentName.toUpperCase()}</span>
                  </p>
                  <p className="mb-1">
                    <span className="text-gray-500">ASSIGNED POWER:</span>{" "}
                    <span className={isDarkMode ? "text-white font-bold" : "text-gray-950 font-bold"}>{selectedDuty?.label || "General Helper"}</span>
                  </p>
                  <p className="mb-1">
                    <span className="text-gray-500">SPEED SPECIFIER:</span>{" "}
                    <span className="text-emerald-500 font-bold">{selectedSpeed?.label || "Sonic"}</span>
                  </p>
                  <p className={`border-t pt-2 mt-2 text-[10px] leading-tight ${
                    isDarkMode ? "border-[#14141d] text-gray-400" : "border-gray-300 text-gray-600"
                  }`}>
                    This unit will automatically filter spam files, run deep plans, and make sure your team has premium fun levels!
                  </p>
                </div>
              </div>

              {/* Consultation closing CTA */}
              <div className="flex flex-col gap-3">
                <div className={`border rounded-md p-4 flex items-center justify-between flex-wrap gap-4 ${
                  isDarkMode ? "bg-[#0a0a0e] border-[#1a1a24]" : "bg-gray-50 border-gray-250 shadow-sm"
                }`}>
                  <div className="text-left">
                    <span className={`block font-bold text-xs uppercase tracking-widest font-mono ${
                      isDarkMode ? "text-violet-350" : "text-violet-750"
                    }`}>
                      Owner Consultation
                    </span>
                    <span className={`block text-sm font-display font-bold mt-0.5 ${isDarkMode ? "text-white" : "text-gray-950"}`}>
                      Ready to configure real execution codes?
                    </span>
                    <span className={`block text-xs mt-0.5 ${isDarkMode ? "text-gray-500" : "text-gray-650 font-medium"}`}>
                      Our real engineers build actual enterprise versions with active tools.
                    </span>
                  </div>
                  <a
                    href="mailto:muhammad.saadiii64@gmail.com?subject=I%20built%20an%20agent!"
                    className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-display text-xs font-bold rounded-lg transition-all shadow-md active:scale-95"
                  >
                    Send to Developer
                  </a>
                </div>
                
                <button
                  onClick={() => {
                    setIsCompiled(false);
                    setCurrentStep(0);
                    setAgentName("");
                    setAnswers({});
                  }}
                  className={`w-full text-center py-2 text-xs transition-colors uppercase tracking-widest font-mono cursor-pointer ${
                    isDarkMode ? "text-gray-500 hover:text-white" : "text-gray-500 hover:text-gray-950 font-bold"
                  }`}
                >
                  Create another agent helper!
                </button>
              </div>
            </div>
          )}

          {/* STEP 1: Introduce Name */}
          {!isCompiled && !isCompiling && currentStep === 0 && (
            <div className="flex flex-col gap-5 py-2 font-sans">
              <div className="text-left">
                <label className={`block text-xs uppercase tracking-widest font-mono font-bold mb-1 ${
                  isDarkMode ? "text-violet-400" : "text-violet-750"
                }`}>
                  Step 1 of 3: Name Your Robot
                </label>
                <h3 className={`font-display font-bold text-xl leading-tight transition-colors ${
                  isDarkMode ? "text-white" : "text-gray-950"
                }`}>
                  What is your sweet robot helper's main nickname?
                </h3>
                <p className={`text-xs mt-1 transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-600 font-medium"}`}>
                  Choose something cool! Like "ClickMonster", "SpeedyGonsales", "MegaCoder", or "HomeworkEater".
                </p>
              </div>

              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                autoFocus
                placeholder="Type name here (e.g. InboxSniper 3000)..."
                className={`w-full px-5 py-4 border-2 focus:border-violet-500 rounded-md font-display text-lg focus:outline-none transition-all ${
                  isDarkMode 
                    ? "bg-black border-[#1c1c24] text-white placeholder:text-gray-600" 
                    : "bg-white border-gray-300 text-gray-950 placeholder:text-gray-400"
                }`}
                id="agent-name-input"
              />

              {/* Kid mode supportive tip */}
              <div className={`p-3 border rounded-md flex items-center gap-2 ${
                isDarkMode ? "bg-violet-950/20 border-violet-900/35" : "bg-violet-50 border-violet-200"
              }`}>
                <span className="text-xl select-none">💡</span>
                <p className={`text-[11px] font-sans leading-relaxed ${isDarkMode ? "text-gray-300" : "text-violet-850 font-medium"}`}>
                  <strong>ADHD Tip:</strong> Giving your smart assistants a funny, heroic name increases task completion happiness by up to 200%! Try adding 'Master' or 'Bot' to the end.
                </p>
              </div>
            </div>
          )}

          {/* STEPS 2 & 3: Multiple choice questions */}
          {!isCompiled && !isCompiling && currentStep > 0 && (
            <div className="flex flex-col gap-5 py-2 font-sans">
              {(() => {
                const questionIdx = currentStep - 1;
                const question = wizardQuestions[questionIdx];
                const selectedValue = answers[question.id];

                return (
                  <>
                    <div className="text-left font-sans">
                      <span className={`block text-xs uppercase tracking-widest font-mono font-bold mb-1 ${
                        isDarkMode ? "text-[#a855f7]" : "text-violet-750"
                      }`}>
                        Step {currentStep + 1} of 3: Option Selection
                      </span>
                      <h3 className={`font-display font-bold text-lg md:text-xl leading-tight transition-colors ${
                        isDarkMode ? "text-white" : "text-gray-950"
                      }`}>
                        {question.text}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-3.5">
                      {question.options.map((opt) => {
                        const isOptSelected = selectedValue === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => handleOptionSelect(question.id, opt.value)}
                            className={`p-4 text-left border rounded-lg transition-all flex gap-3.5 items-start cursor-pointer relative ${
                              isOptSelected
                                ? isDarkMode
                                  ? "border-violet-500 bg-violet-950/25 shadow-lg shadow-violet-500/5 text-white"
                                  : "border-violet-600 bg-violet-100/40 text-gray-950 shadow-sm"
                                : isDarkMode
                                  ? "border-[#1c1c26] bg-black hover:border-violet-800/40 text-gray-300"
                                  : "border-gray-250 bg-gray-50 hover:bg-gray-100 hover:border-gray-400 text-gray-700"
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 flex-shrink-0 mt-0.5 ${
                              isOptSelected 
                                ? isDarkMode ? "border-violet-400 bg-violet-900 text-white" : "border-violet-600 bg-violet-200 text-violet-800" 
                                : isDarkMode ? "border-[#1c1c28] bg-neutral-900 text-gray-500" : "border-gray-300 bg-white text-gray-400"
                            }`}>
                              {isOptSelected ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <span className="font-mono text-xs font-bold font-sans">●</span>
                              )}
                            </div>
                            
                            <div className="flex-1 font-sans">
                              <span className={`block font-display font-bold text-sm ${
                                isDarkMode ? "text-white" : "text-gray-950"
                              }`}>
                                {opt.label}
                              </span>
                              <span className={`block text-xs leading-relaxed mt-1 ${
                                isDarkMode ? "text-gray-400" : "text-gray-600 font-medium"
                              }`}>
                                {opt.description}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                );
              })()}
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {!isCompiled && !isCompiling && (
          <div className={`flex items-center justify-between px-6 py-4 border-t transition-colors ${
            isDarkMode ? "bg-[#050508] border-[#14141c]" : "bg-gray-50 border-gray-200"
          }`}>
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`flex items-center gap-1.5 px-4 py-2 border font-display text-xs font-semibold rounded-md transition-all cursor-pointer ${
                currentStep === 0 
                  ? "opacity-30 cursor-not-allowed text-gray-500 border-transparent bg-transparent" 
                  : isDarkMode 
                    ? "bg-[#14141c] hover:bg-[#1a1a24] text-gray-300 hover:text-white border-transparent" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-950 border-gray-300 active:scale-95"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-display text-xs font-bold rounded-md transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>{currentStep === wizardQuestions.length ? "Assemble Helper 🚀" : "Next Step"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
