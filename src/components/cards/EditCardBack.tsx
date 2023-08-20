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

  const checkValueExists = (valueToCheck: string) => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        if (value === valueToCheck) {
          return true;
        }
      }
    }
    return false;
  };

  const saveDataToLocalStorage = () => {
    try {
      const secondTitleExists = checkValueExists(secondSideTitle);
      if (!secondTitleExists) {
        const itemInLocalStorage = localStorage.getItem(`${props.title}`);
        if (itemInLocalStorage) {
          console.log('wybrany element istnieje:', itemInLocalStorage);
        }

        if (props.title !== '' || secondSideTitle !== '') {
          localStorage.setItem(`${props.title}`, secondSideTitle);
        }
        console.log('title or secondSideTitle is empty');
      }
      console.log(`${secondSideTitle} istnieje w localstorage`);
    } catch (e) {
      console.log(e);
    } finally {
      props.closeWindow();
    }
  };

  const deleteDataFromLocalStorage = () => {
    try {
      localStorage.removeItem(`${props.title}`);
    } catch (e) {
      console.log(e);
    } finally {
      props.closeWindow();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.textAndButtonContainer}>
        <div className={styles.caption}>{props.title}</div>
        <button onClick={deleteDataFromLocalStorage} className={styles.icon}>
          <img src={deleteButton} alt="delete button" />
        </button>
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
