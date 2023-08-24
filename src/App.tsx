import React, { useEffect, useState } from 'react';

import { AppHeader } from './components/header/AppHeader.tsx';
import { AppLayout } from './components/layout/AppLayout.tsx';
import { CardsList } from './components/cards/CardsList.tsx';

import './App.css';

export interface FlashCard {
  id: number;
  flashCardTitle?: string;
  flashCardValue?: string;
}

function App() {
  const [flashcards, setFlashCards] = useState<FlashCard[]>([]);

  const addFlashCard = (newFlashCard: FlashCard) => {
    setFlashCards((prevFlashCards) => [...prevFlashCards, newFlashCard]);
  };

  const editFlashCard = (id: number, updatedFlashCard: FlashCard) => {
    setFlashCards((prevFlashCards) =>
      prevFlashCards.map((card) => {
        if (card.id === id) {
          return { ...card, ...updatedFlashCard };
        }
        return card;
      }),
    );
  };

  const deleteCard = (id: number) => {
    try {
      setFlashCards((prevFlashCards) =>
        prevFlashCards.filter((card) => card.id !== id),
      );
    } catch (e) {
      console.log(e);
    } finally {
      // setIsDeleted(true);
    }
  };

  useEffect(() => {
    console.log('flashCards', flashcards);
  }, [flashcards]);

  return (
    <AppLayout>
      <AppHeader saveNewCard={addFlashCard} />
      <CardsList
        flashCards={flashcards}
        editFlashCard={editFlashCard}
        removeFlashCard={(id: number) => deleteCard(id)}
      />
    </AppLayout>
  );
}

export default App;
