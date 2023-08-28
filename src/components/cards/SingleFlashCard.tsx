import React, { useState } from 'react';
import styles from './SingleCard.module.css';
import editButton from '../../assets/editButton.png';
import { EditCardName } from './EditCardName.tsx';
import { EditCardValue } from './EditCardValue.tsx';
import { FlashCard } from '../../App.tsx';

interface Props {
  itemId: number;
  flashCardTitle?: string;
  flashCardValue?: string;
  editFlashCard: (id: number, updatedFlashCard: FlashCard) => void;
  removeFlashCard: (id: number) => void;
}

export const SingleFlashCard = ({
  itemId,
  flashCardTitle,
  flashCardValue,
  editFlashCard,
  removeFlashCard,
}: Props) => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [editFlashCardTitle, setEditFlashCardTitle] = useState(false);
  const [editFlashCardValue, setEditFlashCardValue] = useState(false);

  const handleEditFlashCardTitle = () => {
    setEditFlashCardTitle(true);
    setEditFlashCardValue(false);
  };

  const handleEditFlashCardValue = () => {
    setEditFlashCardValue(true);
    setEditFlashCardTitle(false);
  };

  const handleEditComplete = () => {
    setEditFlashCardTitle(false);
    setEditFlashCardValue(false);
  };

  if (editFlashCardTitle) {
    return (
      <EditCardName
        itemId={itemId}
        flashCardValue={flashCardValue}
        removeFlashCard={removeFlashCard}
        editFlashCard={editFlashCard}
        flashCardTitle={flashCardTitle}
        goBack={handleEditComplete}
      />
    );
  }

  if (editFlashCardValue) {
    return (
      <EditCardValue
        itemId={itemId}
        flashCardValue={flashCardValue}
        removeFlashCard={removeFlashCard}
        editFlashCard={editFlashCard}
        flashCardTitle={flashCardTitle}
        goBack={handleEditComplete}
      />
    );
  }
  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (!target.closest('.edit-button')) {
      setIsCardFlipped(!isCardFlipped);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`${styles.card} ${isCardFlipped ? styles.cardFlip : ''}`}
    >
      <div className={`${styles.cardContainer}`}>
        <div
          className={`${styles.backCard} ${isCardFlipped ? '' : styles.hidden}`}
        >
          <button
            onClick={handleEditFlashCardValue}
            className={`${styles.icon} edit-button`}
          >
            <img src={editButton} alt="edit-button" />
          </button>
          <div className={styles.text}>
            <p>{flashCardValue}</p>
          </div>
        </div>
        <div
          className={`${styles.frontCard} ${
            isCardFlipped ? styles.hidden : ''
          }`}
        >
          <button
            onClick={handleEditFlashCardTitle}
            className={`${styles.icon} edit-button`}
          >
            <img src={editButton} alt="edit-button" />
          </button>
          <div className={styles.text}>
            <p>{flashCardTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
