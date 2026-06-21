import { useState, useEffect } from "react";
import Header from "./components/Header";
import AgentOrb, { agentNodes } from "./components/AgentOrb";
import CurrentlyBuilding from "./components/CurrentlyBuilding";
import ServiceCards from "./components/ServiceCards";
import SkillSection from "./components/SkillSection";
import PortfolioGrid from "./components/PortfolioGrid";
import AboutAndContact from "./components/AboutAndContact";
import ConsultationWizard from "./components/ConsultationWizard";
import AgentChatbot from "./components/AgentChatbot";
import { AgentNode } from "./types";
import { ArrowRight, RefreshCw } from "lucide-react";
import { funFacts } from "./constants";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [selectedNode, setSelectedNode] = useState<AgentNode | null>(agentNodes[0]);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [wizardOpen, setWizardOpen] = useState<boolean>(false);
  const [funFact, setFunFact] = useState<string>("Smart helpers can click buttons 60x faster than humans!");

  const handleToggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const rollFunFact = () => {
    const randomIdx = Math.floor(Math.random() * funFacts.length);
    setFunFact(funFacts[randomIdx]);
  };

  // Scroll section helper
  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const docElement = document.getElementById(sectionId);
    if (docElement) {
      docElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Simple scroll tracker to highlight navbar active state
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = ["work", "services", "skills", "process", "about", "contact"];
      
      if (scrollY < 300) {
        setActiveSection("hero");
        return;
      }

      for (const sect of sections) {
        const el = document.getElementById(sect);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= 400) {
            setActiveSection(sect);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`transition-all duration-500 min-h-screen relative selection:bg-violet-900 selection:text-white ${
      isDarkMode ? "bg-[#000000] text-gray-200" : "bg-[#fafafa] text-gray-800"
    }`}>

      {/* Top Level Navigation Menu */}
      <Header
        onStartWizard={() => setWizardOpen(true)}
        onNavigateSection={handleNavigateSection}
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* Primary Hero Section Grid (Two Columns as in Screenshot) */}
      <main className="pt-24 md:pt-32 pb-16 flex flex-col gap-10">
        
        <section id="hero" className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-140px)]">
          
          {/* LEFT COLUMN: Agency Pitch Content */}
          <div className="lg:col-span-6 flex flex-col gap-6 md:gap-8 items-start justify-center text-left">
            
            {/* Tiny Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full select-none border transition-all duration-350 ${
              isDarkMode ? "bg-[#0a0a0f] border-[#1b1b26]" : "bg-violet-50/50 border-violet-100"
            }`} id="hero-badge">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-[pulse_2s_infinite]" />
              <span className={`font-mono text-[10px] uppercase font-bold tracking-widest ${
                isDarkMode ? "text-violet-400" : "text-violet-850"
              }`}>
                AGENTIC AI. SOFTWARE. IMPACT.
              </span>
            </div>

            {/* Creative positioning Heading: We build intelligent agents & software that work for you. */}
            <div className="space-y-4">
              <h1 className={`font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] transition-colors ${
                isDarkMode ? "text-white" : "text-gray-950"
              }`} id="hero-title">
                We build{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-500 font-extrabold">
                  intelligent agents & software
                </span>{" "}
                that work for you.
              </h1>
            </div>

            {/* ADHD Friendly Copy - Simple and clear for a 6 year old */}
            <p className={`font-sans text-sm md:text-base lg:text-lg leading-relaxed max-w-xl transition-colors ${
              isDarkMode ? "text-gray-400" : "text-gray-650 font-medium"
            }`} id="hero-subtitle">
              Two Agents Lab makes smart digital robot helpers. They stay inside your computers to archive boring emails, file spreadsheets, and code apps so you can focus on fun ideas! Simple structure, zero tech-headaches.
            </p>

            {/* ADHD micro interactable Fun-Fact widget */}
            <div className={`p-3 border rounded-md flex items-center justify-between w-full max-w-md gap-4 select-none group transition-all duration-350 ${
              isDarkMode ? "bg-[#050508] border-[#151520]" : "bg-violet-50/55 border-violet-150 shadow-sm"
            }`} id="fun-fact-container">
              <div className="flex items-center gap-3">
                <div>
                  <span className={`block text-[9px] font-mono uppercase tracking-wider font-bold transition-colors ${
                    isDarkMode ? "text-[#6d7589]" : "text-violet-750"
                  }`}>
                    Fun Facts
                  </span>
                  <p className={`text-xs font-medium leading-relaxed mt-0.5 transition-colors ${
                    isDarkMode ? "text-[#d4d4d8]" : "text-gray-900"
                  }`}>
                    {funFact}
                  </p>
                </div>
              </div>
              <button
                onClick={rollFunFact}
                className={`p-1.5 rounded-md transition-colors cursor-pointer shrink-0 border ${
                  isDarkMode 
                    ? "bg-[#14141c] hover:bg-violet-950/40 text-gray-400 hover:text-violet-400 border-transparent" 
                    : "bg-white hover:bg-violet-100/50 text-gray-600 hover:text-violet-755 border-gray-250 shadow-xs"
                }`}
                title="Roll New Fact"
              >
                <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>

            {/* Hero CTA Button controls */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2" id="hero-ctas">
              <button
                onClick={() => setWizardOpen(true)}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-display font-semibold text-sm rounded-lg shadow-[0_0_30px_rgba(139,92,246,0.25)] hover:shadow-[0_0_40px_rgba(168,85,247,0.45)] transition-all duration-300 transform active:scale-95 cursor-pointer"
                id="hero-start-btn"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleNavigateSection("work")}
                className={`flex items-center justify-center px-8 py-4 border font-display font-semibold text-sm rounded-lg transition-all duration-300 transform active:scale-95 cursor-pointer ${
                  isDarkMode 
                    ? "bg-black border-[#2b2b3a] text-gray-300 hover:text-white" 
                    : "bg-white border-gray-300 text-gray-700 hover:text-gray-950 shadow-sm"
                }`}
                id="hero-see-work-btn"
              >
                See Our Work
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Agent Orb Satellite visualization */}
          <div className="lg:col-span-6 flex items-center justify-center relative mt-6 lg:mt-0">
            <AgentOrb
              selectedNode={selectedNode}
              onSelectNode={(node) => setSelectedNode(node)}
              isDarkMode={isDarkMode}
            />
          </div>

        </section>

        {/* Process Section with ADHD Toggles */}
        <section id="process" className="scroll-mt-20">
          <CurrentlyBuilding
            isDarkMode={isDarkMode}
            onStartWizard={() => setWizardOpen(true)}
          />
        </section>

        {/* Modular Service capabilities */}
        <ServiceCards isDarkMode={isDarkMode} />

        {/* Technical Architecture Skills */}
        <SkillSection isDarkMode={isDarkMode} />

        {/* High statistics Past Work Projects */}
        <PortfolioGrid isDarkMode={isDarkMode} />

        {/* About values segment & Creative Contact Form */}
        <AboutAndContact isDarkMode={isDarkMode} />

      </main>

      {/* Simple, Non-Fluffy Footer */}
      <footer className={`border-t py-12 px-6 transition-all duration-350 ${
        isDarkMode ? "border-[#111115] bg-[#000000]" : "border-gray-200 bg-white"
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-2 select-none">
            <div className={`w-8 h-8 rounded-md flex items-center justify-center font-display font-bold text-xs border ${
              isDarkMode ? "bg-[#0e0e15] border-[#1f1f2a] text-violet-400" : "bg-violet-50 border-violet-200 text-violet-700"
            }`}>
              TA
            </div>
            <div>
              <span className={`block font-display font-bold text-sm tracking-widest text-left transition-colors ${
                isDarkMode ? "text-white" : "text-gray-950"
              }`}>
                TWO AGENTS LAB
              </span>
              <span className={`block text-[8px] font-mono uppercase tracking-widest text-left ${
                isDarkMode ? "text-gray-650" : "text-gray-500 font-bold"
              }`}>
                {isDarkMode ? "Strictly Dark Background • No Fluff" : "Minimalist Light Background • Pure Contrast"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
            <span>© 2026 Two Agents Lab Inc.</span>
            <span>•</span>
            <a href="mailto:muhammad.saadiii64@gmail.com" className="hover:text-violet-500 transition-colors">
              Contact Developer
            </a>
          </div>

        </div>
      </footer>

      {/* Custom Agent Workshop Construction Modal */}
      <ConsultationWizard
        isOpen={wizardOpen}
        onClose={() => setWizardOpen(false)}
        isDarkMode={isDarkMode}
      />

      {/** Chatbot floating icon */}
      <AgentChatbot isDarkMode={isDarkMode}/>

    </div>
  );
}
