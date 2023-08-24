import React, { useState } from 'react';
import styles from './AppHeader.module.css';
import logo from '../../assets/logo.png';
import { NewCard } from '../cards/NewCard.tsx';
import { FlashCard } from '../../App.tsx';

interface Props {
  saveNewCard: (newFlashCard: FlashCard) => void;
  // removeFlashCard: (i: number) => void;
}

export const AppHeader = ({ saveNewCard }: Props) => {
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
        <NewCard
          saveNewCard={saveNewCard}
          closeWindow={openAddingNewCard}
          // removeFlashCard={(id: number) => removeFlashCard(id)}
        />
      ) : null}
    </>
  );
};
