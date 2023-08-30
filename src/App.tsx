import React, { useEffect, useState } from 'react';

import { AppHeader } from './components/header/AppHeader.tsx';
import { AppLayout } from './components/layout/AppLayout.tsx';
import { CardsList } from './components/cards/CardsList.tsx';

import './App.css';
import { NewCard } from './components/cards/NewCard.tsx';

export interface FlashCard {
  _id: string;
  front?: string;
  back?: string;
}

function App() {
  const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
  const [shouldFetchData, setShouldFetchData] = useState<boolean>(false);
  const [isAddingNewCardWindowOpen, setIsAddingNewCardWindowOpen] =
    useState(false);

  useEffect(() => {
    (async () => {
      const url = 'https://training.nerdbord.io/api/v1/fischkapp/flashcards';

      try {
        const response = await fetch(url, {
          method: 'GET',
        });
        const data = await response.json();
        setFlashCards(data);

        console.log(data);
      } catch (error) {
        console.error('Wystąpił błąd:', error);
      }
    })();
  }, [shouldFetchData]);

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
      if (responseData.flashcard._id) {
        setFlashCards((prevFlashCards) => [...prevFlashCards, newFlashCard]);
        setShouldFetchData((prevState) => !prevState);
      }
    } catch (error) {
      console.error('Wystąpił błąd:', error);
    }
  };

  const editFlashCardFromDb = async (
    id: string,
    updatedFlashCard: FlashCard,
  ) => {
    const url = `https://training.nerdbord.io/api/v1/fischkapp/flashcards/${id}`;
    const token = 'secret_token';

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: id,
          front: updatedFlashCard.front,
          back: updatedFlashCard.back,
        }),
      });

      const result = await response.json();
      if (!result) {
        console.log('error');
      }
      window.location.reload();
    } catch (error) {
      console.error('Wystąpił błąd:', error);
    }
  };
  // const addFlashCard = (newFlashCard: FlashCard) => {
  //   setFlashCards((prevFlashCards) => [...prevFlashCards, newFlashCard]);
  // };
  //window.location.reload();
  // const editFlashCard = (id: string, updatedFlashCard: FlashCard) => {
  //   setFlashCards((prevFlashCards) =>
  //     prevFlashCards.map((card) => {
  //       if (card._id === id) {
  //         return { ...card, ...updatedFlashCard };
  //       }
  //       return card;
  //     }),
  //   );
  // };
  //
  // const deleteCard = (id: string) => {
  //   try {
  //     setFlashCards((prevFlashCards) =>
  //       prevFlashCards.filter((card) => card._id !== id),
  //     );
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const deleteFlashCardFromDb = async (id: string) => {
    const url = `https://training.nerdbord.io/api/v1/fischkapp/flashcards/${id}`;
    const token = 'secret_token';

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      console.log(result, 'result');
    } catch (error) {
      console.error('Wystąpił błąd:', error);
    }
  };

  const openAddingNewCard = () => {
    setIsAddingNewCardWindowOpen((prevState: any) => !prevState);
  };

  return (
    <AppLayout>
      <AppHeader openAddingNewCard={openAddingNewCard} />
      {isAddingNewCardWindowOpen ? (
        <NewCard
          saveNewFlashCardToDb={saveNewFlashCardToDb}
          // saveNewCard={saveNewCard}
          closeWindow={openAddingNewCard}
        />
      ) : (
        <CardsList
          flashCards={flashCards}
          // editFlashCard={editFlashCard}
          editFlashCardFromDb={editFlashCardFromDb}
          // removeFlashCard={(id: string) => deleteCard(id)}
          deleteFlashCardFromDb={(id: string) => deleteFlashCardFromDb(id)}
        />
      )}
    </AppLayout>
  );
}

export default App;
