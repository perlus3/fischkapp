import React from 'react';
import styles from './AppHeader.module.css';
import logo from '../assets/logo.png';

export const AppHeader = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" />
          <span>Cards: 0</span>
        </div>
        <div className={styles.buttonContainer}>
          <button>+</button>
        </div>
      </header>
    </>
  );
};
