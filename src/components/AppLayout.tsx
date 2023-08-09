import React, { PropsWithChildren } from 'react';

import styles from './AppLayout.module.css';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = (
  props: PropsWithChildren<AppLayoutProps>,
) => <div className={styles.layout}>{props.children}</div>;
