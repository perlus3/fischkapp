import React from 'react';

import { AppHeader } from './components/header/AppHeader.tsx';
import { AppLayout } from './components/layout/AppLayout.tsx';

import './App.css';
import { NewCardFront } from './components/cards/NewCardFront.tsx';
import { EditCardBack } from './components/cards/EditCardBack.tsx';
import { FrontCard } from './components/cards/FrontCard.tsx';
import { CardsList } from './components/cards/CardsList.tsx';
import { EditCardFront } from './components/cards/EditCardFront.tsx';
import { BackCard } from './components/cards/BackCard.tsx';

function App() {
  return (
    <AppLayout>
      <AppHeader />
      {/*<CardsList />*/}
      <FrontCard />
      <BackCard />
      {/*<NewCardFront />*/}
      {/*<EditCardFront />*/}
      {/*<EditCardBack />*/}
    </AppLayout>
  );
}

export default App;
