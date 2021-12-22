import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { Board, Column } from '../../types';
import ColumnItem from './ColumnItem';

export const board: Board = {
  columns: [
    {
      id: 'col-1',
      title: 'Backlog',
      cards: [
        {
          id: 'card-1',
          title: 'Fix bug',
        },
        {
          id: 'card-2',
          title: 'Fix bug 2',
        },
        {
          id: 'card-3',
          title: 'Go shopping',
        },
      ],
    },
    {
      id: 'col-2',
      title: 'Pending',
      cards: [
        {
          id: 'card-4',
          title: 'On going here',
        },
        {
          id: 'card-5',
          title: 'On going here 2',
        },
      ],
    },
    {
      id: 'col-3',
      title: 'Done',
      cards: [
        {
          id: 'card-6',
          title: 'Done',
        },
      ],
    },
  ],
};

const BoardPage = () => {
  const [columns, setColumns] = useState<Column[]>(board.columns);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const sourceCol = columns.find((item) => item.id === source.droppableId);
    const destinationCol = columns.find((item) => item.id === destination.droppableId);

    const activeDragItem = sourceCol?.cards[source.index];
    if (!activeDragItem || !destinationCol || !sourceCol) {
      return;
    }

    const currentSourceCards = sourceCol.cards.filter((cardItem) => cardItem.id !== draggableId);

    if (destination.droppableId === source.droppableId) {
      const startCards = currentSourceCards.slice(0, destination.index);
      const endCards = currentSourceCards.slice(destination.index);
      const newCards = [...startCards, activeDragItem, ...endCards];

      const newColumns = columns.map((column) =>
        column.id === destination.droppableId ? { ...column, cards: newCards } : column
      );

      setColumns(newColumns);
      return;
    }

    const currentDestStartCards = destinationCol?.cards.slice(0, destination.index);
    const currentDestEndCards = destinationCol?.cards.slice(destination.index);
    const newDestCards = [...currentDestStartCards, activeDragItem, ...currentDestEndCards];

    const newColumns = columns.map((column) => {
      if (column.id === destination.droppableId) {
        return { ...column, cards: newDestCards };
      }
      if (column.id === source.droppableId) {
        return { ...column, cards: currentSourceCards };
      }
      return column;
    });

    setColumns(newColumns);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex">
        {columns.map((column) => (
          <div key={column.id} className="flex-1 p-4">
            <ColumnItem column={column} />
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default BoardPage;
