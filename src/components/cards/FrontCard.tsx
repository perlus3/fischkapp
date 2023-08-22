import React, { useEffect, useState } from 'react';

import editButton from '../../assets/editButton.png';
import styles from './SingleCard.module.css';
import { EditCardFront } from './EditCardFront.tsx';

export const FrontCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState('');

  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  useEffect(() => {
    const storedItem = localStorage.key(0);

    if (storedItem) {
      setItem(storedItem);
    }
  }, [isEditing]);

  return (
    <>
      {isEditing ? (
        <EditCardFront value={item} goBack={handleEditClick} />
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
