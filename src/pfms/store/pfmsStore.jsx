import React, { createContext, useContext, useReducer } from 'react';

const PFMSContext = createContext();

const initialState = {
  batches: [],
  currentBatch: null,
  loading: false,
  error: null,
  notifications: []
};

const pfmsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_BATCHES':
      return { ...state, batches: action.payload, loading: false };
    case 'SET_CURRENT_BATCH':
      return { ...state, currentBatch: action.payload, loading: false };
    case 'ADD_BATCH':
      return { ...state, batches: [...state.batches, action.payload] };
    case 'UPDATE_BATCH':
      return {
        ...state,
        batches: state.batches.map(b => b.id === action.payload.id ? action.payload : b),
        currentBatch: state.currentBatch?.id === action.payload.id ? action.payload : state.currentBatch
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const PFMSProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pfmsReducer, initialState);

  return (
    <PFMSContext.Provider value={{ state, dispatch }}>
      {children}
    </PFMSContext.Provider>
  );
};

export const usePFMSStore = () => {
  const context = useContext(PFMSContext);
  if (!context) {
    throw new Error('usePFMSStore must be used within a PFMSProvider');
  }
  return context;
};
