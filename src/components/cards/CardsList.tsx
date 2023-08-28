import React from 'react';

import styles from './CardsList.module.css';
import { SingleFlashCard } from './SingleFlashCard.tsx';
import { FlashCard } from '../../App.tsx';

interface Props {
  flashCards: FlashCard[];
  editFlashCard: (id: number, updatedFlashCard: FlashCard) => void;
  removeFlashCard: (id: number) => void;
}
export const CardsList = ({
  flashCards,
  editFlashCard,
  removeFlashCard,
}: Props) => {
  return (
    <div className={styles.container}>
      {flashCards?.map((item) => (
        <SingleFlashCard
          key={item.id}
          itemId={item.id}
          flashCardTitle={item.flashCardTitle}
          flashCardValue={item.flashCardValue}
          editFlashCard={editFlashCard}
          removeFlashCard={(id: number) => removeFlashCard(id)}
        />
      ))}
    </div>
  );
};
