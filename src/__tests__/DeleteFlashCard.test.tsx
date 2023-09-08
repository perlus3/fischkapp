import { Flashcard } from '../App.tsx';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { EditCardName } from '../components/cards/EditCardName.tsx';
import { SingleFlashCard } from '../components/cards/SingleFlashCard.tsx';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
  rest.get(
    'https://training.nerdbord.io/api/v1/fischkapp/flashcards',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          { _id: '1', front: 'front1', back: 'back1' },
          { _id: '2', front: 'front2', back: 'back2' },
          { _id: '3', front: 'front3', back: 'back3' },
        ]),
      );
    },
  ),
  rest.delete(
    'https://training.nerdbord.io/api/v1/fischkapp/flashcards/:id',
    (req, res, ctx) => {
      const mockCards = [
        { _id: '1', front: 'front1', back: 'back1' },
        { _id: '2', front: 'front2', back: 'back2' },
        { _id: '3', front: 'front3', back: 'back3' },
      ];
      const { id } = req.params;
      const filteredCards = mockCards.filter((card) => card._id !== id);

      return res(ctx.status(200), ctx.json(filteredCards));
    },
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
describe('Delete flashcard', () => {
  it('should delete flashcard from the list when clicking on Trash icon', async () => {
    let isDeleted = false;
    const handleDelete = () => {
      isDeleted = true;
    };
    const cardExample: Flashcard = { _id: '1', front: 'front', back: 'back' };
    const { getByTestId } = render(
      <EditCardName
        itemId={cardExample._id}
        flashCardTitle={cardExample.front}
        flashCardValue={cardExample.back}
        deleteFlashCard={handleDelete}
        editFlashCard={jest.fn()}
        goBack={jest.fn()}
      />,
    );
    const deleteButton = getByTestId('deleteButton');

    fireEvent.click(deleteButton);

    expect(isDeleted).toBe(true);
  });
  it('should delete flashcard from the list when clicking on trash icon', async () => {
    const cardExample: Flashcard = { _id: '1', front: 'front', back: 'back' };
    const { getByTestId, queryByTestId } = render(
      <SingleFlashCard
        itemId={cardExample._id}
        flashCardTitle={cardExample.front}
        flashCardValue={cardExample.back}
        deleteFlashCard={jest.fn()}
        editFlashCard={jest.fn()}
      />,
    );
    const frontEditButton = getByTestId('frontEditButton');

    fireEvent.click(frontEditButton);

    await waitFor(() => {
      const deleteButton = getByTestId('deleteButton');
      fireEvent.click(deleteButton);
    });
    await waitFor(() => {
      const deletedCard = queryByTestId('newlyAddedCard');
      expect(deletedCard).toBeNull();
    });
  });
});
