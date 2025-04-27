import { createContext, useContext, useState } from 'react';
import initialData from '/data.json';

const RequestsContext = createContext();

export const useRequests = () => useContext(RequestsContext);

export const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState(initialData);

  const addRequest = (newRequest) => {
    console.log(newRequest)
    setRequests(prev => [...prev, newRequest]);
    console.log(requests)
  };

  return (
    <RequestsContext.Provider value={{ requests, addRequest }}>
      {children}
    </RequestsContext.Provider>
  );
};
