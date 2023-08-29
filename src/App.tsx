import React, { useEffect, useState } from 'react';

import { AppHeader } from './components/header/AppHeader.tsx';
import { AppLayout } from './components/layout/AppLayout.tsx';
import { CardsList } from './components/cards/CardsList.tsx';

import './App.css';

export interface FlashCard {
  id: number;
  front?: string;
  back?: string;
}

function App() {
  const [flashcards, setFlashCards] = useState<FlashCard[]>([]);

  useEffect(() => {
    (async () => {
      const url = 'https://training.nerdbord.io/api/v1/fischkapp/flashcards';

      try {
        const response = await fetch(url, {
          method: 'GET',
        });
        const data = await response.json();
        console.log(data);
        setFlashCards(data);
      } catch (error) {
        console.error('Wystąpił błąd:', error);
      }
    })();
  }, []);

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
          front: newFlashCard.front,
          back: newFlashCard.back,
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

  const editFlashCardFromDb = async (
    id: number,
    updatedFlashCard: FlashCard,
  ) => {
    const url = 'https://training.nerdbord.io/api/v1/fischkapp/flashcards';
    const token = 'secret_token';

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          front: updatedFlashCard.front,
          back: updatedFlashCard.back,
        }),
      });

      const result = await response.json();
      console.log(result, 'result');
      console.log('flashCARD EDITED');
    } catch (error) {
      console.error('Wystąpił błąd:', error);
    }
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
        editFlashCardFromDb={editFlashCardFromDb}
        removeFlashCard={(id: number) => deleteCard(id)}
      />
    </AppLayout>
  );
}

export default App;
