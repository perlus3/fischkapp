import React from 'react';
import '@testing-library/jest-dom';

import { setupServer } from 'msw/node';
import { createFlashCard } from '../mocks/factory.ts';
import { rest } from 'msw';
import { addNewFlashcard } from '../api/fetchApi.ts';
import { fireEvent, render, waitFor } from '@testing-library/react';
import App from '../App.tsx';

const server = setupServer(
  rest.get(
    'https://training.nerdbord.io/api/v1/fischkapp/flashcards',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
    },
  ),
  rest.post(
    'https://training.nerdbord.io/api/v1/fischkapp/flashcards',
    (req, res, ctx) => {
      const { front, back } = req.body as {
        front: string;
        back: string;
      };
      if (front && back) {
        return res(
          ctx.status(201),
          ctx.json({
            message: 'Card added successfully',
          }),
        );
      } else {
        return res(
          ctx.status(400),
          ctx.json({ error: 'Front and back are required' }),
        );
      }
    },
  ),
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Adding New Flashcard', () => {
  it('should render all windows in adding card flow', async () => {
    const { getByTestId, queryAllByTestId } = render(<App />);

    const addButton = getByTestId('addNewFlashCard');

    fireEvent.click(addButton);

    await waitFor(() => {
      const addFrontInput = getByTestId('frontInput');
      const goNextButton = getByTestId('goNext');
      fireEvent.change(addFrontInput, { target: { value: 'front' } });
      fireEvent.click(goNextButton);
    });

    await waitFor(() => {
      const addBackInput = getByTestId('backInput');
      const saveButton = getByTestId('saveButton');

      fireEvent.change(addBackInput, { target: { value: 'back' } });
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      const newCards = queryAllByTestId('newlyAddedCard');
      expect(newCards.length).toBe(1);
    });
  });
  it('should add new flashcard when front and back values are present', async () => {
    const newFlashCard = createFlashCard({
      front: 'front',
      back: 'back',
    });
    const response = await addNewFlashcard(newFlashCard);

    expect(response).toEqual({ message: 'Card added successfully' });
  });

  it('should not be possible to add a flashcard when front or back card value is empty', async () => {
    const newFlashCard = createFlashCard({
      front: '',
      back: '',
    });

    await expect(addNewFlashcard(newFlashCard)).rejects.toThrow(
      'Front and back are required',
    );
  });

  it('should not be possible to add a flashcard when missing front value', async () => {
    const newFlashCard = createFlashCard({
      front: '',
      back: 'back',
    });

    await expect(addNewFlashcard(newFlashCard)).rejects.toThrow(
      'Front is required',
    );
  });

  it('should not be possible to add a flashcard when missing back value', async () => {
    const newFlashCard = createFlashCard({
      front: 'front',
      back: '',
    });

    await expect(addNewFlashcard(newFlashCard)).rejects.toThrow(
      'Back is required',
    );
  });
});
