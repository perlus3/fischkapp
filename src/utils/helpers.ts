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

export const editAndRemoveCard = (
  id: number,
  updatedFlashCard: FlashCard,
  editFlashCard: (id: number, updatedFlashCard: FlashCard) => void,
  goBack: (() => void) | undefined,
) => {
  try {
    if (updatedFlashCard.flashCardTitle && updatedFlashCard.flashCardValue) {
      editFlashCard(id, updatedFlashCard);
    }
  } catch (e) {
    console.log(e);
  } finally {
    if (goBack) {
      goBack();
    }
  }
};
