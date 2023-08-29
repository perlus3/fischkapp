import React from 'react';

import styles from './CardsList.module.css';
import { SingleFlashCard } from './SingleFlashCard.tsx';
import { FlashCard } from '../../App.tsx';

interface Props {
  flashCards: FlashCard[];
  editFlashCard: (id: string, updatedFlashCard: FlashCard) => void;
  editFlashCardFromDb: (id: string, updatedFlashCard: FlashCard) => void;
  removeFlashCard: (id: string) => void;
  deleteFlashCardFromDb: (id: string) => void;
}
export const CardsList = ({
  flashCards,
  editFlashCard,
  removeFlashCard,
  editFlashCardFromDb,
  deleteFlashCardFromDb,
}: Props) => {
  return (
    <div className={styles.container}>
      {flashCards?.map((item) => (
        <SingleFlashCard
          key={item._id}
          itemId={item._id}
          flashCardTitle={item.front}
          flashCardValue={item.back}
          editFlashCard={editFlashCard}
          editFlashCardFromDb={editFlashCardFromDb}
          removeFlashCard={(id: string) => removeFlashCard(id)}
          deleteFlashCardFromDb={(id: string) => deleteFlashCardFromDb(id)}
        />
      ))}
    </div>
  );
};
