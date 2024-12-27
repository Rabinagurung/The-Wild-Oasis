"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservationContext() {
  const context = useContext(ReservationContext);

  if (context === undefined) throw new Error("Context used outsde of Providr");

  return context;
}

export { ReservationProvider, useReservationContext };

//1. Create context
//2. Create a component that holds state context and provide access to its children components
//3. Create a hook to provide context value to all children components

//Rendering server components inside client components is no problem using children props because
//server component will be already generated and rendered on server which means React elements of server components
//has been created. So, React elements of server components will be passed as children prop in client comp.
//Thats no problem at all.

//How to provide ContextAPI in Next.js ?
//In root layout, all the client components will be able to access context, but never server comps.
