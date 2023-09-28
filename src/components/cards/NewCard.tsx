import React, { useEffect, useRef, useState } from 'react';

import styles from './NewCards.module.css';
import { Flashcard } from '../../App.tsx';
import deleteButton from '../../assets/deleteButton.png';
import { handleTextareaInput } from '../../utils/helpers.ts';

interface Props {
  closeWindow?: () => void;
  saveNewFlashCard?: (newFlashCard: Flashcard) => void;
}

export const NewCard = ({ closeWindow, saveNewFlashCard }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaRefSecond = useRef<HTMLTextAreaElement>(null);
  const [openSecondSide, setOpenSecondSide] = useState(false);
  const [inputHeight, setInputHeight] = useState<number>(0);
  const [flashCard, setFlashCard] = useState({
    _id: '',
    name: '',
    value: '',
  });

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = `${textarea.scrollHeight}px`;
      textareaRef.current.focus();

      setInputHeight(textarea.scrollHeight);
    }
    if (textareaRefSecond.current) {
      const textarea2 = textareaRefSecond.current;
      textarea2.style.height = `${textarea2.scrollHeight}px`;
      textareaRefSecond.current.focus();

      setInputHeight(textarea2.scrollHeight);
    }
  }, [openSecondSide]);

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
      saveCard();
    }
  };

  const saveCard = () => {
    try {
      const newFlashCard: Flashcard = {
        _id: '',
        front: flashCard.name,
        back: flashCard.value,
      };
      if (saveNewFlashCard) {
        saveNewFlashCard(newFlashCard);
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
                style={{ height: inputHeight }}
                value={flashCard.value}
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
                onClick={() => saveCard()}
                className={styles.nextButton}
                disabled={!flashCard.value || !flashCard.name}
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
            <div className={styles.textAndButtonContainer}>
              <div className={styles.caption}></div>
            </div>
            <div className={styles.inputContainer}>
              <textarea
                data-testid="frontInput"
                ref={textareaRef}
                className={styles.input}
                value={flashCard.name}
                style={{ height: inputHeight }}
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
