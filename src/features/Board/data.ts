import { v4 as uuid } from 'uuid';

import { Board } from './types';

export const board: Board = {
  columns: [
    {
      id: uuid(),
      title: 'Backlog',
      cards: [
        {
          id: uuid(),
          title: 'Fix bug',
        },
        {
          id: uuid(),
          title: 'Implement e2e',
        },
        {
          id: uuid(),
          title: 'Learn React',
        },
      ],
    },
    {
      id: uuid(),
      title: 'Pending',
      cards: [
        {
          id: uuid(),
          title: 'Learn typescript',
        },
        {
          id: uuid(),
          title: 'Learn redux toolkit',
        },
      ],
    },
    {
      id: uuid(),
      title: 'Done',
      cards: [
        {
          id: uuid(),
          title: 'Learn javascript',
        },
      ],
    },
  ],
};
