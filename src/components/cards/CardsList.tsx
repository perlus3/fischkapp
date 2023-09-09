import React from 'react';

import styles from './CardsList.module.css';
import { SingleFlashCard } from './SingleFlashCard.tsx';
import { Flashcard } from '../../App.tsx';

interface Props {
  flashCards: Flashcard[];
  editFlashCard?: (id: string, updatedFlashCard: Flashcard) => void;
  deleteFlashCard?: (id: string) => void;
}
export const CardsList = ({
  flashCards,
  editFlashCard,
  deleteFlashCard,
}: Props) => {
  return (
    <div className={styles.container}>
      {deleteFlashCard &&
        flashCards?.map((item) => (
          <SingleFlashCard
            key={item._id}
            itemId={item._id}
            flashCardTitle={item.front}
            flashCardValue={item.back}
            editFlashCard={editFlashCard}
            deleteFlashCard={(id: string) => deleteFlashCard(id)}
          />
        ))}
    </div>
  );
};
