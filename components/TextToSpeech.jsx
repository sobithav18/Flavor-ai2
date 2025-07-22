"use client";

import { useEffect, useState } from "react";
import { PauseIcon, PlayIcon, ResumeIcon, StopIcon } from "./Icons";

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    u.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-gray-700 font-medium">Listen to Instructions</span>
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
      </div>
      <div className="join shadow-md">
        <button
          onClick={handlePlay}
          disabled={isPlaying && !isPaused}
          className={`join-item btn ${isPlaying && !isPaused ? 'btn-disabled bg-gray-100' : 'btn-primary'} hover:scale-105 transition-transform duration-300`}
          aria-label={isPaused ? "Resume speech" : "Start speech"}
          title={isPaused ? "Resume speech" : "Start speech"}
        >
          {isPaused ? <ResumeIcon /> : <PlayIcon />}
        </button>
        <button
          onClick={handlePause}
          disabled={!isPlaying || isPaused}
          className={`join-item btn ${!isPlaying || isPaused ? 'btn-disabled bg-gray-100' : 'btn-primary'} hover:scale-105 transition-transform duration-300`}
          aria-label="Pause speech"
          title="Pause speech"
        >
          <PauseIcon />
        </button>
        <button
          onClick={handleStop}
          disabled={!isPlaying && !isPaused}
          className={`join-item btn ${!isPlaying && !isPaused ? 'btn-disabled bg-gray-100' : 'btn-primary'} hover:scale-105 transition-transform duration-300`}
          aria-label="Stop speech"
          title="Stop speech"
        >
          <StopIcon />
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;
