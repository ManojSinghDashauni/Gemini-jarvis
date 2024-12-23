import { useJarvis } from "./context/JarvisContext";
import jarvis from "./assets/jarvis.png";
import speakImg from "./assets/speak.gif";
import aiVoice from "./assets/aiVoice.gif";

export default function App() {
  const {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse,
  } = useJarvis();
  return (
    <div className="bg-slate-600 h-screen w-auto flex flex-col items-center pt-10 sm:py-20">
      <div className="sm:w-96 sm:h-auto">
        <img className="w-full h-full" src={jarvis} alt="jarvis" />
      </div>
      {!speaking ? (
        <button
          className="bg-slate-500 text-black w-40 py-4 rounded-lg mx-auto hover:bg-slate-400"
          onClick={() => {
            setPrompt("listening...");
            setSpeaking(true);
            setResponse(false);
            recognition.start();
          }}
        >
          Ask me
        </button>
      ) : (
        <div className="mx-auto h-10 w-10">
          {!response ? (
            <img className="w-full h-full" src={speakImg} alt="jarvis" />
          ) : (
            <img className="w-full h-full" src={aiVoice} alt="jarvis" />
          )}
          <p className="text-center">{prompt}</p>
        </div>
      )}
    </div>
  );
}
