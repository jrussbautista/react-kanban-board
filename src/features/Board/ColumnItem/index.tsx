import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { Column } from '../../../types';
import CardItem from '../CardItem';

type ColumnItemProps = {
  column: Column;
};

const ColumnItem = ({ column }: ColumnItemProps) => {
  return (
    <Droppable key={column.id} droppableId={column.id}>
      {(provided) => (
        <>
          <div className="bg-blue-500 p-3 text-white">
            <p className="font-semibold">{column.title}</p>
          </div>
          <div {...provided.droppableProps} ref={provided.innerRef} className="mt-4 h-full">
            {column.cards?.map((card, index) => (
              <CardItem key={card.id} cardItem={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </>
      )}
    </Droppable>
  );
};

export default ColumnItem;
