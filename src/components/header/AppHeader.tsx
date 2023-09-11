import React from 'react';
import styles from './AppHeader.module.css';
import logo from '../../assets/logo.png';
import addButton from '../../assets/addButton.png';

interface Props {
  carsNumber: number;
  openAddingNewCard?: () => void;
}

export const AppHeader = ({ openAddingNewCard, carsNumber }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <span>Cards: {carsNumber}</span>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.addButton}
          data-testid="addNewFlashCard"
          onClick={openAddingNewCard}
        >
          <img src={addButton} alt="addButton" />
        </button>
      </div>
    </header>
  );
};
