import { useEffect, useRef, useState } from "react";
import { Mic, Square, Volume2 } from "lucide-react";

export default function VoiceCapture({ onCommand, onTranscript }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [supported, setSupported] = useState({ speech: false, mic: false });
  const recognitionRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const rafRef = useRef(0);
  const canvasRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setSupported({ speech: !!SpeechRecognition, mic: !!navigator.mediaDevices?.getUserMedia });

    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = navigator.language || "en-US";
      recog.onresult = (event) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const res = event.results[i];
          if (res.isFinal) setTranscript((prev) => (prev + " " + res[0].transcript).trim());
          else interim += res[0].transcript;
        }
        if (interim) setTranscript((prev) => (prev + " " + interim).trim());
      };
      recognitionRef.current = recog;
    }

    return () => stopAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!transcript) return;
    onTranscript?.(transcript);

    // lightweight intent detection
    const text = transcript.toLowerCase();
    const intents = [
      { key: "sit", match: ["sit", "seat"], intent: "sit" },
      { key: "jump", match: ["jump", "hop"], intent: "jump" },
      { key: "eat", match: ["eat", "food", "snack"], intent: "eat" },
      { key: "sleep", match: ["sleep", "nap", "rest"], intent: "sleep" },
      { key: "come", match: ["come here", "come", "over here"], intent: "come" },
      { key: "praise", match: ["good job", "good boy", "good girl", "nice"], intent: "praise" },
      { key: "hello", match: ["hello", "hi", "hey"], intent: "hello" },
    ];

    for (const item of intents) {
      if (item.match.some((m) => text.includes(m))) {
        onCommand?.(item.intent);
        break;
      }
    }
  }, [transcript, onCommand, onTranscript]);

  const drawLevels = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext("2d");
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = dataArrayRef.current;

    const render = () => {
      rafRef.current = requestAnimationFrame(render);
      analyser.getByteFrequencyData(dataArray);
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);
      const barWidth = Math.max(2, (width / bufferLength) * 2.0);
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 255.0;
        const barHeight = v * height;
        ctx.fillStyle = `hsl(${220 + i / 3}, 80%, ${40 + v * 40}%)`;
        ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
        x += barWidth;
      }
    };
    render();
  };

  const startAll = async () => {
    try {
      setTranscript("");
      // mic
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      sourceRef.current = source;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      source.connect(analyser);
      drawLevels();

      // speech recognition
      if (recognitionRef.current) recognitionRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error(err);
      alert("Microphone permission is required for voice capture.");
    }
  };

  const stopAll = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch {}
    }
    if (sourceRef.current?.mediaStream) {
      sourceRef.current.mediaStream.getTracks().forEach((t) => t.stop());
    }
    setIsRecording(false);
  };

  return (
    <section id="voice" className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-start justify-between gap-8 flex-col lg:flex-row">
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">Real-time voice capture</h3>
            <p className="mt-3 text-gray-600">Use your microphone to issue natural commands. We transcribe locally using your browser’s built-in speech recognition when available.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {!isRecording ? (
                <button onClick={startAll} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-900 text-white text-sm hover:bg-gray-800">
                  <Mic size={16} /> Start Listening
                </button>
              ) : (
                <button onClick={stopAll} className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-sm hover:bg-gray-50">
                  <Square size={16} /> Stop
                </button>
              )}
              <span className="text-xs text-gray-500">Speech: {supported.speech ? "available" : "unavailable"} · Mic: {supported.mic ? "available" : "unavailable"}</span>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700">Transcript</h4>
              <div className="mt-2 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-800 min-h-[90px] whitespace-pre-wrap">
                {transcript || (isRecording ? "Listening…" : "Press Start to begin speaking.")}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[460px]">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-gray-900 mb-3">
                <Volume2 size={16} />
                <span className="text-sm font-medium">Live Mic Levels</span>
              </div>
              <div className="aspect-[16/9] rounded-lg bg-gradient-to-br from-purple-100 via-fuchsia-100 to-blue-100 overflow-hidden">
                <canvas ref={canvasRef} width={800} height={450} className="w-full h-full" />
              </div>
              <p className="mt-3 text-xs text-gray-500">Audio stays on-device in your browser.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
