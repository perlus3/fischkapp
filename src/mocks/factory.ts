import { Flashcard } from '../App.tsx';

export const generateId = () => {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 6;

  let shortId = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortId += characters[randomIndex];
  }

  return shortId;
};

export const createFlashCard = (data?: Partial<Flashcard>): Flashcard => {
  return {
    _id: generateId(),
    front: data?.front,
    back: data?.back,
  };
};

export const createManyCards = (amount: number, data?: Partial<Flashcard>) => {
  return [...new Array(amount)].map((card) => {
    return createFlashCard(data);
  });
};
