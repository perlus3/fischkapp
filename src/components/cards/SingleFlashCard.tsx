import React, { useState } from 'react';
import styles from './SingleCard.module.css';
import editButton from '../../assets/editButton.png';
import { EditCardName } from './EditCardName.tsx';
import { EditCardValue } from './EditCardValue.tsx';
import { Flashcard } from '../../App.tsx';

interface Props {
  itemId: string;
  flashCardTitle?: string;
  flashCardValue?: string;
  editFlashCardFromDb?: (id: string, updatedFlashCard: Flashcard) => void;
  deleteFlashCardFromDb?: (id: string) => void;
}

export const SingleFlashCard = ({
  itemId,
  flashCardTitle,
  flashCardValue,
  editFlashCardFromDb,
  deleteFlashCardFromDb,
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
        deleteFlashCardFromDb={deleteFlashCardFromDb}
        editFlashCardFromDb={editFlashCardFromDb}
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
        deleteFlashCardFromDb={deleteFlashCardFromDb}
        editFlashCardFromDb={editFlashCardFromDb}
        flashCardTitle={flashCardTitle}
        goBack={handleEditComplete}
      />
    );
  }
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const target = e.target as HTMLButtonElement;
    if (!target.closest('.edit-button')) {
      setIsCardFlipped(!isCardFlipped);
    }
  };

  return (
    <div
      data-testid="newlyAddedCard"
      onClick={handleCardClick}
      className={`${styles.cardContainer} ${
        isCardFlipped ? styles.cardFlip : ''
      }`}
    >
      <div className={`${styles.card}`}>
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
