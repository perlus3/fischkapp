import React, { useState } from 'react';

import { FrontCard } from './FrontCard.tsx';
import { BackCard } from './BackCard.tsx';
import { FlashCard } from '../../App.tsx';

interface Props {
  itemId: number;
  flashCardTitle?: string;
  flashCardValue?: string;
  editFlashCard: (id: number, updatedFlashCard: FlashCard) => void;
  removeFlashCard: (id: number) => void;
}

export const SingleCard = ({
  itemId,
  flashCardTitle,
  flashCardValue,
  editFlashCard,
  removeFlashCard,
}: Props) => {
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  return isAnswerChecked ? (
    <BackCard
      itemId={itemId}
      flashCardTitle={flashCardTitle}
      removeFlashCard={(id: number) => removeFlashCard(id)}
      editFlashCard={editFlashCard}
      flashCardValue={flashCardValue}
    />
  ) : (
    <FrontCard
      itemId={itemId}
      removeFlashCard={(id: number) => removeFlashCard(id)}
      editFlashCard={editFlashCard}
      flashCardTitle={flashCardTitle}
      flashCardValue={flashCardValue}
    />
  );
};
