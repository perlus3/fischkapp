import React, { useState } from 'react';
import styles from './AppHeader.module.css';
import logo from '../assets/logo.png';

export const AppHeader = () => {
  const [cards, setCards] = useState<number>(0);

  const cardsNumberHandler = () => {
    setCards((prev) => prev + 1);
  };
  return (
    <>
      <header className={styles.header}>
        <img src={logo} alt="Logo" />
        <span>Cards: {cards}</span>
        <button onClick={cardsNumberHandler}>+</button>
      </header>
    </>
  );
};
