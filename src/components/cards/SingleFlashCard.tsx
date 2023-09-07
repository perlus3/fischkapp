import React, { useEffect, useRef, useState } from 'react';
import styles from './SingleCard.module.css';
import editButton from '../../assets/editButton.png';
import { EditCardName } from './EditCardName.tsx';
import { EditCardValue } from './EditCardValue.tsx';
import { Flashcard } from '../../App.tsx';

interface Props {
  itemId: string;
  flashCardTitle?: string;
  flashCardValue?: string;
  editFlashCard?: (id: string, updatedFlashCard: Flashcard) => void;
  deleteFlashCard?: (id: string) => void;
}

export const SingleFlashCard = ({
  itemId,
  flashCardTitle,
  flashCardValue,
  editFlashCard,
  deleteFlashCard,
}: Props) => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [editFlashCardTitle, setEditFlashCardTitle] = useState(false);
  const [editFlashCardValue, setEditFlashCardValue] = useState(false);
  const [frontCardHeight, setFrontCardHeight] = useState<number>(0);
  const [backCardHeight, setBackCardHeight] = useState<number>(0);
  const cardFrontRef = useRef<HTMLDivElement | null>(null);
  const cardBackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (cardFrontRef.current) {
      const frontCard = cardFrontRef.current;
      const text = frontCard.querySelector('p');

      if (text instanceof HTMLElement) {
        setFrontCardHeight(text.offsetHeight);
      }
    }
  }, [flashCardTitle, itemId]);

  useEffect(() => {
    if (cardBackRef.current) {
      const backCard = cardBackRef.current;
      const text = backCard.querySelector('p');

      if (text instanceof HTMLElement) {
        setBackCardHeight(text.offsetHeight);
      }
    }
  }, [flashCardValue, itemId]);

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
        deleteFlashCard={deleteFlashCard}
        editFlashCard={editFlashCard}
        flashCardTitle={flashCardTitle}
        flashCardValue={flashCardValue}
        goBack={handleEditComplete}
      />
    );
  }

  if (editFlashCardValue) {
    return (
      <EditCardValue
        itemId={itemId}
        deleteFlashCard={deleteFlashCard}
        editFlashCard={editFlashCard}
        flashCardValue={flashCardValue}
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
      style={{
        // height: cardHeight,
        ...(isCardFlipped
          ? { height: backCardHeight }
          : { height: frontCardHeight }),
      }}
    >
      <div className={`${styles.card}`}>
        <div
          ref={cardBackRef}
          className={`${styles.backCard} ${isCardFlipped ? '' : styles.hidden}`}
        >
          <button
            data-testid="backEditButton"
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
          ref={cardFrontRef}
          className={`${styles.frontCard} ${
            isCardFlipped ? styles.hidden : ''
          }`}
        >
          <button
            data-testid="frontEditButton"
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
