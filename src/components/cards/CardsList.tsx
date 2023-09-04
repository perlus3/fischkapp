import React from 'react';

import styles from './CardsList.module.css';
import { SingleFlashCard } from './SingleFlashCard.tsx';
import { Flashcard } from '../../App.tsx';

interface Props {
  flashCards: Flashcard[];
  editFlashCardFromDb?: (id: string, updatedFlashCard: Flashcard) => void;
  deleteFlashCardFromDb?: (id: string) => void;
}
export const CardsList = ({
  flashCards,
  editFlashCardFromDb,
  deleteFlashCardFromDb,
}: Props) => {
  return (
    <div className={styles.container}>
      {deleteFlashCardFromDb &&
        flashCards?.map((item) => (
          <SingleFlashCard
            key={item._id}
            itemId={item._id}
            flashCardTitle={item.front}
            flashCardValue={item.back}
            editFlashCardFromDb={editFlashCardFromDb}
            deleteFlashCardFromDb={(id: string) => deleteFlashCardFromDb(id)}
          />
        ))}
    </div>
  );
};
