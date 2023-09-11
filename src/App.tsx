import React, { useEffect, useState } from 'react';

import { AppHeader } from './components/header/AppHeader.tsx';
import { AppLayout } from './components/layout/AppLayout.tsx';
import { CardsList } from './components/cards/CardsList.tsx';

import './App.css';
import { NewCard } from './components/cards/NewCard.tsx';
import {
  addNewFlashcard,
  deleteFlashcard,
  fetchFlashcards,
  updateFlashcard,
} from './api/fetchApi.ts';

export interface Flashcard {
  _id: string;
  front?: string;
  back?: string;
}

function App() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [shouldFetchData, setShouldFetchData] = useState<boolean>(false);
  const [isAddingNewCardWindowOpen, setIsAddingNewCardWindowOpen] =
    useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchFlashcards();
        setFlashcards(data.reverse());
      } catch (error) {
        console.error('Wystąpił błąd:', error);
      }
    })();
  }, [shouldFetchData]);

  const saveNewFlashCard = async (newFlashCard: Flashcard) => {
    try {
      const data = await addNewFlashcard(newFlashCard);

      if (data) {
        setFlashcards((prevFlashCards) => [...prevFlashCards, newFlashCard]);
        setShouldFetchData((prevState) => !prevState);
      }
    } catch (e) {
      console.error('Error while adding new flashcard', e);
      throw e;
    }
  };
  const editFlashcard = async (id: string, updatedFlashcard: Flashcard) => {
    try {
      const data = await updateFlashcard(id, updatedFlashcard);
      if (data) {
        setShouldFetchData((prevState) => !prevState);
      }
    } catch (e) {
      console.error('Error while edit fish card:', e);
      throw e;
    }
  };

  const removeFlashcard = async (id: string) => {
    try {
      await deleteFlashcard(id);
      setShouldFetchData((prevState) => !prevState);
    } catch (e) {
      console.error('Wystąpił błąd:', e);
      throw e;
    }
  };

  const openAddingNewCard = () => {
    setIsAddingNewCardWindowOpen((prevState: any) => !prevState);
  };

  return (
    <AppLayout>
      <AppHeader
        openAddingNewCard={openAddingNewCard}
        carsNumber={flashcards.length}
      />
      {isAddingNewCardWindowOpen ? (
        <NewCard
          saveNewFlashCard={saveNewFlashCard}
          closeWindow={openAddingNewCard}
        />
      ) : (
        <CardsList
          flashCards={flashcards}
          editFlashCard={editFlashcard}
          deleteFlashCard={(id: string) => removeFlashcard(id)}
        />
      )}
    </AppLayout>
  );
}

export default App;
