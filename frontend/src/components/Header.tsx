import React, { useState } from "react";
import { Terminal, Menu, X, Rocket, Sparkles, MessageSquare, Briefcase, HelpCircle, Layers, Sun, Moon, Cpu } from "lucide-react";

interface HeaderProps {
  onStartWizard: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function Header({ onStartWizard, onNavigateSection, activeSection, isDarkMode, onToggleTheme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "work", label: "Work", icon: Briefcase },
    { id: "services", label: "Services", icon: Layers },
    { id: "skills", label: "Skills", icon: Cpu },
    { id: "process", label: "Currently Building", icon: Sparkles },
    { id: "about", label: "About", icon: HelpCircle },
    { id: "contact", label: "Contact", icon: MessageSquare },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b transition-all duration-300 ${
      isDarkMode 
        ? "bg-[#000000]/85 border-[#111115]" 
        : "bg-[#ffffff]/85 border-gray-200"
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo/Brand Identifier */}
        <button
          onClick={() => onNavigateSection("hero")}
          className="flex items-center gap-2 hover:opacity-90 group transition-all"
          id="logo-btn"
        >
          <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-lg p-0.5 shadow-lg shadow-violet-500/25">
            <div className={`w-full h-full rounded-[6px] flex items-center justify-center font-display font-bold text-lg transition-colors ${
              isDarkMode 
                ? "bg-[#000000] text-white group-hover:bg-gradient-to-tr group-hover:from-violet-950 group-hover:to-fuchsia-950" 
                : "bg-[#ffffff] text-gray-900 group-hover:bg-gradient-to-tr group-hover:from-violet-50 group-hover:to-fuchsia-50"
            }`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">TA</span>
            </div>
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className={`font-display font-semibold text-lg tracking-wider transition-colors ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              TWO AGENTS LAB
            </span>
            <span className="text-[9px] uppercase tracking-widest text-violet-500 font-mono font-bold">
              Intelligence Agency
            </span>
          </div>
        </button>

        {/* Desktop Navbar Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigateSection(item.id);
                }}
                className={`group flex items-center gap-1.5 text-[14px] font-medium tracking-wide transition-all ${
                  isActive
                    ? isDarkMode ? "text-violet-400 font-semibold" : "text-violet-600 font-semibold"
                    : isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
                id={`nav-${item.id}`}
              >
                <Icon className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
                  isActive ? "text-violet-500" : "text-gray-400 group-hover:text-violet-500"
                }`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button, Theme Toggle, & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Smooth interactive theme selector */}
          <button
            onClick={onToggleTheme}
            className={`p-2.5 rounded-lg border transition-all active:scale-90 ${
              isDarkMode 
                ? "bg-[#0b0b0f] border-[#22222a] text-yellow-400 hover:text-yellow-300 hover:bg-neutral-900" 
                : "bg-gray-100 border-gray-300 text-violet-600 hover:text-violet-800 hover:bg-gray-200"
            }`}
            id="theme-toggle-btn"
            title={isDarkMode ? "Switch to light mode" : "Switch to night mode"}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onStartWizard}
            className="hidden sm:flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-medium text-[13px] tracking-wider rounded-md shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.55)] md:hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
            id="start-action-btn"
          >
            <span>Let's Build</span>
            
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
            }`}
            aria-label="Toggle Menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar/Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t px-6 py-6 pb-8 transition-transform duration-300 ${
          isDarkMode 
            ? "border-[#111115] bg-[#000000]" 
            : "border-gray-200 bg-[#ffffff]"
        }`}>
          <div className="flex flex-col gap-5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigateSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 text-left py-2 font-display text-lg tracking-wide border-b transition-colors ${
                    isActive 
                      ? "text-violet-500 font-bold" 
                      : isDarkMode ? "text-gray-400 border-[#0a0a0c]" : "text-gray-600 border-gray-100"
                  }`}
                  id={`mob-nav-${item.id}`}
                >
                  <Icon className="w-5 h-5 text-violet-500" />
                  {item.label}
                </button>
              );
            })}
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartWizard();
              }}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-display text-base font-semibold rounded-md shadow-lg shadow-violet-500/20"
              id="mob-start-btn"
            >
              <span>Let's Build</span>
              // <Rocket className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
