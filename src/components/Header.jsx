import { PawPrint, Mic, Rocket } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full sticky top-0 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-black/5 z-20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-blue-500 grid place-items-center text-white shadow-lg shadow-fuchsia-500/25">
            <PawPrint size={20} />
          </div>
          <span className="font-semibold text-gray-900 tracking-tight">AR Pet Companion</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-700">
          <a href="#features" className="hover:text-gray-900">Features</a>
          <a href="#voice" className="hover:text-gray-900">Voice</a>
          <a href="#cta" className="hover:text-gray-900">Get Started</a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gray-900 text-white text-sm hover:bg-gray-800 transition-colors">
            <Rocket size={16} />
            Launch Demo
          </button>
          <button className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 text-sm hover:bg-gray-50">
            <Mic size={16} />
            Try Voice
          </button>
        </div>
      </div>
    </header>
  );
}
