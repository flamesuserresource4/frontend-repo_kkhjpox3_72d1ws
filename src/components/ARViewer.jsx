import "@google/model-viewer";

export default function ARViewer() {
  return (
    <section id="ar" className="py-16 lg:py-24 bg-gradient-to-b from-purple-50/40 to-white">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">Place your pet in the real world</h3>
          <p className="mt-3 text-gray-600">Tap “View in your space” on compatible devices to launch AR. Supports WebXR on Android and Quick Look on iOS (via USDZ when available).</p>
          <ul className="mt-6 space-y-3 text-sm text-gray-700">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gray-900" /> Works right in the browser with no app install.</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gray-900" /> Real scale, touch to rotate/zoom, drop shadow.</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gray-900" /> Use your camera to anchor the pet in your room.</li>
          </ul>
        </div>
        <div className="order-1 lg:order-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <model-viewer
              src="https://modelviewer.dev/shared-assets/models/RobotExpressive.glb"
              poster="https://modelviewer.dev/assets/poster-astronaut.png"
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              shadow-intensity="0.8"
              exposure="1.1"
              style={{ width: "100%", height: "420px", background: "linear-gradient(135deg,#faf5ff,#eff6ff)" }}
            >
              <button slot="ar-button" className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm">View in your space</button>
            </model-viewer>
            <p className="mt-3 text-xs text-gray-500">Tip: Open on a mobile device for the AR button.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
