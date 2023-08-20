import React, { useState } from 'react';
import styles from './AppHeader.module.css';
import logo from '../../assets/logo.png';
import { NewCardFront } from '../cards/NewCardFront.tsx';

export const AppHeader = () => {
  const [isAddingNewCardWindowOpen, setIsAddingNewCardWindowOpen] =
    useState(false);

  const openAddingNewCard = () => {
    setIsAddingNewCardWindowOpen((prevState) => !prevState);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" />
          <span>Cards: 0</span>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={() => openAddingNewCard()}>+</button>
        </div>
      </header>
      {isAddingNewCardWindowOpen ? (
        <NewCardFront closeWindow={openAddingNewCard} />
      ) : null}
    </>
  );
};
