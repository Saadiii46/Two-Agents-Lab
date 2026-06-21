import React, { useState } from "react";
import { AgentNode } from "../types";
import { Brain, Compass, Zap, RotateCcw, Award, Sparkles, CheckCircle, ArrowRight } from "lucide-react";

interface AgentOrbProps {
  onSelectNode: (node: AgentNode) => void;
  selectedNode: AgentNode | null;
  isDarkMode: boolean;
}

export const agentNodes: AgentNode[] = [
  {
    id: "reason",
    label: "REASON",
    shortExplanation: "I think real smart like humans!",
    longExplanation: "I stop and think: 'Does this make complete sense?' so our software never does silly things or makes mistakes.",
    exampleAction: "Checks the instructions three times before starting a task.",
    colorClass: "from-pink-500 to-rose-500 shadow-pink-500/20",
  },
  {
    id: "plan",
    label: "PLAN",
    shortExplanation: "I draw the super secret roadmap!",
    longExplanation: "Like making a perfect drawing of a Lego castle first, I map out every single step so we never get lost.",
    exampleAction: "Spits out a beautifully organized 5-step checklist in a blink.",
    colorClass: "from-blue-500 to-indigo-500 shadow-indigo-500/20",
  },
  {
    id: "execute",
    label: "EXECUTE",
    shortExplanation: "Zoom! I do the work super fast!",
    longExplanation: "I am the muscle! I click the real keyboard keys, build pages, and send emails inside the fast computer lanes.",
    exampleAction: "Fires up code repositories and deploys them to production.",
    colorClass: "from-amber-400 to-orange-500 shadow-orange-500/15",
  },
  {
    id: "adapt",
    label: "ADAPT",
    shortExplanation: "Oops solver! I fix errors!",
    longExplanation: "If a computer fence blocks me, I don't give up! I jump over it, crouch under it, or take a cool detour to finish.",
    exampleAction: "Detects a broken server link and instantly switches to a backup helper.",
    colorClass: "from-emerald-500 to-teal-500 shadow-emerald-500/20",
  },
  {
    id: "learn",
    label: "LEARN",
    shortExplanation: "I store secrets in my giant brain!",
    longExplanation: "I write down all lessons. Every success and every error is stored in memory so we get faster every day.",
    exampleAction: "Tells other agents: 'Hey, don't press that button again, let's use this better one instead!'",
    colorClass: "from-violet-500 to-fuchsia-500 shadow-violet-500/20",
  },
];

