import { Mic } from "lucide-react";

export default function VoiceShowcase() {
  return (
    <section id="voice" className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
            Talk to your pet just like a friend
          </h3>
          <p className="mt-3 text-gray-600">
            Powered by speech recognition and expressive responses. Say “Come here”, “Sit”, “Jump”,
            or “Dance” and your pet reacts with adorable animations.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-gray-700">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
              Natural commands like “Eat”, “Sleep”, “Play”.
            </li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
              Friendly voice replies and barks/meows.
            </li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
              Works great on modern mobile devices.
            </li>
          </ul>
        </div>
        <div className="order-1 lg:order-2 relative">
          <div className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-fuchsia-200 via-purple-200 to-blue-200 grid place-items-center">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/70 backdrop-blur text-gray-900 shadow">
                <Mic size={16} />
                <span className="text-sm font-medium">“Hey Nova, come here!”</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              This is a visual preview. In the full app, your microphone triggers real-time interactions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
