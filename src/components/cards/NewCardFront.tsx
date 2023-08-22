import React, { useRef, useState } from 'react';

import styles from './NewCards.module.css';
import { EditCardBack, handleTextareaInput } from './EditCardBack.tsx';
import editButton from '../../assets/editButton.png';
import { EditCardFront } from './EditCardFront.tsx';

interface Props {
  closeWindow?: () => void;
}

export const NewCardFront = (props: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [openSecondSide, setOpenSecondSide] = useState(false);
  const [title, setTitle] = useState('');

  const saveTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setTitle(value);
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

  return (
    <>
      {openSecondSide ? (
        <EditCardBack
          title={title}
          goBack={openCardBackSide}
          closeWindow={props.closeWindow}
        />
      ) : (
        <div className={styles.layoutContainer}>
          <div className={styles.container}>
            <div className={styles.inputContainer}>
              <textarea
                ref={textareaRef}
                className={styles.input}
                onInput={() => handleTextareaInput(textareaRef)}
                value={title}
                onChange={saveTitle}
                onKeyDown={handleTextareaKeyDown}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => props.closeWindow?.()}
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
