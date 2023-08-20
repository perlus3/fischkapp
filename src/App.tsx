import React from 'react';

import { AppHeader } from './components/header/AppHeader.tsx';
import { AppLayout } from './components/layout/AppLayout.tsx';

import './App.css';
import { NewCardFront } from './components/cards/NewCardFront.tsx';
import { EditCardBack } from './components/cards/EditCardBack.tsx';
import { SingleCard } from './components/cards/SingleCard.tsx';
import { CardsList } from './components/cards/CardsList.tsx';
import { EditCardFront } from './components/cards/EditCardFront.tsx';

function App() {
  return (
    <AppLayout>
      <AppHeader />
      {/*<EditCardFront />*/}
      {/*<CardsList />*/}
      <NewCardFront />
      {/*<EditCardBack />*/}
    </AppLayout>
  );
}

export default App;
