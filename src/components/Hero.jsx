import Spline from "@splinetool/react-spline";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[70vh] grid grid-cols-1 lg:grid-cols-2 items-center overflow-hidden">
      {/* Left content */}
      <div className="relative z-10 order-2 lg:order-1 px-6 lg:px-10 py-10 lg:py-20">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 text-xs font-medium px-2.5 py-1.5 rounded-full bg-purple-50 text-purple-700 ring-1 ring-purple-200">
            <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
            Live AR + Voice
          </span>
          <h1 className="mt-4 text-4xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
            Grow an AR pet you can talk to
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Place your companion in your world, speak to it with natural voice
            commands, and watch it learn, play, and evolve over time.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#cta" className="px-5 py-3 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">Get Started</a>
            <a href="#features" className="px-5 py-3 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50">See Features</a>
          </div>
        </div>
      </div>

      {/* Right Spline scene */}
      <div className="relative order-1 lg:order-2 h-[40vh] lg:h-[70vh]">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
        {/* soft gradient highlight */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
      </div>
    </section>
  );
}
