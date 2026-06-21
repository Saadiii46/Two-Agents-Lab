import { 
  Sparkles, 
  Workflow, 
  Clock, 
  CheckCircle2, 
  Code,
  ArrowRight,
  Cpu
} from "lucide-react";

interface CurrentlyBuildingProps {
  isDarkMode: boolean;
  onStartWizard: () => void;
}

export default function CurrentlyBuilding({ isDarkMode, onStartWizard }: CurrentlyBuildingProps) {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto font-sans relative">
      {/* Visual Section Dividers */}
      <div className={`w-20 h-[2px] mb-12 ${isDarkMode ? "bg-violet-500/30" : "bg-violet-200"}`} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Overarching Story & Impact */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          <div className="inline-flex items-center gap-2 select-none">
            <span className="flex h-2 w-2 rounded-full bg-violet-500 animate-[pulse_2.5s_infinite]" />
            <span className={`font-mono text-[10px] uppercase font-bold tracking-[0.2em] ${
              isDarkMode ? "text-violet-400" : "text-violet-700"
            }`}>
              Currently actively building
            </span>
          </div>

          <h2 className={`font-display font-bold text-3xl md:text-5xl tracking-tight leading-tight transition-colors ${
            isDarkMode ? "text-white" : "text-gray-950"
          }`}>
            Project OmniSync V2:
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 font-extrabold">
              Autonomous Inbox Sentinel
            </span>
          </h2>

          <p className={`text-sm md:text-base leading-relaxed max-w-xl transition-colors ${
            isDarkMode ? "text-gray-400" : "text-gray-650"
          }`}>
            We are engineering a clean, low-latency background assistant designed to solve operational notification fatigue. OmniSync seamlessly monitors inbox streams, discards useless newsletters, files attachments, and lists clear action blueprints. 
          </p>

          <p className={`text-xs leading-relaxed max-w-lg transition-colors ${
            isDarkMode ? "text-gray-500" : "text-gray-550 font-medium"
          }`}>
            Rather than introducing another browser tab, OmniSync is built as a pure daemon helper, working in the shadow of your existing digital workspace.
          </p>

          <div className="pt-6">
            <button 
              onClick={onStartWizard}
              className="px-6 py-3 hover:opacity-90 transition-all font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded text-xs select-none active:scale-95 cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <span>Initialize a Custom Agent Specs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Right Side: A Premium Minimalist Visual Roadmap */}
        <div className="lg:col-span-6 space-y-8">
          
          <div className="space-y-6">
            
            {/* Step 1: Ingestion */}
            <div className={`p-5 rounded-xl border transition-all flex items-start gap-4 ${
              isDarkMode ? "bg-black/40 border-[#141418]" : "bg-white border-gray-200 shadow-sm"
            }`}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-[9px] uppercase font-bold tracking-wider ${isDarkMode ? "text-gray-500" : "text-gray-450"}`}>
                    Phase 1 of 3
                  </span>
                  <span className={`text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-1.5 py-0.5 rounded-full font-bold`}>
                    Completed
                  </span>
                </div>
                <h4 className={`font-display font-bold text-sm mt-1 transition-colors ${isDarkMode ? "text-white" : "text-gray-950"}`}>
                  Smart Sieve Inlet
                </h4>
                <p className={`text-xs mt-1.5 leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-650"}`}>
                  Monitors incoming Slack, webhook, and email streams. Successfully filters spam with 99.98% certainty.
                </p>
              </div>
            </div>

            {/* Step 2: Cognition */}
            <div className={`p-5 rounded-xl border transition-all flex items-start gap-4 ${
              isDarkMode ? "bg-black/60 border-violet-900/30 shadow-[0_0_20px_rgba(139,92,246,0.1)]" : "bg-violet-50/20 border-violet-200/80 shadow-sm"
            }`}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-violet-500/10 text-violet-500 border border-violet-500/20 animate-[pulse_2s_infinite]">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-[9px] uppercase font-bold tracking-wider ${isDarkMode ? "text-violet-400" : "text-violet-700"}`}>
                    Phase 2 of 3
                  </span>
                  <span className={`text-[9px] font-mono uppercase bg-violet-500/10 text-violet-500 border border-violet-500/20 px-1.5 py-0.5 rounded-full font-extrabold animate-pulse`}>
                    ACTIVE SPRINT
                  </span>
                </div>
                <h4 className={`font-display font-bold text-sm mt-1 transition-colors ${isDarkMode ? "text-white" : "text-gray-950"}`}>
                  Cognitive Evaluator
                </h4>
                <p className={`text-xs mt-1.5 leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-650"}`}>
                  The core AI intelligence layer. Interprets unstructured text, tags tasks and deadlines in real-time, and pre-drafts contextual solutions at a speed of 1.2s.
                </p>
              </div>
            </div>

            {/* Step 3: Action */}
            <div className={`p-5 rounded-xl border transition-all flex items-start gap-4 opacity-75 ${
              isDarkMode ? "bg-black/20 border-[#141418]" : "bg-white border-gray-150"
            }`}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-gray-500/10 text-gray-450 border border-gray-500/20">
                <Clock className="w-5 h-5 animate-[spin_12s_linear_infinite]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-[9px] uppercase font-bold tracking-wider ${isDarkMode ? "text-gray-600" : "text-gray-500"}`}>
                    Phase 3 of 3
                  </span>
                  <span className="text-[9px] font-mono uppercase bg-gray-500/10 text-gray-500 border border-gray-500/20 px-1.5 py-0.5 rounded-full font-bold">
                    Up Next
                  </span>
                </div>
                <h4 className={`font-display font-bold text-sm mt-1 transition-colors ${isDarkMode ? "text-white" : "text-gray-950"}`}>
                  Workspace Router
                </h4>
                <p className={`text-xs mt-1.5 leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-650"}`}>
                  Farms structured updates to native systems, maintaining perfect sync with sheets, calendar events, and drive directories.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
