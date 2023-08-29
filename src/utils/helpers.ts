import React from 'react';
import { FlashCard } from '../App.tsx';

/* metoda używane w kilku miejscach przeniesione do helpersów żeby nie duplikować kodu
 */

export const handleTextareaInput = (
  ref: React.RefObject<HTMLTextAreaElement>,
) => {
  if (ref.current) {
    const { current } = ref;
    current.style.height = `${current.scrollHeight}px`;
  }
};

export const editCard = (
  id: number,
  updatedFlashCard: FlashCard,
  editFlashCard: (id: number, updatedFlashCard: FlashCard) => void,
  editFlashCardFromDb: (id: number, updatedFlashCard: FlashCard) => void,
  goBack: (() => void) | undefined,
) => {
  try {
    if (updatedFlashCard.flashCardTitle && updatedFlashCard.flashCardValue) {
      editFlashCard(id, updatedFlashCard);
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
