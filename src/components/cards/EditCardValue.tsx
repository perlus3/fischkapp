import React, { useRef, useState } from 'react';

import deleteButton from '../../assets/deleteButton.png';
import styles from './NewCards.module.css';
import { Flashcard } from '../../App.tsx';
import { editCard, handleTextareaInput } from '../../utils/helpers.ts';

interface Props {
  flashCardValue?: string;
  flashCardTitle?: string;
  goBack?: () => void;
  closeWindow?: () => void;
  editFlashCard?: (id: string, updatedFlashCard: Flashcard) => void;
  deleteFlashCard?: (id: string) => void;
  itemId: string;
}

export const EditCardValue = ({
  flashCardValue,
  flashCardTitle,
  goBack,
  editFlashCard,
  itemId,
  deleteFlashCard,
}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [updatedFlashcard, setUpdatedFlashcard] = useState<Flashcard>({
    _id: itemId,
    front: flashCardTitle,
    back: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    const { value } = e.target;
    setUpdatedFlashcard((prevFlashCard) => ({
      ...prevFlashCard,
      back: value,
    }));
  };

  const saveEditedFlashCard = () => {
    if (editFlashCard) {
      editCard(itemId, updatedFlashcard, editFlashCard, goBack);
    }
  };

  const handleDeleteClick = (id: string) => {
    try {
      if (deleteFlashCard) {
        deleteFlashCard(id);
      }
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
      e.preventDefault();

      saveEditedFlashCard();
    }
  };

  return (
    <>
      {isDeleted ? null : (
        <div className={styles.addNewCardContainer}>
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
              data-testid="editBackInput"
              ref={textareaRef}
              className={styles.input}
              onInput={() => handleTextareaInput(textareaRef)}
              onChange={handleInputChange}
              onKeyDown={handleTextareaKeyDown}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button
              data-testid="backButton"
              onClick={() => goBack?.()}
              className={styles.cancelButton}
            >
              Back
            </button>
            <button
              data-testid="saveBackButton"
              onClick={() => saveEditedFlashCard()}
              className={styles.nextButton}
              disabled={!updatedFlashcard.back}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};
