import { Box, Modal } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import ResultModel from "../../Model/ResultModel";

export default function KeyBoardText({ selectedTime, isRunning, stopTimer, closeTimeUpModal, showTimeUpModal }) {
  const [typingState, setTypingState] = useState({
    paragraph: "",
    activeKey: null,
    cursorIndex: 0,
    typedText: "",
    typingStarted: false,
    startTime: null,
    wordsTyped: 0,
    currentWPM: 0,
    showCompletionModal: false,
    completionData: null
  });


  const [open, setOpen] = useState(true);
  const wpmIntervalRef = useRef(null);
  const { paragraph, activeKey, cursorIndex, typedText, typingStarted, startTime, wordsTyped, currentWPM, showCompletionModal, completionData } = typingState;

  useEffect(() => {
    if (isRunning && selectedTime) {
      let newParagraph = "";
      if (selectedTime === 30) {
        newParagraph = "The sun sets behind the hills, painting the sky with orange and pink hues.";
      } else if (selectedTime === 60) {
        newParagraph = "The city lights shimmer as people move through the streets, their faces glowing in the evening air. The sound of laughter echoes from cafes and small shops.";
      } else if (selectedTime === 120) {
        newParagraph = "Under the pale moonlight, the calm sea reflected the stars above. The waves whispered stories of distant lands, and the wind carried the scent of adventure.";
      } else if (selectedTime === 300) {
        newParagraph = "Life is a journey of endless learning. Every challenge teaches us patience, every failure builds strength, and every victory inspires hope. The key is to keep moving forward.";
      }
      setTypingState(prev => ({
        ...prev,
        paragraph: newParagraph,
        cursorIndex: 0,
        typedText: "",
        typingStarted: false,
        startTime: null,
        wordsTyped: 0,
        currentWPM: 0,
        // showCompletionModal: false,
        // completionData: null
      }));
      if (wpmIntervalRef.current) {
        clearInterval(wpmIntervalRef.current);
        wpmIntervalRef.current = null;
      }
    } else {
      setTypingState(prev => ({
        ...prev,
        paragraph: "",
        cursorIndex: 0,
        typedText: "",
        typingStarted: false,
        startTime: null,
        wordsTyped: 0,
        currentWPM: 0,
        // showCompletionModal: false,
        // completionData: null
      }));
      if (wpmIntervalRef.current) {
        clearInterval(wpmIntervalRef.current);
        wpmIntervalRef.current = null;
      }
    }
  }, [selectedTime, isRunning]);





  useEffect(() => {
    // ✅ CASE 1: Paragraph Complete (User ne paragraph khatam kar diya)
    if (typingStarted && cursorIndex === paragraph.length && paragraph.length > 0) {
      const endTime = new Date().getTime();
      const timeTakenInSeconds = (endTime - startTime) / 1000; // Actual typing time calculate
      const timeTakenInMinutes = timeTakenInSeconds / 60;
      const totalWordsInParagraph = calculateWordCount(paragraph);
      const userWordsTyped = calculateWordCount(typedText);
      const wpm = calculateWPM(typedText, timeTakenInMinutes);

      const completionData = {
        timeTaken: timeTakenInSeconds, // Actual time taken to complete paragraph
        wordsTyped: userWordsTyped,
        totalWordsInParagraph: totalWordsInParagraph,
        remainingWords: Math.max(0, totalWordsInParagraph - userWordsTyped),
        wpm: wpm,
        accuracy: calculateAccuracy(paragraph, typedText),
        isTimeUp: false, // User ne paragraph complete kiya
      };

      setTypingState(prev => ({
        ...prev,
        showCompletionModal: true,
        completionData: completionData
      }));

      if (stopTimer) stopTimer(); // Timer stop karo
      if (wpmIntervalRef.current) {
        clearInterval(wpmIntervalRef.current);
        wpmIntervalRef.current = null;
      }
    }

    // ✅ CASE 2: Time Up (Timer khatam ho gaya, paragraph incomplete)
    else if (showTimeUpModal && typingStarted) {
      const endTime = new Date().getTime();
      const actualTimeTakenInSeconds = (endTime - startTime) / 1000; // Actual typing time
      const timeTakenInMinutes = actualTimeTakenInSeconds / 60;

      const totalWordsInParagraph = calculateWordCount(paragraph);
      const userWordsTyped = calculateWordCount(typedText);
      const wpm = calculateWPM(typedText, timeTakenInMinutes);

      const completionData = {
        timeTaken: actualTimeTakenInSeconds, // Actual time user ne type kiya
        wordsTyped: userWordsTyped,
        totalWordsInParagraph: totalWordsInParagraph,
        remainingWords: Math.max(0, totalWordsInParagraph - userWordsTyped),
        wpm: wpm,
        accuracy: calculateAccuracy(paragraph, typedText),
        isTimeUp: true, // Time khatam ho gaya
      };

      setTypingState(prev => ({
        ...prev,
        showCompletionModal: true,
        completionData: completionData
      }));

      if (wpmIntervalRef.current) {
        clearInterval(wpmIntervalRef.current);
        wpmIntervalRef.current = null;
      }
    }
  }, [
    // Dependencies
    cursorIndex,           // Track typing progress
    paragraph,             // Paragraph content changes
    typingStarted,         // Typing start status
    startTime,             // When typing started
    typedText,             // What user typed
    stopTimer,             // Timer stop function
    showTimeUpModal        // Time up signal from parent
  ]);


  const calculateWPM = (typedChars, timeInMinutes) => {
    const words = typedChars.trim() === "" ? 0 : typedChars.trim().split(/\s+/).length;
    return timeInMinutes > 0 ? Math.round(words / timeInMinutes) : 0;
  };

  const calculateWordCount = (text) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  const calculateAccuracy = (original, typed) => {
    let correctChars = 0;
    const minLength = Math.min(original.length, typed.length);

    for (let i = 0; i < minLength; i++) {
      if (original[i] === typed[i]) {
        correctChars++;
      }
    }
    return minLength > 0 ? Math.round((correctChars / minLength) * 100) : 0;
  };
  useEffect(() => {
    if (typingStarted && startTime && isRunning && !showCompletionModal) {
      wpmIntervalRef.current = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeElapsedInMinutes = (currentTime - startTime) / 60000;

        const wpm = calculateWPM(typedText, timeElapsedInMinutes);
        const wordCount = calculateWordCount(typedText);

        setTypingState(prev => ({
          ...prev,
          currentWPM: wpm,
          wordsTyped: wordCount
        }));
      }, 1000);
    } else {
      if (wpmIntervalRef.current) {
        clearInterval(wpmIntervalRef.current);
        wpmIntervalRef.current = null;
      }
    }

    return () => {
      if (wpmIntervalRef.current) {
        clearInterval(wpmIntervalRef.current);
        wpmIntervalRef.current = null;
      }
    };
  }, [typingStarted, startTime, typedText, isRunning, showCompletionModal]);

  const keyboardRows = [
    ["Esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"],
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
    ["ShiftLeft", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "ShiftRight"],
    ["CtrlLeft", "Win", "AltLeft", "Space", "AltRight", "CtrlRight"],
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      setTypingState(prev => ({ ...prev, activeKey: e.code }));

      if (!isRunning || !paragraph || showCompletionModal) return;

      const expectedChar = paragraph[cursorIndex];
      let pressedChar = e.key;

      setTypingState(prev => {
        const newState = { ...prev };

        if (!newState.typingStarted && pressedChar.length === 1) {
          newState.typingStarted = true;
          newState.startTime = new Date().getTime();
        }
        if (pressedChar.length === 1) {
          if (newState.cursorIndex < newState.paragraph.length) {
            newState.typedText += pressedChar;
            newState.cursorIndex += 1;
            newState.wordsTyped = calculateWordCount(newState.typedText);
          }
        }
        else if (pressedChar === " ") {
          if (newState.cursorIndex < newState.paragraph.length) {
            newState.typedText += " ";
            newState.cursorIndex += 1;
            newState.wordsTyped = calculateWordCount(newState.typedText);
          }
        }
        else if (pressedChar === "Backspace") {
          e.preventDefault();
          if (newState.cursorIndex > 0) {
            newState.typedText = newState.typedText.slice(0, -1);
            newState.cursorIndex -= 1;
            newState.wordsTyped = calculateWordCount(newState.typedText);
          }
        }
        return newState;
      });
    };
    const handleKeyUp = () => {
      setTypingState(prev => ({ ...prev, activeKey: null }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isRunning, paragraph, cursorIndex, showCompletionModal]);

  const handleClick = (key) => {
    setTypingState(prev => ({ ...prev, activeKey: key }));
    setTimeout(() => {
      setTypingState(prev => ({ ...prev, activeKey: null }));
    }, 200);
  };

  const closeModal = () => {
    // ✅ Directly save to localStorage
    if (completionData) {
      const savedRecords = localStorage.getItem("typingTestRecords") || "[]";
      const records = JSON.parse(savedRecords);

      const newRecord = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        timeTaken: completionData.timeTaken,
        wordsTyped: completionData.wordsTyped,
        totalWords: completionData.totalWordsInParagraph,
        remainingWords: completionData.remainingWords,
        wpm: completionData.wpm,
        accuracy: completionData.accuracy,
        isTimeUp: completionData.isTimeUp || false,
      };

      const updatedRecords = [newRecord, ...records].slice(0, 50);
      localStorage.setItem("typingTestRecords", JSON.stringify(updatedRecords));
    }

    setTypingState(prev => ({
      ...prev,
      showCompletionModal: false,
      completionData: null
    }));

    if (closeTimeUpModal) {
      closeTimeUpModal();
    }
  };

  const isKeyActive = (key) => {
    if (activeKey === key) return true;

    const keyMappings = {
      ...Object.fromEntries(
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(char => [char, `Key${char}`])
      ),
      ...Object.fromEntries(
        '1234567890'.split('').map(num => [num, `Digit${num}`])
      ),
      ...Object.fromEntries(
        Array.from({ length: 12 }, (_, i) => [`F${i + 1}`, `F${i + 1}`])
      ),
      'Esc': 'Escape',
      '`': 'Backquote',
      '-': 'Minus',
      '=': 'Equal',
      'Backspace': 'Backspace',
      'Tab': 'Tab',
      '[': 'BracketLeft',
      ']': 'BracketRight',
      '\\': 'Backslash',
      'Caps': 'CapsLock',
      ';': 'Semicolon',
      "'": 'Quote',
      'Enter': 'Enter',
      'ShiftLeft': 'ShiftLeft',
      'ShiftRight': 'ShiftRight',
      'Z': 'KeyZ',
      'X': 'KeyX',
      'C': 'KeyC',
      'V': 'KeyV',
      'B': 'KeyB',
      'N': 'KeyN',
      'M': 'KeyM',
      ',': 'Comma',
      '.': 'Period',
      '/': 'Slash',
      'CtrlLeft': 'ControlLeft',
      'Win': 'MetaLeft',
      'AltLeft': 'AltLeft',
      'Space': 'Space',
      'AltRight': 'AltRight',
      'CtrlRight': 'ControlRight'
    };

    return activeKey === keyMappings[key];
  };

  const renderHighlightedText = () => {
    return paragraph.split("").map((char, index) => {
      const typedChar = typedText[index];
      let colorClass = "text-gray-400";

      if (typedChar !== undefined) {
        if (typedChar === char) {
          colorClass = "text-green-600 font-semibold";
        } else {
          colorClass = "text-red-600 font-semibold";
        }
      }

      const isCursor = index === cursorIndex && typingStarted;

      return (
        <span
          key={index}
          className={`${colorClass} ${isCursor ? "border-r-2 border-blue-500 bg-blue-100 animate-pulse" : ""}`}
        >
          {char}
        </span>
      );
    });
  };



  const handleClose = () => {
    setOpen(false);
    if (closeModal) closeModal();
  };

  return (
    <>
      {showCompletionModal && completionData && (

        <Modal open={showCompletionModal} onClose={closeModal} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
          <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 402,
            height: 430,
            boxShadow: 24,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
          }}

          >
            <ResultModel handleClose={handleClose} completionData={completionData} remainingWords={completionData.remainingWords} accuracy={completionData.accuracy} wpm={completionData.wpm} totalWordsInParagraph={completionData.totalWordsInParagraph} wordsTyped={completionData.wordsTyped} timeTaken={completionData.timeTaken} />
          </Box>
        </Modal>
      )}


      <div className=" flex items-center justify-center text-center mt-6 px-4 md:h-20">
        {selectedTime ? (
          <div className="max-w-2xl mx-auto   leading-relaxed">

            <p className="text-gray-900 text-lg sm:text-base md:text-lg bg-gray-50 p-4 rounded-lg border">
              {renderHighlightedText()}
            </p>

            {typingStarted && (
              <div className="mt-2 text-sm text-gray-600">
                Progress: {cursorIndex}/{paragraph.length} characters • {wordsTyped} words
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 italic">Select time and start typing...</p>
        )}
      </div>

      <div className="flex items-center justify-center text-white w-full mt-9">
        <div className="bg-gray-300 shadow-lg shadow-gray-500 w-full rounded-lg max-w-[900px] xl:p-1 lg:p-1 md:p-2 sm:p-2">
          {keyboardRows.map((row, i) => (
            <div key={i} className="flex justify-center flex-wrap gap-1 my-1">
              {row.map((key, j) => {
                const keyStyles = {
                  Backspace: "w-[18%] sm:w-[20%] md:w-[16%] lg:w-[12%]",
                  Tab: "w-[14%] sm:w-[16%] md:w-[12%] lg:w-[14%]",
                  Caps: "w-[16%] sm:w-[18%] md:w-[14%] lg:w-[10%]",
                  Enter: "w-[18%] sm:w-[20%] md:w-[14%] lg:w-[10%]",
                  ShiftLeft: "w-[22%] sm:w-[22%] md:w-[18%] lg:w-[12%]",
                  ShiftRight: "w-[22%] sm:w-[22%] md:w-[18%] lg:w-[12%]",
                  Space: "w-[35%] sm:w-[60%] md:w-[45%] lg:w-[37%]",
                  CtrlLeft: "w-[10%]",
                  CtrlRight: "w-[10%]",
                  AltLeft: "w-[10%]",
                  AltRight: "w-[10%]",
                  Win: "w-[10%]",
                };

                const displayKey = key.replace("Left", "").replace("Right", "");
                const isActive = isKeyActive(key);

                return (
                  <button
                    key={`${key}-${j}`}
                    onClick={() => handleClick(key)}
                    className={`
                      bg-gray-700 
                      hover:bg-gray-600 
                      transition-all 
                      text-white 
                      font-semibold 
                      py-1 
                      rounded 
                      shadow-md 
                      text-xs sm:text-sm
                      ${keyStyles[key] || "w-[4%] sm:w-[5%] md:w-[5%] lg:w-[5%]"}
                      ${isActive ? "animate-press bg-yellow-600 scale-95" : ""}
                    `}
                  >
                    {displayKey}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes press {
          0% { transform: scale(1); background-color: #374151; }
          50% { transform: scale(0.95); background-color: #d97706; }
          100% { transform: scale(1); background-color: #374151; }
        }
        .animate-press {
          animation: press 0.2s ease-in-out;
        }
      `}</style>
    </>
  );
}

export let completionData = null;