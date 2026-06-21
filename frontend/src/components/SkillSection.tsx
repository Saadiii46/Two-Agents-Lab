import { 
  BrainCircuit, 
  Workflow, 
  Layers
} from "lucide-react";

interface SkillSectionProps {
  isDarkMode: boolean;
}

const skills = [
  {
    id: "cognitive",
    name: "Cognitive AI Systems",
    description: "Designing structured, reliable reasoning loops with modern language models. We focus on strict schema guarantees and cost-efficient prompt boundaries.",
    icon: BrainCircuit,
    stack: ["Gemini 2.5 Flash SDK", "Structured JSON", "System Instructions"]
  },
  {
    id: "integration",
    name: "Workflow Orchestration",
    description: "Building resilient background processes that bridge enterprise communications and live workspaces securely.",
    icon: Workflow,
    stack: ["Node.js TypeScript", "Event Webhooks", "API Integration"]
  },
  {
    id: "product",
    name: "Minimalist Interface Design",
    description: "Crafting lightweight, single-screen dashboards with balanced visual hierarchy and responsive touch feedback.",
    icon: Layers,
    stack: ["React 18", "Vite", "Tailwind CSS"]
  }
];

export default function SkillSection({ isDarkMode }: SkillSectionProps) {
  return (
    <section 
      id="skills" 
      className={`py-24 px-6 max-w-7xl mx-auto scroll-mt-20 border-t ${
        isDarkMode ? "border-[#14141c]" : "border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="text-left max-w-3xl mb-16 select-none">
        <span className={`font-mono text-xs uppercase px-2.5 py-1 rounded inline-block mb-3 border ${
          isDarkMode 
            ? "bg-[#14141d] border-[#1f1f2a] text-violet-300" 
            : "bg-violet-50 border-violet-200 text-violet-700 font-semibold"
        }`}>
          Architectural Talents
        </span>
        <h2 className={`font-display font-bold text-3xl md:text-5xl tracking-tight leading-tight transition-colors ${
          isDarkMode ? "text-white" : "text-gray-950"
        }`}>
          Our Technical Weaponry & Skills
        </h2>
        <p className={`text-sm md:text-base mt-4 leading-relaxed transition-colors ${
          isDarkMode ? "text-gray-400" : "text-gray-650"
        }`}>
          Behind every automated helper is a stack of strict technical principles. Here is the operational design structure we use to build reliable software.
        </p>
      </div>

      {/* Grid of clean static cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <div
              key={skill.id}
              className={`p-6 md:p-8 rounded-xl border text-left transition-all duration-300 ${
                isDarkMode 
                  ? "bg-[#040406] border-[#141418] hover:border-[#1d1d26] text-white" 
                  : "bg-white border-gray-200 hover:border-gray-300 text-gray-950 shadow-sm"
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 text-violet-500 flex items-center justify-center border border-violet-500/20 mb-6">
                <Icon className="w-5 h-5" />
              </div>

              <h3 className={`font-display font-bold text-lg transition-colors ${
                isDarkMode ? "text-white" : "text-gray-950"
              }`}>
                {skill.name}
              </h3>

              <p className={`text-xs md:text-sm mt-3 leading-relaxed transition-colors ${
                isDarkMode ? "text-gray-400" : "text-gray-650"
              }`}>
                {skill.description}
              </p>

              <div className="mt-6 pt-6 border-t border-dashed border-gray-700/25">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-2.5">
                  Core Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {skill.stack.map((item, idx) => (
                    <span 
                      key={idx} 
                      className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                        isDarkMode 
                          ? "bg-[#0e0e14] border-[#1c1c25] text-violet-300" 
                          : "bg-violet-50/50 border-violet-100 text-violet-700"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
