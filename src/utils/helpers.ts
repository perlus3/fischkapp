import React from 'react';
import { Flashcard } from '../App.tsx';

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
  updatedFlashCard: Flashcard,
  editFlashCard: (id: string, updatedFlashCard: Flashcard) => void | undefined,
  goBack: (() => void) | undefined,
) => {
  try {
    if (updatedFlashCard.front && updatedFlashCard.back) {
      if (editFlashCard) {
        editFlashCard(id, updatedFlashCard);
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
    if (goBack) {
      goBack();
    }
  }
};
