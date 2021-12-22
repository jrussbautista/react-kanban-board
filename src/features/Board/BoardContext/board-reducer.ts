import { Board, Card } from '../../../types';

type AddCardPayload = {
  columnId: string;
  card: Card;
};

type MovePayload = {
  draggableId: string;
  source: {
    index: number;
    droppableId: string;
  };
  destination: {
    index: number;
    droppableId: string;
  };
};

type MoveCard = {
  payload: MovePayload;
  type: 'MOVE_CARD';
};

type AddCard = {
  payload: AddCardPayload;
  type: 'ADD_CARD';
};

export type Action = MoveCard | AddCard;

export type State = Board;

export const boardReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'MOVE_CARD': {
      const { columns } = state;
      const { source, destination, draggableId } = action.payload;
      const sourceCol = columns.find((item) => item.id === source.droppableId);
      const destinationCol = columns.find((item) => item.id === destination.droppableId);

      const activeDragItem = sourceCol?.cards[source.index];
      if (!activeDragItem || !destinationCol || !sourceCol) {
        return state;
      }

      const currentSourceCards = sourceCol.cards.filter((cardItem) => cardItem.id !== draggableId);

      if (destination.droppableId === source.droppableId) {
        const startCards = currentSourceCards.slice(0, destination.index);
        const endCards = currentSourceCards.slice(destination.index);
        const newCards = [...startCards, activeDragItem, ...endCards];

        const newColumns = columns.map((column) =>
          column.id === destination.droppableId ? { ...column, cards: newCards } : column
        );

        return { ...state, columns: newColumns };
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
      return { ...state, columns: newColumns };
    }
    case 'ADD_CARD': {
      const columns = state.columns.map((column) =>
        column.id === action.payload.columnId
          ? { ...column, cards: [...column.cards, action.payload.card] }
          : column
      );
      return { ...state, columns };
    }
    default:
      throw new Error(`Unknown type`);
  }
};
