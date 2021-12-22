import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Card } from '../types';

type CardItemProps = {
  cardItem: Card;
  index: number;
};

const CardItem = ({ cardItem, index }: CardItemProps) => {
  return (
    <Draggable draggableId={cardItem.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
          shadow-sm bg-white p-4 mb-4 rounded cursor-pointer
          ${snapshot.isDragging && !snapshot.isDropAnimating ? 'shadow-md' : ''}
          `}
        >
          <p>{cardItem.title}</p>
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
