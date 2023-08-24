import React, { useEffect, useState } from 'react';

import editButton from '../../assets/editButton.png';
import styles from './SingleCard.module.css';
import { EditCardName } from './EditCardName.tsx';
import { FlashCard } from '../../App.tsx';

interface Props {
  itemId: number;
  flashCardTitle?: string;
  flashCardValue?: string;
  editFlashCard: (id: number, updatedFlashCard: FlashCard) => void;
  removeFlashCard: (id: number) => void;
}

export const FrontCard = ({
  itemId,
  flashCardTitle,
  editFlashCard,
  removeFlashCard,
  flashCardValue,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  useEffect(() => {
    if (flashCardTitle) {
      console.log(flashCardTitle);
    }
  }, [isEditing]);

  return (
    <>
      {isEditing ? (
        <EditCardName
          itemId={itemId}
          flashCardValue={flashCardValue}
          removeFlashCard={(id: number) => removeFlashCard(id)}
          editFlashCard={editFlashCard}
          flashCardTitle={flashCardTitle}
          goBack={handleEditClick}
        />
      ) : (
        <div className={styles.card}>
          <div className={styles.text}>
            <p>{flashCardTitle}</p>
          </div>
          <button onClick={() => handleEditClick()} className={styles.icon}>
            <img src={editButton} alt="edit-button" />
          </button>
        </div>
      )}
    </>
  );
};
