import React, { useRef } from 'react';

import deleteButton from '../../assets/deleteButton.png';
import styles from './NewCards.module.css';
import { handleTextareaInput } from './EditCardBack.tsx';

export const EditCardFront = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className={styles.container}>
      <div className={styles.textAndButtonContainer}>
        <div className={styles.icon}>
          <img src={deleteButton} alt="delete button" />
        </div>
      </div>
      <div className={styles.inputContainer}>
        <textarea
          ref={textareaRef}
          className={styles.input}
          onInput={() => handleTextareaInput(textareaRef)}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.cancelButton}>Cancel</button>
        <button className={styles.nextButton}>Save</button>
      </div>
    </div>
  );
};
