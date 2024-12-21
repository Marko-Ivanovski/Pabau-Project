import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import CharacterList from './CharacterList';
import { GET_CHARACTERS } from './CharacterList';

const mocks = [
  {
    request: {
      query: GET_CHARACTERS,
      variables: { page: 1 },
    },
    result: {
      data: {
        characters: {
          info: { next: 2 },
          results: [
            {
              id: '1',
              name: 'Rick Sanchez',
              status: 'Alive',
              species: 'Human',
              gender: 'Male',
              origin: { name: 'Earth (C-137)' },
            },
          ],
        },
      },
    },
  },
];

test('renders characters', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CharacterList />
    </MockedProvider>
  );

  expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
});