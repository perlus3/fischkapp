import React, { useEffect, useState } from 'react';

import editButton from '../../assets/editButton.png';
import styles from './SingleCard.module.css';
import { EditCardFront } from './EditCardFront.tsx';
import { EditCardBack } from './EditCardBack.tsx';

export const BackCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState('');

  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  useEffect(() => {
    const storedItem = localStorage.key(0);
    if (storedItem) {
      const storedValue = localStorage.getItem(storedItem);
      if (storedValue) {
        setItem(storedValue);
      }
    }
  }, [isEditing]);

  return (
    <>
      {isEditing ? (
        <EditCardBack title={item} goBack={handleEditClick} />
      ) : (
        <div className={styles.card}>
          <div className={styles.text}>
            <p>{item}</p>
          </div>
          <button onClick={() => handleEditClick()} className={styles.icon}>
            <img src={editButton} alt="edit-button" />
          </button>
        </div>
      )}
    </>
  );
};
