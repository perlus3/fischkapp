import { Flashcard } from '../App.tsx';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { EditCardName } from '../components/cards/EditCardName.tsx';
import { SingleFlashCard } from '../components/cards/SingleFlashCard.tsx';

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
