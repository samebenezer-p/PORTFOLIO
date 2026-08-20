"use client";

import React, { useState, useEffect, memo } from "react";

interface TypewriterProps {
  words: string[];
  delay?: number;
  deleteSpeed?: number;
  pause?: number;
}

/* Phase 21 — React.memo prevents re-render when parent state changes */
const Typewriter = memo(function Typewriter({
  words,
  delay = 100,
  deleteSpeed = 60,
  pause = 1500,
}: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const word = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, deleteSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) => word.slice(0, prev.length + 1));
      }, delay);
    }

    if (!isDeleting && currentText === word) {
      timer = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, delay, deleteSpeed, pause]);

  return (
    <span className="text-[#00E5FF] font-semibold tracking-wide border-r-2 border-[#18FFFF] pr-1 animate-pulse">
      {currentText}
    </span>
  );
});

export default Typewriter;
