import React, { useRef, useState } from 'react';

import deleteButton from '../../assets/deleteButton.png';
import styles from './NewCards.module.css';
import { handleTextareaInput } from './EditCardBack.tsx';

interface Props {
  value?: string;
  goBack?: () => void;
}
export const EditCardFront = (props: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const saveNewTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTitle(e.target.value);
  };

  const handleDeleteClick = () => {
    const item = localStorage.key(0);
    if (item) {
      localStorage.removeItem(item);
      setIsDeleted(true);
    }
  };

  const renameStorageItem = () => {
    try {
      console.log(props.value);
      if (props.value) {
        const storageItemValue = localStorage.getItem(props.value);
        localStorage.removeItem(props.value);
        if (storageItemValue) {
          localStorage.setItem(newTitle, storageItemValue);
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      props.goBack?.();
    }
  };

  const handleTextareaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      renameStorageItem();
    }
  };

  return (
    <>
      {isDeleted ? null : (
        <div className={styles.container}>
          <div className={styles.textAndButtonContainer}>
            <button onClick={() => handleDeleteClick()} className={styles.icon}>
              <img src={deleteButton} alt="delete button" />
            </button>
          </div>
          <div className={styles.inputContainer}>
            <textarea
              ref={textareaRef}
              className={styles.input}
              placeholder={props.value}
              onInput={() => handleTextareaInput(textareaRef)}
              onChange={saveNewTitle}
              onKeyDown={handleTextareaKeyDown}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button
              onClick={() => props.goBack?.()}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button onClick={renameStorageItem} className={styles.nextButton}>
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};
