import React from 'react';
import { FlashCard } from '../App.tsx';

export const handleTextareaInput = (
  ref: React.RefObject<HTMLTextAreaElement>,
) => {
  if (ref.current) {
    const { current } = ref;
    current.style.height = `${current.scrollHeight}px`;
  }
};

export const editCard = (
  id: string,
  updatedFlashCard: FlashCard,
  // editFlashCard: (id: string, updatedFlashCard: FlashCard) => void,
  editFlashCardFromDb: (id: string, updatedFlashCard: FlashCard) => void,
  goBack: (() => void) | undefined,
) => {
  try {
    if (updatedFlashCard.front && updatedFlashCard.back) {
      // editFlashCard(id, updatedFlashCard);
      editFlashCardFromDb(id, updatedFlashCard);
    }
  } catch (e) {
    console.log(e);
  } finally {
    if (goBack) {
      goBack();
    }
  }
};
