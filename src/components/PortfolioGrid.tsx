import React, { useState } from "react";
import { Zap, Heart, Trophy, FileText, ArrowUpRight, Award, ExternalLink } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  statHeading: string;
  statValue: string;
  kidAchievement: string;
  techSpecs: string;
}

interface PortfolioGridProps {
  isDarkMode: boolean;
}

const portfolioCases: PortfolioItem[] = [
  {
    id: "case-1",
    title: "The E-mail Vacuum Cleaner",
    category: "Autonomous Inbox Intelligence",
    statHeading: "Boring Mail Zapped",
    statValue: "142,500+ Spams",
    kidAchievement: "Automatically sorted a massive computer tower of mail! Keeps the cool cards from Grandma and deletes silly advertisements in under a second.",
    techSpecs: "NLP semantic filters paired with dynamic classifier queues."
  },
  {
    id: "case-2",
    title: "The Lightning App Coder",
    category: "Full-Stack Development Bot",
    statHeading: "Code Delivery Speed",
    statValue: "48 Hours Flat",
    kidAchievement: "Built an online game shop without humans typing! The robot planned, designed, tested, and published everything perfectly.",
    techSpecs: "AST code generators connected to automatic syntax verification suites."
  },
  {
    id: "case-3",
    title: "The Infinite Bedtime Storyteller",
    category: "Creative Copywriter Agent",
    statHeading: "Daily Story Generation",
    statValue: "500 Fairy Tales",
    kidAchievement: "Wrote hundreds of magical stories about dragons, frogs, and spaceships for kids who couldn't sleep. Everyone in school was very happy!",
    techSpecs: "Instructed LLM fine-tunes optimized with human-in-the-loop editing rules."
  }
];

