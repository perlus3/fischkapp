import React, { useState } from 'react';

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

  const saveNewFlashCardToDb = async (newFlashCard: FlashCard) => {
    const url = 'https://training.nerdbord.io/api/v1/fischkapp/flashcards';
    const token = 'secret_token';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          front: newFlashCard.flashCardTitle,
          back: newFlashCard.flashCardValue,
        }),
      });

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Wystąpił błąd:', error);
    }
  };

  console.log(flashcards);

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
    }
  };

  return (
    <AppLayout>
      <AppHeader
        saveNewFlashCardToDb={saveNewFlashCardToDb}
        saveNewCard={addFlashCard}
      />
      <CardsList
        flashCards={flashcards}
        editFlashCard={editFlashCard}
        removeFlashCard={(id: number) => deleteCard(id)}
      />
    </AppLayout>
  );
}

export default App;
