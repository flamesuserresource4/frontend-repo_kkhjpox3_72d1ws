import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import VoiceShowcase from "./components/VoiceShowcase";
import CallToAction from "./components/CallToAction";

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main>
        <Hero />
        <Features />
        <VoiceShowcase />
        <CallToAction />
      </main>
      <footer className="py-10 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} AR Pet Companion. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#features" className="hover:text-gray-900">Features</a>
            <a href="#voice" className="hover:text-gray-900">Voice</a>
            <a href="#cta" className="hover:text-gray-900">Get Started</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
