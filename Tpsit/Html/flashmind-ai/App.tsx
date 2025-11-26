import React, { useState } from 'react';
import { extractTextFromPDF } from './services/pdfService';
import { generateFlashcards } from './services/geminiService';
import { Flashcard, AppState } from './types';
import FileUpload from './components/FileUpload';
import ProcessingState from './components/ProcessingState';
import FlashcardDeck from './components/FlashcardDeck';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.UPLOAD);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    try {
      setErrorMessage(null);
      setAppState(AppState.PROCESSING);
      
      setStatusMessage('Estrazione testo dal PDF...');
      const text = await extractTextFromPDF(file);
      
      setStatusMessage('Generazione flashcard con AI...');
      const cards = await generateFlashcards(text);
      
      setFlashcards(cards);
      setAppState(AppState.STUDY);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || "Si è verificato un errore imprevisto.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAppState(AppState.UPLOAD);
    setFlashcards([]);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-indigo-500/30">
      {/* Background elements */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-secondary/20 rounded-full blur-[128px]"></div>
      </div>

      {/* Header */}
      <header className="py-6 px-6 md:px-12 flex justify-between items-center backdrop-blur-sm sticky top-0 z-50 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
            FM
          </div>
          <h1 className="text-xl font-bold tracking-tight">FlashMind AI</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          
          {appState === AppState.UPLOAD && (
            <motion.div 
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                  Trasforma i tuoi PDF in <br/> Flashcard Intelligenti
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  Carica i tuoi appunti o libri di testo. La nostra AI analizza il contenuto e crea istantaneamente schede di studio pronte per l'uso.
                </p>
              </div>
              <FileUpload onFileSelect={handleFileSelect} />
            </motion.div>
          )}

          {appState === AppState.PROCESSING && (
            <motion.div 
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProcessingState status={statusMessage} />
            </motion.div>
          )}

          {appState === AppState.STUDY && (
            <motion.div 
              key="study"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full"
            >
              <FlashcardDeck flashcards={flashcards} onReset={handleReset} />
            </motion.div>
          )}

          {appState === AppState.ERROR && (
            <motion.div 
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center bg-red-500/10 border border-red-500/20 p-8 rounded-2xl max-w-md"
            >
              <div className="text-red-400 text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-white mb-2">Qualcosa è andato storto</h3>
              <p className="text-gray-300 mb-6">{errorMessage}</p>
              <button 
                onClick={handleReset}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
              >
                Riprova
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;