import React from 'react';

import styles from './CardsList.module.css';
import { SingleCard } from './SingleCard.tsx';
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
  console.log(
    flashCards.map((item) => item.flashCardTitle),
    'flashCardsFromLIST',
  );
  return (
    <div className={styles.container}>
      {flashCards?.map((item) => (
        <SingleCard
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
