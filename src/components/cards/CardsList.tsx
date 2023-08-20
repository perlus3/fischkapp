import React from 'react';

import styles from './CardsList.module.css';
import { FrontCard } from './FrontCard.tsx';
import { SingleCard } from './SingleCard.tsx';

export const CardsList = () => {
  return (
    <div className={styles.container}>
      <SingleCard />
    </div>
  );
};
