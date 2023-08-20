import React from 'react';

import editButton from '../../assets/editButton.png';
import styles from './SingleCard.module.css';

export const SingleCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.text}>
        <p>Fish</p>
      </div>
      <div className={styles.icon}>
        <img src={editButton} alt="edit-button" />
      </div>
    </div>
  );
};
