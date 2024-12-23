import React, { createContext, useContext, useState } from "react";
import run from "../gemini/jarvisAPi";

const JarvisContext = createContext();

export const JarvisProvider = ({ children }) => {
  const [speaking, setSpeaking] = useState(false);
  const [prompt, setPrompt] = useState("listening...");
  const [response, setResponse] = useState(false);
  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
  }

  async function aiResponse(prompt) {
    let text = await run(prompt);
    let newText =
      text.split("**") &&
      text.split("*") &&
      text.replace("google", "name") &&
      text.replace("Google", "name");
    console.log(text);
    transcript(text);
    speak(text);
    setResponse(true);
    setTimeout(() => {
      setSpeaking(false);
    }, 5000);
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  // let SpeechRecognition =
  //   window.speechRecognition || window.WebkitspeechRecognition;

  recognition.onResult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.result[currentIndex][0].transcript;
    console.log(transcript);
    setPrompt(transcript);
    aiResponse(transcript);
  };

  let value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    response,
    setResponse,
    setPrompt,
  };

  return (
    <JarvisContext.Provider value={value}>{children}</JarvisContext.Provider>
  );
};

export const useJarvis = () => useContext(JarvisContext);
