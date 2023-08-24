import React, { useRef, useState } from 'react';

import deleteButton from '../../assets/deleteButton.png';
import styles from './NewCards.module.css';

import { FlashCard } from '../../App.tsx';
import { editCard, handleTextareaInput } from '../../utils/helpers.ts';

interface Props {
  flashCardTitle?: string;
  flashCardValue?: string;
  goBack?: () => void;
  editFlashCard: (id: number, updatedFlashCard: FlashCard) => void;
  removeFlashCard: (id: number) => void;
  itemId: number;
}
export const EditCardName = ({
  itemId,
  flashCardTitle,
  goBack,
  editFlashCard,
  removeFlashCard,
  flashCardValue,
}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [updatedFlashCard, setUpdatedFlashCard] = useState({
    id: itemId,
    flashCardTitle: flashCardTitle,
    flashCardValue: flashCardValue,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setUpdatedFlashCard((prevFlashCard) => ({
      ...prevFlashCard,
      flashCardTitle: value,
    }));
  };

  const saveEditedFlashCard = () => {
    editCard(itemId, updatedFlashCard, editFlashCard, goBack);
  };

  const handleDeleteClick = (id: number) => {
    try {
      removeFlashCard(id);
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
            <button
              onClick={() => handleDeleteClick(itemId)}
              className={styles.icon}
            >
              <img src={deleteButton} alt="delete button" />
            </button>
          </div>
          <form action="" onSubmit={saveEditedFlashCard}>
            <div className={styles.inputContainer}>
              <textarea
                ref={textareaRef}
                className={styles.input}
                onInput={() => handleTextareaInput(textareaRef)}
                placeholder={flashCardTitle}
                onChange={handleInputChange}
                onKeyDown={handleTextareaKeyDown}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => goBack?.()}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button type="submit" className={styles.nextButton}>
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
