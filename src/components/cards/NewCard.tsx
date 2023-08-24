import React, { useRef, useState } from 'react';

import styles from './NewCards.module.css';
import { handleTextareaInput } from './EditCardValue.tsx';
import { FlashCard } from '../../App.tsx';
import deleteButton from '../../assets/deleteButton.png';

interface Props {
  closeWindow?: () => void;
  saveNewCard: (newFlashCard: FlashCard) => void;
}

export const NewCard = ({
  closeWindow,
  saveNewCard, // removeFlashCard,
}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaRefSecond = useRef<HTMLTextAreaElement>(null);
  const [openSecondSide, setOpenSecondSide] = useState(false);
  const [flashCard, setFlashCard] = useState({
    id: Date.now(),
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

  const saveNewFlashCard = () => {
    try {
      const newFlashCard: FlashCard = {
        id: Date.now(),
        flashCardTitle: flashCard.name,
        flashCardValue: flashCard.value,
      };
      saveNewCard(newFlashCard);
    } catch (e) {
      console.log(e);
    } finally {
      closeWindow?.();
    }
  };

  return (
    <>
      {openSecondSide ? (
        <div className={styles.container}>
          <div className={styles.textAndButtonContainer}>
            <div className={styles.caption}>{flashCard.name}</div>
            <button onClick={openCardBackSide} className={styles.icon}>
              <img src={deleteButton} alt="delete button" />
            </button>
          </div>
          <div className={styles.inputContainer}>
            <textarea
              ref={textareaRefSecond}
              className={styles.input}
              onInput={() => handleTextareaInput(textareaRefSecond)}
              onChange={(e) => handleInputChange(e, 'value')}
              onKeyDown={handleTextareaKeyDown}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={openCardBackSide} className={styles.cancelButton}>
              Back
            </button>
            <button
              onClick={() => saveNewFlashCard()}
              className={styles.nextButton}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.layoutContainer}>
          <div className={styles.container}>
            <div className={styles.inputContainer}>
              <textarea
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
              <button onClick={openCardBackSide} className={styles.nextButton}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
