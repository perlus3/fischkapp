import React, { useRef, useState } from 'react';

import deleteButton from '../../assets/deleteButton.png';
import styles from './NewCards.module.css';
import { FlashCard } from '../../App.tsx';
import { editCard, handleTextareaInput } from '../../utils/helpers.ts';

interface Props {
  flashCardValue?: string;
  flashCardTitle?: string;
  goBack?: () => void;
  closeWindow?: () => void;
  editFlashCard: (id: string, updatedFlashCard: FlashCard) => void;
  editFlashCardFromDb: (id: string, updatedFlashCard: FlashCard) => void;
  removeFlashCard: (id: string) => void;
  deleteFlashCardFromDb: (id: string) => void;
  itemId: string;
}

export const EditCardValue = ({
  flashCardValue,
  flashCardTitle,
  goBack,
  editFlashCard,
  editFlashCardFromDb,
  removeFlashCard,
  itemId,
  deleteFlashCardFromDb,
}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [updatedFlashCard, setUpdatedFlashCard] = useState<FlashCard>({
    _id: itemId,
    front: flashCardTitle,
    back: flashCardValue,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setUpdatedFlashCard((prevFlashCard) => ({
      ...prevFlashCard,
      back: value,
    }));
  };

  const saveEditedFlashCard = () => {
    editCard(
      itemId,
      updatedFlashCard,
      editFlashCard,
      editFlashCardFromDb,
      goBack,
    );
  };

  const handleDeleteClick = (id: string) => {
    try {
      removeFlashCard(id);
      deleteFlashCardFromDb(id);
    } catch (e) {
      console.log(e);
    } finally {
      setIsDeleted(true);
    }
  };

  const handleTextareaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      saveEditedFlashCard();
    }
  };

  return (
    <>
      {isDeleted ? null : (
        <div className={styles.container}>
          <div className={styles.textAndButtonContainer}>
            <div className={styles.caption}>{flashCardValue}</div>
            <button
              onClick={() => handleDeleteClick(itemId)}
              className={styles.icon}
            >
              <img src={deleteButton} alt="delete button" />
            </button>
          </div>
          <div className={styles.inputContainer}>
            <textarea
              ref={textareaRef}
              className={styles.input}
              onInput={() => handleTextareaInput(textareaRef)}
              onChange={handleInputChange}
              onKeyDown={handleTextareaKeyDown}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={() => goBack?.()} className={styles.cancelButton}>
              Back
            </button>
            <button
              onClick={() => saveEditedFlashCard()}
              className={styles.nextButton}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};
