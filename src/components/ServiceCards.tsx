import {ComponentType} from "react";
import { Globe, Bot, Link, GitMerge, FileCode, CheckCircle2, ChevronRight, Zap, LucideProps } from "lucide-react";

interface ServiceItem {
  id: string;
  icon: ComponentType<LucideProps>;
  title: string;
  grownUpTitle: string;
  kidDesc: string;
  boringDesc: string;
  features: string[];
}

interface ServiceCardsProps {
  isDarkMode: boolean;
}

const serviceItems: ServiceItem[] = [
  {
    id: "agents",
    icon: Bot,
    title: "Always-On Digital Staff",
    grownUpTitle: "Autonomous Agentic Pipelines",
    kidDesc: "Helpers who live inside your laptop. They read your emails, file documents, and answer customer support questions while you walk the dog!",
    boringDesc: "Multi-modal reactive pipelines utilizing vector intelligence for asynchronous message processing, state resolution, and operational throughput maximization.",
    features: [
      "Custom trigger action maps",
      "Dynamic multi-step planners",
      "Self-healing error detours",
    ]
  },
  {
    id: "websites",
    icon: Globe,
    title: "Awesome Smart Web Apps",
    grownUpTitle: "Full-Stack Software Platforms",
    kidDesc: "Complete interactive computer dashboards. They are super fast, look beautiful, and connect to other databases so everyone stays synced!",
    boringDesc: "Robust server-authoritative databases, isolated microservice frameworks, and modern React reactive environments tailored for high-concurrency.",
    features: [
      "Next-gen speed benchmarks",
      "Interactive data visualizations",
      "Robust state sync layers",
    ]
  },
  {
    id: "integrations",
    icon: Link,
    title: "Automated Connection Rails",
    grownUpTitle: "Event-Based Integration Hubs",
    kidDesc: "Bridges that connect your favorite program buttons. No more copying text from Excel spreadsheets or clicking boring buttons manually!",
    boringDesc: "Low-latency REST / Webhook proxy layers designed to automatically securely exchange transaction streams across legacy third-party services.",
    features: [
      "No-code / low-code adapters",
      "Instant real-time triggers",
      "Secure credential handshakes",
    ]
  }
];

export default function ServiceCards({ isDarkMode }: ServiceCardsProps) {
  return (
    <section id="services" className={`py-20 px-6 max-w-7xl mx-auto scroll-mt-20 border-t ${
      isDarkMode ? "border-[#14141c]" : "border-gray-200"
    }`}>
      
      {/* Structural Title Centered */}
      <div className="text-center max-w-3xl mx-auto mb-16 select-none">
        <span className={`font-mono text-xs uppercase px-3 py-1 rounded-md tracking-widest inline-block mb-3 border ${
          isDarkMode 
            ? "bg-[#14141d] border-[#1f1f2a] text-violet-300" 
            : "bg-violet-50 border-violet-200 text-violet-750 font-bold"
        }`}>
          AGENCY CAPABILITIES
        </span>
        <h2 className={`font-display font-bold text-3xl md:text-5xl tracking-tight leading-tight transition-colors ${
          isDarkMode ? "text-white" : "text-gray-950"
        }`}>
          What can our robot builders make for you?
        </h2>
        <p className={`text-sm md:text-base mt-4 leading-relaxed font-sans transition-colors ${
          isDarkMode ? "text-gray-400" : "text-gray-600 font-medium"
        }`}>
          We combine cutting-edge Agentic AI mechanics with gorgeous design to ship products that eliminate manual click-labor forever.
        </p>
      </div>

      {/* Capabilities Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {serviceItems.map((srv, index,) => {

          const IconComponent = srv.icon
        
          return (
            <div
              key={srv.id}
              className={`group relative p-6 md:p-8 rounded-lg transition-all duration-300 flex flex-col justify-between border ${
                isDarkMode 
                  ? "bg-[#040406] border-[#14141c] hover:border-violet-800/60" 
                  : "bg-white border-gray-200 hover:border-violet-500 hover:shadow-lg text-gray-900 shadow-md"
              }`}
              id={`service-card-${srv.id}`}
            >
              {/* Corner structural numbers */}
              <span className={`absolute top-6 right-6 font-mono text-sm font-bold select-none ${
                isDarkMode ? "text-gray-800" : "text-gray-200"
              }`}>
                0{index + 1}
              </span>

              <div>
                {/* Visual Circle Emblem */}
                <div className={`w-12 h-12 rounded-lg border flex items-center justify-center text-2xl mb-6 shadow-md transition-transform group-hover:scale-110 duration-300 ${
                  isDarkMode ? "bg-[#0a0a0f] border-[#1c1c24]" : "bg-gray-100 border-gray-300"
                }`}>
                  <IconComponent />
                </div>

                <div className="mb-4">
                  <h3 className={`font-display font-semibold text-lg transition-colors ${
                    isDarkMode ? "text-white group-hover:text-violet-350" : "text-[#111827] group-hover:text-violet-750"
                  }`}>
                    {srv.title}
                  </h3>
                  <span className={`text-[10px] font-mono uppercase tracking-wider block mt-0.5 ${
                    isDarkMode ? "text-violet-400" : "text-violet-700 font-bold"
                  }`}>
                    {srv.grownUpTitle}
                  </span>
                </div>

                <p className={`text-xs md:text-sm leading-relaxed font-sans mb-6 transition-colors ${
                  isDarkMode ? "text-gray-400" : "text-gray-600 font-medium"
                }`}>
                  {srv.kidDesc}
                </p>

                {/* Sub features Bullet list */}
                <div className={`border-t pt-5 mt-4 ${
                  isDarkMode ? "border-[#121218]" : "border-gray-200"
                }`}>
                  <span className="font-mono text-[9px] uppercase tracking-widest block mb-3 text-gray-500 font-semibold">
                    Included Superpowers
                  </span>
                  <ul className="flex flex-col gap-2.5">
                    {srv.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-mono">
                        <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${
                          isDarkMode ? "text-violet-400/90" : "text-violet-600"
                        }`} />
                        <span className={isDarkMode ? "text-gray-300" : "text-gray-700 font-medium"}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-violet-500 hover:text-fuchsia-500 mt-8 cursor-pointer select-none">
                <span>Configure features</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
