import React from 'react';
import styles from './AppHeader.module.css';
import logo from '../assets/logo.png';

export const AppHeader = () => {
  return (
    <>
      <header className={styles.header}>
        <img src={logo} alt="Logo" />
        <span>Cards: 0</span>
        <button>+</button>
      </header>
    </>
  );
};
