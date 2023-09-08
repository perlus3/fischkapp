import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../App';

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
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Flahcards displaying in the list properly', () => {
  test('displaying flashcards in list', async () => {
    const { queryAllByTestId } = render(<App />);

    await waitFor(() => {
      expect(queryAllByTestId('newlyAddedCard')).toHaveLength(3);
    });
  });
});
