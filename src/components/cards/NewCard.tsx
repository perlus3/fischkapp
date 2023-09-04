import React, { useRef, useState } from 'react';

import styles from './NewCards.module.css';
import { Flashcard } from '../../App.tsx';
import deleteButton from '../../assets/deleteButton.png';
import { handleTextareaInput } from '../../utils/helpers.ts';

interface Props {
  closeWindow?: () => void;
  saveNewFlashCardToDb?: (newFlashCard: Flashcard) => void;
}

export const NewCard = ({ closeWindow, saveNewFlashCardToDb }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaRefSecond = useRef<HTMLTextAreaElement>(null);
  const [openSecondSide, setOpenSecondSide] = useState(false);
  const [flashCard, setFlashCard] = useState({
    _id: '',
    name: '',
    value: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    property: string,
  ) => {
    const { value } = e.target;
    setFlashCard((prevFlashCard) => ({
      ...prevFlashCard,
      [property]: value,
    }));
  };

  const openCardBackSide = () => {
    setOpenSecondSide((prevState) => !prevState);
  };

  const handleTextareaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      openCardBackSide();
    }
  };

  const handleTextareaKeyDownForSave = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      saveNewFlashCard();
    }
  };

  const saveNewFlashCard = () => {
    try {
      const newFlashCard: Flashcard = {
        _id: '',
        front: flashCard.name,
        back: flashCard.value,
      };
      if (saveNewFlashCardToDb) {
        saveNewFlashCardToDb(newFlashCard);
      }
    } catch (e) {
      console.log(e);
    } finally {
      closeWindow?.();
    }
  };

  return (
    <>
      {openSecondSide ? (
        <div
          data-testid="addNewCardContainer"
          className={styles.layoutContainer}
        >
          <div className={styles.addNewCardContainer}>
            <div className={styles.textAndButtonContainer}>
              <div className={styles.caption}>{flashCard.name}</div>
              <button onClick={openCardBackSide} className={styles.icon}>
                <img src={deleteButton} alt="delete button" />
              </button>
            </div>
            <div className={styles.inputContainer}>
              <textarea
                data-testid="backInput"
                ref={textareaRefSecond}
                className={styles.input}
                onInput={() => handleTextareaInput(textareaRefSecond)}
                onChange={(e) => handleInputChange(e, 'value')}
                onKeyDown={handleTextareaKeyDownForSave}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button
                onClick={openCardBackSide}
                className={styles.cancelButton}
              >
                Back
              </button>
              <button
                data-testid="saveButton"
                onClick={() => saveNewFlashCard()}
                className={styles.nextButton}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          data-testid="addNewCardContainer"
          className={styles.layoutContainer}
        >
          <div className={styles.addNewCardContainer}>
            <div className={styles.inputContainer}>
              <textarea
                data-testid="frontInput"
                ref={textareaRef}
                className={styles.input}
                onInput={() => handleTextareaInput(textareaRef)}
                onChange={(e) => handleInputChange(e, 'name')}
                onKeyDown={handleTextareaKeyDown}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => closeWindow?.()}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                data-testid="goNext"
                onClick={openCardBackSide}
                className={styles.nextButton}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