export default function AgentOrb({ onSelectNode, selectedNode, isDarkMode }: AgentOrbProps) {
  const [hoveredNode, setHoveredNode] = useState<AgentNode | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case "Brain": return <Brain className="w-5 h-5" />;
      case "Compass": return <Compass className="w-5 h-5" />;
      case "Zap": return <Zap className="w-5 h-5" />;
      case "RotateCcw": return <RotateCcw className="w-5 h-5" />;
      case "Award": return <Award className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="relative w-full aspect-square max-w-[580px] mx-auto flex items-center justify-center p-4">
      
      {/* Central Ambient Sphere glow matching the purple aura in screenshot */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full blur-2xl sphere-glow opacity-80 ${
          isDarkMode
            ? "bg-gradient-to-tr from-violet-900/35 via-[#000000] to-fuchsia-850/30"
            : "bg-gradient-to-tr from-violet-200/50 via-white to-fuchsia-200/50"
        }`} />
      </div>

      {/* Interactive Orbital Paths (SVG overlays - subtle glow outline, NO background background elements) */}
      <svg className="absolute w-full h-full inset-0 pointer-events-none" viewBox="0 0 500 500">
        {/* Outer dotted orbital ellipse */}
        <ellipse
          cx="250"
          cy="250"
          rx="210"
          ry="150"
          fill="none"
          stroke={isDarkMode ? "url(#purpleGradient)" : "url(#purpleGradientLight)"}
          strokeWidth="1.5"
          strokeDasharray="4,8"
          className="opacity-40 origin-center rotate-[15deg] transition-all duration-1000"
        />
        {/* Inner dotted orbital ellipse */}
        <ellipse
          cx="250"
          cy="250"
          rx="150"
          ry="100"
          fill="none"
          stroke={isDarkMode ? "url(#violetGradient)" : "url(#violetGradientLight)"}
          strokeWidth="1.2"
          strokeDasharray="2,5"
          className="opacity-25 origin-center -rotate-[25deg]"
        />
        
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="purpleGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6d28d9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#db2777" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="violetGradient" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="violetGradientLight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Central Sphere Graphic Element in absolute center: "AGENTIC AI" */}
      <div 
        className="relative group w-44 h-44 md:w-56 md:h-56 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-500 z-10"
        onClick={() => onSelectNode(agentNodes[0])} // default to reason or first
        id="central-orb-node"
      >
        {/* Core orb glass background */}
        <div className={`absolute inset-0 rounded-full border-2 transition-all duration-500 flex items-center justify-center overflow-hidden ${
          isDarkMode
            ? "bg-slate-950/40 border-violet-500/40 group-hover:border-fuchsia-400 group-hover:scale-105 shadow-[inset_0_0_30px_rgba(139,92,246,0.35)]"
            : "bg-white/80 border-violet-400/60 group-hover:border-violet-600 group-hover:scale-105 shadow-[inset_0_0_20px_rgba(139,92,246,0.15)] shadow-md"
        }`}>
          {/* Internal rotating mesh rings */}
          <div className="absolute w-full h-[60%] border-t border-b border-fuchsia-500/20 rounded-full animate-[spin_8s_linear_infinite]" />
          <div className="absolute h-full w-[60%] border-l border-r border-violet-500/20 rounded-full animate-[spin_12s_linear_infinite_reverse]" />
          {/* Inner pulse */}
          <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-violet-600/10 via-transparent to-fuchsia-500/10 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Text centered perfectly */}
        <div className="text-center px-4 relative z-20 pointer-events-none select-none">
          <span className={`block font-mono text-[9px] uppercase tracking-[0.2em] font-bold mb-1 ${
            isDarkMode ? "text-violet-400" : "text-violet-700"
          }`}>
            CORE ENGINE
          </span>
          <span className={`block font-display font-bold text-lg md:text-xl tracking-wide transition-colors ${
            isDarkMode ? "text-white group-hover:text-fuchsia-300" : "text-gray-900 group-hover:text-violet-700"
          }`}>
            AGENTIC
          </span>
          <span className="block font-display font-black text-2xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-550 group-hover:from-fuchsia-600 group-hover:to-violet-600 transition-all duration-500">
            AI
          </span>
        </div>
      </div>

      {/* Satellite Floating Nodes as mapped in screenshot */}
      {[
        { node: agentNodes[0], pos: "top-[15%] left-[10%] sm:top-[12%] sm:left-[15%]" }, // REASON
        { node: agentNodes[1], pos: "top-[20%] right-[3%] sm:top-[18%] sm:right-[10%]" }, // PLAN
        { node: agentNodes[2], pos: "top-[50%] right-[1%] sm:top-[48%] sm:right-[4%]" }, // EXECUTE
        { node: agentNodes[3], pos: "bottom-[16%] right-[11%] sm:bottom-[15%] sm:right-[15%]" }, // ADAPT
        { node: agentNodes[4], pos: "bottom-[22%] left-[8%] sm:bottom-[20%] sm:left-[12%]" }, // LEARN
      ].map(({ node, pos }) => {
        const isSelected = selectedNode?.id === node.id;
        const isHovered = hoveredNode?.id === node.id;

        return (
          <div
            key={node.id}
            className={`absolute ${pos} z-20`}
            id={`node-${node.id}`}
          >
            <button
              onClick={() => onSelectNode(node)}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              className={`relative flex items-center gap-2.5 px-3.5 py-1.5 sm:px-5 sm:py-2.5 border transition-all duration-300 group rounded-md cursor-pointer ${
                isDarkMode 
                  ? "bg-[#07070a]/90 hover:bg-[#0c0c12] border-[#1c1c24] text-gray-300 hover:text-white"
                  : "bg-[#ffffff]/95 hover:bg-[#f8f9fa] border-gray-200 text-gray-700 hover:text-gray-900 shadow-md"
              } ${
                isSelected
                  ? isDarkMode 
                    ? "border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)] scale-105 text-white"
                    : "border-violet-600 shadow-[0_0_15px_rgba(139,92,246,0.15)] scale-105 text-gray-950 font-semibold"
                  : ""
              }`}
            >
              {/* Highlight bar on the left */}
              <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-md bg-gradient-to-b ${node.colorClass} opacity-80`} />

              {/* Icon prefix with floating wiggle */}
              <div className={`transition-transform duration-300 ${isHovered || isSelected ? "scale-120 rotate-12" : ""}`}>
                
              </div>

              {/* Name and Sparkle indicator */}
              <div className="flex flex-col items-start select-none">
                <span className={`font-display font-medium text-xs sm:text-[13px] tracking-widest ${
                  isDarkMode ? "text-[#f3f4f6]" : "text-gray-900"
                }`}>
                  {node.label}
                </span>
                <span className={`text-[9.5px] font-mono font-medium transition-colors ${
                  isDarkMode ? "text-gray-500 group-hover:text-violet-400/90" : "text-gray-550 group-hover:text-violet-600"
                }`}>
                   ACTIVE
                </span>
              </div>
            </button>
          </div>
        );
      })}

      {/* Inline interactive description of hovered node, showing ADHD explanations on-the-fly */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none md:hidden text-center z-30">
        <div className={`inline-block px-4 py-2 border rounded-md backdrop-blur-md shadow-lg ${
          isDarkMode ? "bg-black/95 border-[#1c1c24]" : "bg-white/95 border-gray-200 text-gray-800"
        }`}>
          <p className="text-xs font-semibold text-violet-500">
            {hoveredNode 
              ? `${hoveredNode.label}: ${hoveredNode.shortExplanation}` 
              : selectedNode 
                ? `${selectedNode.label}: ${selectedNode.shortExplanation}`
                : "👉 Tap on any helper node above to see their superpower!"}
          </p>
        </div>
      </div>
    </div>
  );
}
