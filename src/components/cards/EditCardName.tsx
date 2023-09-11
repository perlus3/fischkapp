import React, { useEffect, useRef, useState } from 'react';

import deleteButton from '../../assets/deleteButton.png';
import styles from './NewCards.module.css';

import { Flashcard } from '../../App.tsx';
import { editCard, handleTextareaInput } from '../../utils/helpers.ts';

interface Props {
  flashCardTitle?: string;
  flashCardValue?: string;
  goBack?: () => void;
  editFlashCard?: (id: string, updatedFlashCard: Flashcard) => void;
  deleteFlashCard?: (id: string) => void;
  itemId: string;
}
export const EditCardName = ({
  itemId,
  goBack,
  flashCardTitle,
  flashCardValue,
  editFlashCard,
  deleteFlashCard,
}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [inputHeight, setInputHeight] = useState<number>(0);

  const [updatedFlashcard, setUpdatedFlashcard] = useState({
    _id: itemId,
    front: '',
    back: flashCardValue,
  });

  useEffect(() => {
    if (textareaRef.current) {
      const text = textareaRef.current;

      text.style.height = 'auto';
      text.style.height = `${text.scrollHeight}px`;

      setInputHeight(text.scrollHeight);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    const { value } = e.target;
    setUpdatedFlashcard((prevFlashCard) => ({
      ...prevFlashCard,
      front: value,
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
            <button
              data-testid="deleteButton"
              onClick={() => handleDeleteClick(itemId)}
              className={styles.icon}
            >
              <img src={deleteButton} alt="delete button" />
            </button>
          </div>
          <div className={styles.inputContainer}>
            <textarea
              data-testid="editFrontInput"
              ref={textareaRef}
              className={styles.input}
              style={{ height: inputHeight }}
              value={flashCardTitle}
              onInput={() => handleTextareaInput(textareaRef)}
              onChange={handleInputChange}
              onKeyDown={handleTextareaKeyDown}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button
              data-testid="cancelButton"
              onClick={() => goBack?.()}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              data-testid="saveFrontButton"
              onClick={() => saveEditedFlashCard()}
              className={styles.nextButton}
              disabled={!updatedFlashcard.front}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};
