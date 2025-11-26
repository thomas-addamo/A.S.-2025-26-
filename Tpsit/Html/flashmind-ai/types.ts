export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export enum AppState {
  UPLOAD = 'UPLOAD',
  PROCESSING = 'PROCESSING',
  STUDY = 'STUDY',
  ERROR = 'ERROR'
}

export interface ProcessingStatus {
  step: string;
  progress: number;
}