export default function PortfolioGrid({ isDarkMode }: PortfolioGridProps) {
  const [selectedCase, setSelectedCase] = useState<PortfolioItem | null>(null);

  return (
    <section id="work" className={`py-20 px-6 max-w-7xl mx-auto scroll-mt-20 border-t ${
      isDarkMode ? "border-[#14141c]" : "border-gray-200"
    }`}>

      {/* Grid Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="max-w-2xl select-none font-sans">
          <span className={`font-mono text-xs uppercase px-3 py-1 rounded-md tracking-widest inline-block mb-3 border ${
            isDarkMode 
              ? "bg-[#14141d] border-[#1f1f2a] text-fuchsia-400" 
              : "bg-fuchsia-50 border-fuchsia-200 text-fuchsia-800 font-bold"
          }`}>
            AGENCY PORTFOLIO
          </span>
          <h2 className={`font-display font-bold text-3xl md:text-5xl tracking-tight leading-tight transition-colors ${
            isDarkMode ? "text-white" : "text-gray-950"
          }`}>
            Cool things we created!
          </h2>
          <p className={`text-sm md:text-base mt-4 leading-relaxed transition-colors ${
            isDarkMode ? "text-gray-400" : "text-gray-650 font-medium"
          }`}>
            Our robots stay busy! Take a look at the actual smart software tools currently keeping corporate databases safe and startup platforms running.
          </p>
        </div>

        <div className="flex gap-4">
          <div className={`px-5 py-2.5 border text-xs font-mono font-bold rounded-md transition-colors ${
            isDarkMode ? "bg-[#040406] border-[#14141c] text-violet-400" : "bg-gray-100 border-gray-300 text-violet-750"
          }`}>
            TOTAL ACTIVE BOTS: 12
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {portfolioCases.map((cs) => {
          const isSelected = selectedCase?.id === cs.id;
          return (
            <div
              key={cs.id}
              onClick={() => setSelectedCase(isSelected ? null : cs)}
              className={`group border p-6 rounded-lg transition-all duration-300 cursor-pointer flex flex-col justify-between h-[340px] relative overflow-hidden ${
                isSelected 
                  ? isDarkMode 
                    ? "border-violet-500 bg-violet-950/5 shadow-lg shadow-violet-500/10" 
                    : "border-violet-600 bg-violet-50 shadow-md font-semibold text-gray-950"
                  : isDarkMode 
                    ? "bg-[#040406] border-[#14141c] hover:border-violet-850" 
                    : "bg-white border-gray-250 hover:border-violet-600 hover:shadow-lg text-gray-900 shadow-md"
              }`}
              id={`portfolio-card-${cs.id}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-[10px] font-mono tracking-widest uppercase border px-2.5 py-1 rounded-md font-bold transition-colors ${
                    isDarkMode 
                      ? "bg-[#0d0d12] border-[#191924] text-[#a1a1aa]" 
                      : "bg-gray-100 border-gray-350 text-gray-700"
                  }`}>
                    {cs.category}
                  </span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                    isDarkMode ? "bg-black border-[#14141c] group-hover:bg-violet-950" : "bg-gray-100 border-gray-300 group-hover:bg-violet-100"
                  }`}>
                    <ArrowUpRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      isDarkMode ? "text-violet-400" : "text-violet-700"
                    }`} />
                  </div>
                </div>

                <h3 className={`font-display font-bold text-lg md:text-xl transition-colors mb-4 ${
                  isDarkMode ? "text-white group-hover:text-violet-300" : "text-[#111827] group-hover:text-violet-800"
                }`}>
                  {cs.title}
                </h3>

                <p className={`text-xs leading-relaxed font-sans line-clamp-3 transition-colors ${
                  isDarkMode ? "text-gray-400" : "text-gray-650 font-medium"
                }`}>
                  {cs.kidAchievement}
                </p>
              </div>

              {/* Big metric Highlight */}
              <div className={`border-t pt-4 mt-6 flex items-center justify-between ${
                isDarkMode ? "border-[#121218]" : "border-gray-200"
              }`}>
                <div>
                  <span className={`block text-[9px] font-mono uppercase tracking-wider mb-0.5 ${
                    isDarkMode ? "text-[#e4e4e7]" : "text-gray-500 font-bold"
                  }`}>
                    {cs.statHeading}
                  </span>
                  <span className="block text-xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
                    {cs.statValue}
                  </span>
                </div>
                
                <span className={`text-[10px] font-mono font-bold ${
                  isDarkMode ? "text-violet-500 group-hover:text-fuchsia-400" : "text-violet-750 group-hover:text-fuchsia-600"
                }`}>
                  {isSelected ? "TAP TO EXPAND ✕" : "SEE DETAILS →"}
                </span>
              </div>

              {/* Extended details display */}
              {isSelected && (
                <div className={`absolute inset-0 border-t-2 border-violet-500 p-6 flex flex-col justify-between z-10 transition-all ${
                  isDarkMode ? "bg-black/98" : "bg-white"
                }`}>
                  <div>
                    <span className="font-mono text-[9px] text-[#6d7589] block uppercase tracking-wider mb-1">
                      UNDER THE HOOD (BORING GROWN-UP SPECIFICATION)
                    </span>
                    <p className={`font-mono text-xs p-3 rounded leading-relaxed mb-4 border ${
                      isDarkMode 
                        ? "text-violet-200 bg-[#07070a] border-[#14141c]" 
                        : "text-violet-850 bg-gray-50 border-gray-300 font-bold"
                    }`}>
                      {cs.techSpecs}
                    </p>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {cs.kidAchievement}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCase(null);
                    }}
                    className={`w-full text-center py-2 text-xs font-mono rounded border transition-colors cursor-pointer ${
                      isDarkMode 
                        ? "bg-[#101015]/60 hover:bg-[#1a1a24] text-gray-400 hover:text-white border-[#1a1a24]" 
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 hover:text-gray-900"
                    }`}
                  >
                    CLOSE DETAILS
                  </button>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </section>
  );
}
