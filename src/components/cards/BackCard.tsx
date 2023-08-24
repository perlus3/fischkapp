import React, { useState } from 'react';

import editButton from '../../assets/editButton.png';
import styles from './SingleCard.module.css';
import { EditCardValue } from './EditCardValue.tsx';
import { FlashCard } from '../../App.tsx';

interface Props {
  itemId: number;
  flashCardValue?: string;
  flashCardTitle?: string;
  editFlashCard: (id: number, updatedFlashCard: FlashCard) => void;
  removeFlashCard: (id: number) => void;
}

export const BackCard = ({
  itemId,
  flashCardValue,
  editFlashCard,
  removeFlashCard,
  flashCardTitle,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  return (
    <>
      {isEditing ? (
        <EditCardValue
          itemId={itemId}
          removeFlashCard={(id: number) => removeFlashCard(id)}
          editFlashCard={editFlashCard}
          flashCardValue={flashCardValue}
          flashCardTitle={flashCardTitle}
          goBack={handleEditClick}
        />
      ) : (
        <div className={styles.card}>
          <div className={styles.text}>
            <p>{flashCardValue}</p>
          </div>
          <button onClick={() => handleEditClick()} className={styles.icon}>
            <img src={editButton} alt="edit-button" />
          </button>
        </div>
      )}
    </>
  );
};
