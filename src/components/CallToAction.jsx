export default function CallToAction() {
  return (
    <section id="cta" className="py-16 lg:py-24">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-purple-500/10 via-fuchsia-400/10 to-blue-500/10" />
          <h3 className="relative text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
            Ready to meet your AR companion?
          </h3>
          <p className="relative mt-3 text-gray-600">
            Start with a playful pup, then unlock cats, dragons, and more as you build your care streak.
          </p>
          <div className="relative mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="#" className="px-5 py-3 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">Create My Pet</a>
            <a href="#features" className="px-5 py-3 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50">Learn More</a>
          </div>
        </div>
      </div>
    </section>
  );
}
