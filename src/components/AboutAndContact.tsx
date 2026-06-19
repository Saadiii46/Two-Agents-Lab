import React, { useState } from "react";
import {  
  Terminal,  
  ThumbsUp, 
  Send,
  CheckCircle2,
  Mail,
  User,
  MessageSquare
} from "lucide-react";

interface AboutAndContactProps {
  isDarkMode: boolean;
}

export default function AboutAndContact({ isDarkMode }: AboutAndContactProps) {
  const [likes, setLikes] = useState<{ [key: string]: number }>({
    "about": 142
  });

  // Contact form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("agents");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLike = (id: string) => {
    setLikes(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    // Mimic high-speed server response
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleResetForm = () => {
    setName("");
    setEmail("");
    setProjectType("agents");
    setMessage("");
    setIsSubmitted(false);
  };

  return (
    <div className={`border-t py-20 px-6 max-w-7xl mx-auto flex flex-col gap-24 ${
      isDarkMode ? "border-[#14141c]" : "border-gray-200"
    }`}>
      
      {/* About Section */}
      <section id="about" className="scroll-mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column: Kid illustration concept */}
        <div className={`lg:col-span-5 relative p-8 rounded-lg overflow-hidden select-none text-center border transition-all duration-300 ${
          isDarkMode ? "bg-[#040406] border-[#14141c]" : "bg-white border-gray-200 shadow-md"
        }`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-950/20 via-transparent to-fuchsia-950/25 blur-xl pointer-events-none" />
          
          <div className="relative z-10 font-sans">
            <span className="text-5xl block mb-6 animate-bounce">🧪</span>
            <div className={`inline-block px-3 py-1 font-mono text-[10px] uppercase rounded-full tracking-wider mb-4 border ${
              isDarkMode 
                ? "bg-violet-950/40 text-violet-400 border-violet-800/20" 
                : "bg-violet-50 text-violet-750 font-bold border-violet-200"
            }`}>
              MEET THE LAB OWNERS
            </div>
            
            <h3 className={`font-display font-bold text-2xl transition-colors ${
              isDarkMode ? "text-white" : "text-gray-950"
            }`}>
              Muhammad Saad & Mehwish Fatima
            </h3>
            <p className={`text-xs font-mono uppercase tracking-[0.15em] mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-650"}`}>
              Founding Agent Architects
            </p>

            <blockquote className={`text-xs italic leading-relaxed font-sans max-w-sm mx-auto mt-6 border-l-2 pl-4 py-1 text-left ${
              isDarkMode ? "text-gray-400" : "text-gray-700"
            } ${isDarkMode ? "border-fuchsia-500/85" : "border-fuchsia-600"}`}>
              "Computers should be fun and easy. If a task requires you to click the exact same folder 50 times in a row, a smart helper should do it for you while you eat pancakes."
            </blockquote>

            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => handleLike("about")}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-mono rounded border transition-colors cursor-pointer ${
                  isDarkMode 
                    ? "bg-black border-[#1c1c24] hover:bg-[#0c0c12] text-gray-300" 
                    : "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-700 font-semibold"
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5 text-fuchsia-500" />
                <span>Give High-Five! ({likes["about"]})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right column: Friendly values text */}
        <div className="lg:col-span-7 flex flex-col gap-6 font-sans">
          <div className="select-none">
            <span className={`font-mono text-xs uppercase px-3 py-1 rounded-md tracking-widest inline-block mb-3 border ${
              isDarkMode 
                ? "bg-[#14141d] border-[#1f1f2a] text-fuchsia-400" 
                : "bg-fuchsia-50 border-fuchsia-250 text-fuchsia-850 font-bold"
            }`}>
              THE LAB CREDO
            </span>
            <h2 className={`font-display font-bold text-3xl md:text-5xl tracking-tight leading-none transition-colors ${
              isDarkMode ? "text-white" : "text-gray-950"
            }`}>
              Who are we?
            </h2>
          </div>

          <p className={`text-sm md:text-base leading-relaxed font-sans transition-colors ${
            isDarkMode ? "text-gray-300" : "text-gray-650 font-medium"
          }`}>
            We are a group of friendly computer architects who got tired of boring typing work. We build autonomous software agents that connect to your business databases, read documentation logs, solve errors, and do high-speed chores.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {[
              { title: "No Tech-Larping!", desc: "We use standard, useful, humble literal names for things. No complicated words to pretend we are smarter than we are." },
              { title: "ADHD Loving Designs", desc: "Our products use high contrast, big checklists, visual simulators, and zero clutter so your team stays focused." },
              { title: "Fast-Lane Compiling", desc: "Our custom robots assemble applications in hours, bypass standard development slow-downs, and launch green." },
              { title: "100% Solid Black Code", desc: "Everything is kept pure, lightweight, and ultra-secure under standard client sandbox authorizations." }
            ].map((credo, i) => (
              <div key={i} className={`p-4 rounded-md border transition-colors ${
                isDarkMode ? "bg-[#040406] border-[#121216]" : "bg-white border-gray-200 shadow-sm"
              }`}>
                <h4 className={`font-display font-bold text-sm flex items-center gap-2 transition-colors ${
                  isDarkMode ? "text-white" : "text-gray-950"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? "bg-violet-400" : "bg-violet-600"}`} />
                  {credo.title}
                </h4>
                <p className={`text-xs mt-1 leading-relaxed transition-colors ${
                  isDarkMode ? "text-gray-400" : "text-gray-600 font-medium"
                }`}>
                  {credo.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Contact Section */}
      <section id="contact" className={`scroll-mt-20 border-t pt-20 ${
        isDarkMode ? "border-[#121218]/80" : "border-gray-200"
      }`}>
        
        {/* Title Block */}
        <div className="text-left max-w-2xl mb-12 select-none font-sans">
          <span className={`font-mono text-xs uppercase px-3 py-1 rounded-md tracking-widest inline-block mb-3 border ${
            isDarkMode 
              ? "bg-[#14141d] border-[#1f1f2a] text-violet-300" 
              : "bg-violet-50 border-violet-200 text-violet-750 font-bold"
          }`}>
            GET IN TOUCH
          </span>
          <h2 className={`font-display font-bold text-3xl md:text-5xl tracking-tight leading-tight transition-colors ${
            isDarkMode ? "text-white" : "text-gray-950"
          }`}>
            Let's build together
          </h2>
          <p className={`text-sm mt-3 leading-relaxed font-sans transition-colors ${
            isDarkMode ? "text-gray-400" : "text-gray-650"
          }`}>
            Ready to design an automated helper for your workflow? Drop us a prompt below, and we will get cooking.
          </p>
        </div>

        {/* Contact Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left instructions block */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-8">
            <div className={`p-6 rounded-xl border h-full flex flex-col justify-between ${
              isDarkMode ? "bg-black/40 border-[#141418]" : "bg-gray-50 border-gray-150"
            }`}>
              <div className="space-y-6">
                <span className="text-4xl block">⚡</span>
                <h4 className={`font-display font-bold text-lg ${
                  isDarkMode ? "text-white" : "text-gray-950"
                }`}>
                  Instant Response Rule
                </h4>
                <p className={`text-xs leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-650"}`}>
                  We review incoming proposals directly inside our active Discord channel pipelines. Once submitted, our system maps out a preliminary blueprint to fast-track your launch.
                </p>
              </div>

              <div className="pt-8 border-t border-dashed border-gray-700/20 space-y-4">
                <div className="flex items-center gap-3 text-xs">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isDarkMode ? "bg-[#121216]" : "bg-white border border-gray-200"
                  }`}>
                    <Mail className="w-4 h-4 text-violet-500" />
                  </div>
                  <div>
                    <span className="block text-gray-500 font-mono text-[9px] uppercase tracking-wider">Direct Inbox</span>
                    <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>labs@twoagents.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isDarkMode ? "bg-[#121216]" : "bg-white border border-gray-200"
                  }`}>
                    <Terminal className="w-4 h-4 text-fuchsia-500" />
                  </div>
                  <div>
                    <span className="block text-gray-500 font-mono text-[9px] uppercase tracking-wider">Response Threshold</span>
                    <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-901"}`}>Under 24 Computer Cycles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right form block */}
          <div className="lg:col-span-8">
            <div className={`p-6 md:p-8 rounded-xl border h-full transition-all duration-300 ${
              isDarkMode 
                ? "bg-[#040406] border-[#141418] text-white" 
                : "bg-white border-gray-250 text-gray-950 shadow-md"
            }`}>
              
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-8 space-y-5 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className={`font-display font-bold text-2xl ${
                      isDarkMode ? "text-white" : "text-gray-950"
                    }`}>
                      Submission Successful!
                    </h3>
                    <p className={`text-xs md:text-sm max-w-md mx-auto mt-2 leading-relaxed ${
                      isDarkMode ? "text-gray-400" : "text-gray-650"
                    }`}>
                      Checked twice, validated safe, and queued. Our robot dispatch system has routed your vision to Muhammad & Mehwish's terminal.
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      onClick={handleResetForm}
                      className={`px-5 py-2.5 rounded text-xs font-mono border font-bold hover:underline transition-colors cursor-pointer ${
                        isDarkMode
                          ? "bg-black border-[#1c1c24] hover:bg-[#0c0c12] text-violet-400"
                          : "bg-gray-50 border-gray-300 hover:bg-gray-100 text-violet-700"
                      }`}
                    >
                      ➔ Dispatch another request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <div className="space-y-2 text-left">
                      <label htmlFor="user-name" className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
                        Your Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <input
                          id="user-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Satoshi Nakamoto"
                          className={`w-full px-3 py-2.5 pl-9 rounded border text-xs tracking-wide focus:outline-none focus:ring-1 ${
                            isDarkMode 
                              ? "bg-black border-[#1c1c24] focus:border-violet-500 text-white focus:ring-violet-500/20 placeholder-gray-700" 
                              : "bg-gray-50 border-gray-300 focus:border-violet-600 text-gray-950 focus:ring-violet-600/20 placeholder-gray-400"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2 text-left">
                      <label htmlFor="user-email" className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
                        Your Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <input
                          id="user-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. sato@block.org"
                          className={`w-full px-3 py-2.5 pl-9 rounded border text-xs tracking-wide focus:outline-none focus:ring-1 ${
                            isDarkMode 
                              ? "bg-black border-[#1c1c24] focus:border-violet-500 text-white focus:ring-violet-500/20 placeholder-gray-700" 
                              : "bg-gray-50 border-gray-300 focus:border-violet-600 text-gray-950 focus:ring-violet-600/20 placeholder-gray-400"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Type Dropdown */}
                  <div className="space-y-2 text-left">
                    <label htmlFor="user-project" className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
                      What are we constructing?
                    </label>
                    <select
                      id="user-project"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className={`w-full px-3 py-2.5 rounded border text-xs tracking-wide focus:outline-none focus:ring-1 cursor-pointer ${
                        isDarkMode 
                          ? "bg-black border-[#1c1c24] focus:border-violet-500 text-white focus:ring-violet-500/20" 
                          : "bg-gray-50 border-gray-300 focus:border-violet-600 text-gray-950 focus:ring-violet-600/20"
                      }`}
                    >
                      <option value="agents">Always-On Digital Staff (Autonomous Agents)</option>
                      <option value="websites">Awesome Smart Web Apps (Full-Stack Dashboards)</option>
                      <option value="integrations">Automated Connection Rails (API Webhooks)</option>
                      <option value="other">Something else fun & custom</option>
                    </select>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2 text-left">
                    <label htmlFor="user-message" className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
                      Vision Proposal & Prompt
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none text-gray-500">
                        <MessageSquare className="w-3.5 h-3.5" />
                      </div>
                      <textarea
                        id="user-message"
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about the boring manual tasks we should automate, or the beautiful website ideas we should construct..."
                        className={`w-full px-3 py-2.5 pl-9 rounded border text-xs tracking-wide focus:outline-none focus:ring-1 resize-none ${
                          isDarkMode 
                            ? "bg-black border-[#1c1c24] focus:border-violet-500 text-white focus:ring-violet-500/20 placeholder-gray-700" 
                            : "bg-gray-50 border-gray-300 focus:border-violet-600 text-gray-950 focus:ring-violet-600/20 placeholder-gray-400"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Submission row */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`relative px-6 py-3 w-full sm:w-auto font-sans font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded text-xs select-none active:scale-95 cursor-pointer flex items-center justify-center gap-2 shadow-md transition-all ${
                        isSubmitting ? "opacity-75 pointer-events-none" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Dispatching code...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Mission Vision</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </section>

    </div>
  );
}
