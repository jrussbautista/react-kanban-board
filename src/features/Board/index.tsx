import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import ColumnItem from './ColumnItem';
import { BoardProvider, useBoard } from './BoardContext';

const BoardApp = () => {
  const [board, dispatch] = useBoard();

  const { columns } = board;

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    dispatch({ type: 'MOVE_CARD', payload: { source, destination, draggableId } });
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

const BoardPage = () => {
  return (
    <BoardProvider>
      <BoardApp />
    </BoardProvider>
  );
};

export default BoardPage;
