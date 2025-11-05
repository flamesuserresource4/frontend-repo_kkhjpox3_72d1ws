import { useMemo } from "react";
import { PawPrint, Rocket, Volume2, Gamepad2 } from "lucide-react";

export default function PetHUD({ name = "Mochi", mood, hunger, energy, lastCommand, lastReply }) {
  const moodColor = useMemo(() => {
    switch (mood) {
      case "happy":
        return "text-green-700 bg-green-50 ring-green-200";
      case "playful":
        return "text-purple-700 bg-purple-50 ring-purple-200";
      case "sleepy":
        return "text-amber-700 bg-amber-50 ring-amber-200";
      case "hungry":
        return "text-rose-700 bg-rose-50 ring-rose-200";
      default:
        return "text-gray-700 bg-gray-50 ring-gray-200";
    }
  }, [mood]);

  const Stat = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200">
      <Icon size={16} className="text-gray-700" />
      <div className="text-sm">
        <div className="text-gray-500">{label}</div>
        <div className="font-medium text-gray-900">{value}</div>
      </div>
    </div>
  );

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-stretch">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                <div className={`mt-1 inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full ring-1 ${moodColor}`}>
                  <PawPrint size={14} />
                  <span>{mood}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat icon={Gamepad2} label="Energy" value={`${energy}/100`} />
            <Stat icon={Rocket} label="Hunger" value={`${hunger}/100`} />
            <Stat icon={Volume2} label="Last" value={lastCommand || "—"} />
          </div>

          <div className="mt-6">
            <div className="text-sm text-gray-500">Pet says</div>
            <div className="mt-2 rounded-lg border border-gray-200 bg-gradient-to-br from-purple-50 to-blue-50 p-4 text-sm text-gray-900 min-h-[64px]">
              {lastReply || "Hi hi! I'm ready to play!"}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-900">Try saying</h4>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700">
            <li className="px-3 py-2 rounded-md bg-gray-50 border border-gray-200">Sit</li>
            <li className="px-3 py-2 rounded-md bg-gray-50 border border-gray-200">Jump</li>
            <li className="px-3 py-2 rounded-md bg-gray-50 border border-gray-200">Eat your food</li>
            <li className="px-3 py-2 rounded-md bg-gray-50 border border-gray-200">Go to sleep</li>
            <li className="px-3 py-2 rounded-md bg-gray-50 border border-gray-200">Come here</li>
            <li className="px-3 py-2 rounded-md bg-gray-50 border border-gray-200">Good job</li>
          </ul>
          <p className="mt-4 text-xs text-gray-500">Your pet understands simple commands and responds in a kid-like voice.</p>
        </div>
      </div>
    </section>
  );
}
