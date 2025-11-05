import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ARViewer from "./components/ARViewer";
import VoiceCapture from "./components/VoiceCapture";
import CallToAction from "./components/CallToAction";
import Features from "./components/Features";
import PetHUD from "./components/PetHUD";

function App() {
  const [mood, setMood] = useState("happy");
  const [hunger, setHunger] = useState(40); // 0 = full, 100 = very hungry
  const [energy, setEnergy] = useState(80); // 0 = tired, 100 = energetic
  const [lastCommand, setLastCommand] = useState("");
  const [lastReply, setLastReply] = useState("");
  const voicesRef = useRef([]);

  // preload available voices
  useEffect(() => {
    const load = () => {
      voicesRef.current = window.speechSynthesis?.getVoices?.() || [];
    };
    load();
    window.speechSynthesis?.addEventListener?.("voiceschanged", load);
    return () => window.speechSynthesis?.removeEventListener?.("voiceschanged", load);
  }, []);

  const kidSpeak = useCallback((text) => {
    if (!("speechSynthesis" in window)) return;
    const utter = new SpeechSynthesisUtterance(text);
    const voices = voicesRef.current;
    const preferred = voices.find(v => /child|kid/i.test(v.name))
      || voices.find(v => /female/i.test(v.name))
      || voices[0];
    if (preferred) utter.voice = preferred;
    utter.rate = 1.05;
    utter.pitch = 1.35;
    utter.volume = 1.0;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }, []);

  const replyForIntent = useCallback((intent) => {
    switch (intent) {
      case "sit":
        return "Okay! I sit like a good buddy!";
      case "jump":
        return "Boing! Look how high I go!";
      case "eat":
        return "Mmm yum yum! Snack time makes me happy!";
      case "sleep":
        return "Nap nap time. Nighty night!";
      case "come":
        return "I'm zooming to you! Zoom!";
      case "praise":
        return "Hehe thanks! I'm trying my best!";
      case "hello":
        return "Hiii! Wanna play with me?";
      default:
        return "I don't know that one yet, but I wanna learn!";
    }
  }, []);

  const handleCommand = useCallback((intent) => {
    setLastCommand(intent);
    // simple state changes
    if (intent === "eat") {
      setHunger((h) => Math.max(0, h - 30));
      setMood("happy");
      setEnergy((e) => Math.min(100, e + 5));
    } else if (intent === "sleep") {
      setEnergy((e) => Math.min(100, e + 40));
      setMood("sleepy");
    } else if (intent === "jump") {
      setEnergy((e) => Math.max(0, e - 15));
      setMood("playful");
    } else if (intent === "sit") {
      setMood("happy");
    } else if (intent === "come") {
      setMood("playful");
    } else if (intent === "praise") {
      setMood("happy");
    } else if (intent === "hello") {
      setMood("playful");
    }

    const line = replyForIntent(intent);
    setLastReply(line);
    kidSpeak(line);
  }, [kidSpeak, replyForIntent]);

  // slow drift to hungry / less energy over time
  useEffect(() => {
    const t = setInterval(() => {
      setHunger((h) => Math.min(100, h + 1));
      setEnergy((e) => Math.max(0, e - 1));
    }, 8000);
    return () => clearInterval(t);
  }, []);

  const onTranscript = useCallback((t) => {
    // could log or persist later
  }, []);

  const moodLabel = useMemo(() => mood, [mood]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main>
        <Hero />
        <Features />
        <PetHUD name="Mochi" mood={moodLabel} hunger={hunger} energy={energy} lastCommand={lastCommand} lastReply={lastReply} />
        <ARViewer />
        <VoiceCapture onCommand={handleCommand} onTranscript={onTranscript} />
        <CallToAction />
      </main>
      <footer className="py-10 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} AR Pet Companion. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#features" className="hover:text-gray-900">Features</a>
            <a href="#voice" className="hover:text-gray-900">Voice</a>
            <a href="#ar" className="hover:text-gray-900">AR</a>
            <a href="#cta" className="hover:text-gray-900">Get Started</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
