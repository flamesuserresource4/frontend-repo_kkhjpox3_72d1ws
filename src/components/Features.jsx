import { Mic, Gamepad2, PawPrint, Rocket } from "lucide-react";

const features = [
  {
    icon: PawPrint,
    title: "Adopt & Evolve",
    desc: "Care for your companion and watch it grow with mood, hunger, and energy levels.",
  },
  {
    icon: Mic,
    title: "Voice Commands",
    desc: "Say things like ‘Sit’, ‘Jump’, or ‘Dance’. Your pet reacts instantly.",
  },
  {
    icon: Gamepad2,
    title: "Play in AR",
    desc: "Place your pet in the real world using your camera with smooth, cute animations.",
  },
  {
    icon: Rocket,
    title: "Daily Streaks",
    desc: "Build a care streak to unlock tricks, toys, and special evolutions.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 lg:py-24 bg-gradient-to-b from-white to-purple-50/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
            Everything you need for a magical pet experience
          </h2>
          <p className="mt-3 text-gray-600">
            Designed for delight: responsive AR, natural voice, and gentle game loops that reward care.
          </p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group relative rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-white grid place-items-center shadow-lg shadow-purple-500/25">
                <Icon size={18} />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
