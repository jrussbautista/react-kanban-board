import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Action, boardReducer } from './board-reducer';
import { board } from '../data';
import { Board } from '../types';

const BoardContext = createContext<Board | null>(null);
const BoardDispatchContext = createContext<React.Dispatch<Action> | null>(null);

type BoardProviderProps = {
  children: React.ReactNode;
};

export const BoardProvider = ({ children }: BoardProviderProps) => {
  const initialState: Board = {
    ...board,
  };

  const getInitialState = () => {
    const state = localStorage.getItem('board');
    return state ? JSON.parse(state) : initialState;
  };

  const [state, dispatch] = useReducer(boardReducer, initialState, getInitialState);

  useEffect(() => {
    localStorage.setItem('board', JSON.stringify(state));
  }, [state]);

  return (
    <BoardContext.Provider value={state}>
      <BoardDispatchContext.Provider value={dispatch}>{children}</BoardDispatchContext.Provider>
    </BoardContext.Provider>
  );
};

export const useBoardState = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be used within <BoardProvider />');
  }
  return context;
};

export const useBoardDispatch = () => {
  const context = useContext(BoardDispatchContext);
  if (!context) {
    throw new Error('useBoard must be used within <BoardProvider />');
  }
  return context;
};

export const useBoard = (): [Board, React.Dispatch<Action>] => {
  return [useBoardState(), useBoardDispatch()];
};
