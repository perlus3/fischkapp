import React from 'react';
import styles from './AppHeader.module.css';
import logo from '../../assets/logo.png';

interface Props {
  carsNumber: number;
  openAddingNewCard?: () => void;
}

export const AppHeader = ({ openAddingNewCard, carsNumber }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" />
        <span>Cards: {carsNumber}</span>
      </div>
      <div className={styles.buttonContainer}>
        <button data-testid="addNewFlashCard" onClick={openAddingNewCard}>
          +
        </button>
      </div>
    </header>
  );
};
