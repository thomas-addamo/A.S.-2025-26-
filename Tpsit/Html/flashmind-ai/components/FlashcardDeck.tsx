import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Flashcard } from '../types';

interface FlashcardDeckProps {
  flashcards: Flashcard[];
  onReset: () => void;
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ flashcards, onReset }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setIsFlipped(false);
      setDirection(1);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 200);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setDirection(-1);
      setTimeout(() => setCurrentIndex(prev => prev - 1), 200);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45
    })
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Progress Bar */}
      <div className="w-full flex items-center justify-between mb-6 px-4">
        <span className="text-gray-400 font-mono text-sm">
          {currentIndex + 1} / {flashcards.length}
        </span>
        <div className="flex-1 mx-4 h-1 bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-secondary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <button 
          onClick={onReset}
          className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
        >
          Nuovo File
        </button>
      </div>

      {/* Card Container */}
      <div className="relative w-full h-[400px] perspective-1000 mb-8">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              rotateY: { duration: 0.4 }
            }}
            className="absolute inset-0 w-full h-full cursor-pointer"
            onClick={handleFlip}
          >
            <motion.div
              className="w-full h-full relative transform-style-3d transition-transform duration-500"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
            >
              {/* Front */}
              <div className="absolute inset-0 backface-hidden bg-card border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl">
                <div className="absolute top-6 left-6 text-xs font-bold tracking-widest text-indigo-500 uppercase">
                  Domanda
                </div>
                <h3 className="text-2xl md:text-3xl font-medium text-center leading-relaxed">
                  {currentCard.question}
                </h3>
                <div className="absolute bottom-6 text-gray-500 text-sm flex items-center gap-2">
                  <ArrowPathIcon className="w-4 h-4" /> Clicca per girare
                </div>
              </div>

              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl backdrop-blur-sm">
                 <div className="absolute top-6 left-6 text-xs font-bold tracking-widest text-secondary uppercase">
                  Risposta
                </div>
                <p className="text-xl md:text-2xl text-center leading-relaxed text-gray-100">
                  {currentCard.answer}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`p-4 rounded-full transition-all duration-300 ${
            currentIndex === 0 
              ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
              : 'bg-card hover:bg-gray-700 text-white shadow-lg hover:-translate-y-1'
          }`}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        <button
          onClick={handleFlip}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
        >
          {isFlipped ? 'Mostra Domanda' : 'Mostra Risposta'}
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
          className={`p-4 rounded-full transition-all duration-300 ${
            currentIndex === flashcards.length - 1 
              ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
              : 'bg-card hover:bg-gray-700 text-white shadow-lg hover:-translate-y-1'
          }`}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default FlashcardDeck;