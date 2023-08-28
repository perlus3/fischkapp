import React, { useState } from 'react';
import styles from './AppHeader.module.css';
import logo from '../../assets/logo.png';
import { NewCard } from '../cards/NewCard.tsx';
import { FlashCard } from '../../App.tsx';

interface Props {
  saveNewCard: (newFlashCard: FlashCard) => void;
  saveNewFlashCardToDb: (newFlashCard: FlashCard) => void;
}

export const AppHeader = ({ saveNewCard, saveNewFlashCardToDb }: Props) => {
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
          saveNewFlashCardToDb={saveNewFlashCardToDb}
          saveNewCard={saveNewCard}
          closeWindow={openAddingNewCard}
        />
      ) : null}
    </>
  );
};
