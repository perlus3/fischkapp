import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Flashcard } from '../App.tsx';
import { SingleFlashCard } from '../components/cards/SingleFlashCard.tsx';

import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { updateFlashcard } from '../api/fetchApi.ts';

const server = setupServer(
  rest.patch(
    'https://training.nerdbord.io/api/v1/fischkapp/flashcards/:id',
    (req, res, ctx) => {
      console.log(req.body);
      const { _id, front, back } = req.body as {
        _id: string;
        front: string;
        back: string;
      };
      if (front && back && _id) {
        return res(
          ctx.status(201),
          ctx.json({ _id: '1', front: front, back: back }),
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

describe('Editing flashcard', () => {
  it('should not be possible to edit front side of flashcard by clicking Save button when edited value is empty', async () => {
    const cardExample: Flashcard = { _id: '1', front: 'front', back: 'back' };
    const { getByTestId } = render(
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
      const saveButton = getByTestId('saveFrontButton');
      const editFrontInput = getByTestId('editFrontInput');

      fireEvent.change(editFrontInput, { target: { value: '' } });
      fireEvent.click(saveButton);

      expect((saveButton as HTMLButtonElement).disabled).toBe(true);
    });
  });
  it('should not be possible to edit back side of flashcard by clicking Save button when edited value is empty', async () => {
    const cardExample: Flashcard = { _id: '1', front: 'front', back: 'back' };
    const { getByTestId } = render(
      <SingleFlashCard
        itemId={cardExample._id}
        flashCardTitle={cardExample.front}
        flashCardValue={cardExample.back}
        deleteFlashCard={jest.fn()}
        editFlashCard={jest.fn()}
      />,
    );
    const backEditButton = getByTestId('backEditButton');

    fireEvent.click(backEditButton);

    await waitFor(() => {
      const saveBackButton = getByTestId('saveBackButton');
      const editBackInput = getByTestId('editBackInput');

      fireEvent.change(editBackInput, { target: { value: '' } });
      fireEvent.click(saveBackButton);

      expect((saveBackButton as HTMLButtonElement).disabled).toBe(true);
    });
  });
  it('should be possible to exit back side of editing flashcard by clicking cancel button', async () => {
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
    const backEditButton = getByTestId('backEditButton');

    fireEvent.click(backEditButton);

    await waitFor(() => {
      const backButton = getByTestId('backButton');

      fireEvent.click(backButton);

      expect(backButton as HTMLButtonElement).not.toBe(true);
    });
    const editButton = queryByTestId('backEditButton');
    expect(editButton).not.toBeNull();
  });

  it('should be possible to exit front side of editing flashcard by clicking cancel button', async () => {
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
      const cancelButton = getByTestId('cancelButton');

      fireEvent.click(cancelButton);

      expect(cancelButton as HTMLButtonElement).not.toBe(true);
    });
    const editButton = queryByTestId('frontEditButton');
    expect(editButton).not.toBeNull();
  });
  it('edit method works with correct data', async () => {
    const cardExample: Flashcard = { _id: '1', front: 'front', back: 'back' };
    const editedCardExample = {
      _id: '1',
      front: 'editedfront',
      back: 'editedback',
    };

    const { getByTestId } = render(
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

    const editFrontInput = getByTestId('editFrontInput');

    const editedFrontValue = 'editedfront';

    fireEvent.change(editFrontInput, { target: { value: editedFrontValue } });

    const saveFrontButton = getByTestId('saveFrontButton');

    fireEvent.click(saveFrontButton);

    const backEditButton = getByTestId('backEditButton');

    fireEvent.click(backEditButton);

    const saveBackButton = getByTestId('saveBackButton');
    const editBackInput = getByTestId('editBackInput');
    const editedBackValue = 'editedback';

    fireEvent.change(editBackInput, { target: { value: editedBackValue } });
    fireEvent.click(saveBackButton);

    expect((saveBackButton as HTMLButtonElement).disabled).not.toBe(true);
    expect((saveFrontButton as HTMLButtonElement).disabled).not.toBe(true);

    server.use(
      rest.patch(
        'https://training.nerdbord.io/api/v1/fischkapp/flashcards/:id',
        (req, res, ctx) => {
          return res(
            ctx.status(201),
            ctx.json({
              _id: '1',
              front: editedFrontValue,
              back: editedBackValue,
            }),
          );
        },
      ),
    );

    const response = await updateFlashcard(cardExample._id, editedCardExample);

    expect(response).toEqual(editedCardExample);
  });
});
