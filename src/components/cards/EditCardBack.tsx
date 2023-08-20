import React, { useRef, useState } from 'react';

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

interface Props {
  title: string;
  goBack: () => void;
  closeWindow: () => void;
}

export const EditCardBack = (props: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [secondSideTitle, setSecondSideTitle] = useState('');

  const saveTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSecondSideTitle(e.target.value);
  };

  const saveDataToLocalStorage = () => {
    localStorage.setItem(`${props.title}`, secondSideTitle);
    props.closeWindow();
  };

  console.log(secondSideTitle);

  return (
    <div className={styles.container}>
      <div className={styles.textAndButtonContainer}>
        <div className={styles.caption}>{props.title}</div>
        <div className={styles.icon}>
          <img src={deleteButton} alt="delete button" />
        </div>
      </div>
      <div className={styles.inputContainer}>
        <textarea
          ref={textareaRef}
          className={styles.input}
          onInput={() => handleTextareaInput(textareaRef)}
          onChange={saveTitle}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={() => props.goBack()} className={styles.cancelButton}>
          Back
        </button>
        <button
          onClick={() => saveDataToLocalStorage()}
          className={styles.nextButton}
        >
          Save
        </button>
      </div>
    </div>
  );
};
