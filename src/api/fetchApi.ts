import { Flashcard } from '../App.tsx';
import axios from 'axios';

export const fetchFlashcards = async (): Promise<Flashcard[]> => {
  try {
    const response = await axios.get(
      'https://training.nerdbord.io/api/v1/fischkapp/flashcards',
    );

    if (response.status !== 200) {
      throw new Error('Failed to get FishCard');
    }
    return response.data;
  } catch (error) {
    console.error('Wystąpił błąd', error);
    throw error;
  }
};

export const addNewFlashcard = async (
  addedFlashcard: Flashcard,
): Promise<Flashcard> => {
  const url: string | undefined =
    'https://training.nerdbord.io/api/v1/fischkapp/flashcards';

  const token = 'secret_token';

  if (!addedFlashcard.front && !addedFlashcard.back) {
    throw new Error('Front and back are required');
  }
  if (!addedFlashcard.front) {
    throw new Error('Front is required');
  }
  if (!addedFlashcard.back) {
    throw new Error('Back is required');
  }

  const response = await axios.post(
    url,
    {
      front: addedFlashcard.front,
      back: addedFlashcard.back,
    },
    {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    },
  );

  if (response.status !== 201) {
    throw new Error('Failed to upload FishCard');
  }

  return response.data;
};

export const updateFlashcard = async (
  id: string,
  updatedFlashCard: Flashcard,
): Promise<any> => {
  const url = 'https://training.nerdbord.io/api/v1/fischkapp/flashcards';
  const token = 'secret_token';

  const response = await axios.patch(
    `${url}/${id}`,
    {
      front: updatedFlashCard.front,
      back: updatedFlashCard.back,
    },
    {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    },
  );
  if (response.status !== 201) {
    throw new Error('Failed to edit flashcard');
  }
  console.log(response.data);
  // updatedFlashcard
  // {acknowledged: true, modifiedCount: 1, upsertedId: null, upsertedCount: 0, matchedCount: 1}
  return response.data;
};
export const deleteFlashcard = async (id: string): Promise<any> => {
  const url = 'https://training.nerdbord.io/api/v1/fischkapp/flashcards';
  const token = 'secret_token';

  const response = await axios.delete(`${url}/${id}`, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to delete FishCard');
  }
  console.log(response.data);
  // message:"Flashcard deleted successfully"
  return response.data;
};
