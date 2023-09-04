import React from 'react';
import styles from './AppHeader.module.css';
import logo from '../../assets/logo.png';

interface Props {
  openAddingNewCard?: () => void;
}

export const AppHeader = ({ openAddingNewCard }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" />
        <span>Cards: 0</span>
      </div>
      <div className={styles.buttonContainer}>
        <button data-testid="addNewFlashCard" onClick={openAddingNewCard}>
          +
        </button>
      </div>
    </header>
  );
};
