import React from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/solid';

interface ProcessingStateProps {
  status: string;
}

const ProcessingState: React.FC<ProcessingStateProps> = ({ status }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          rotate: { duration: 4, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity }
        }}
        className="relative"
      >
        <div className="absolute inset-0 bg-secondary blur-xl opacity-50 rounded-full"></div>
        <SparklesIcon className="w-24 h-24 text-white relative z-10" />
      </motion.div>

      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold mt-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
      >
        {status}
      </motion.h2>
      
      <p className="text-gray-400 mt-2">L'AI sta leggendo e sintetizzando il tuo documento...</p>
      
      <div className="w-64 h-2 bg-gray-700 rounded-full mt-8 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default ProcessingState;