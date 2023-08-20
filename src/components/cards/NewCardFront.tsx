import React, { useRef } from 'react';

import styles from './NewCards.module.css';
import { handleTextareaInput } from './EditCardBack.tsx';

export const NewCardFront = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className={styles.layoutContainer}>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <textarea
            ref={textareaRef}
            className={styles.input}
            onInput={() => handleTextareaInput(textareaRef)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton}>Cancel</button>
          <button className={styles.nextButton}>Next</button>
        </div>
      </div>
    </div>
  );
};
