import React, { useRef } from 'react';

import deleteButton from '../../assets/deleteButton.png';
import styles from './NewCards.module.css';

export const handleTextareaInput = (
  ref: React.RefObject<HTMLTextAreaElement>,
) => {
  if (ref.current) {
    const { current } = ref;
    current.style.height = 'auto';
    current.style.height = `${current.scrollHeight}px`;
  }
};

export const EditCardBack = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className={styles.container}>
      <div className={styles.textAndButtonContainer}>
        <div className={styles.caption}>Fish</div>
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
        <button className={styles.cancelButton}>Back</button>
        <button className={styles.nextButton}>Save</button>
      </div>
    </div>
  );
};
