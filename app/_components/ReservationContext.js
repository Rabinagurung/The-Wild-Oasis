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

/** 1. Create context
2. Create a component(Reservation) that holds state context and     
  provide access to its children components: DateSelector and ReservationForm
3. Create a hook to provide context value to all children components

- Rendering server components inside client components is no problem using children props because

How to provide ContextAPI in Next.js ?
We need to provide the <ReservationProvider /> inside parent comp: Reservation but this data is required in other 
places of app, so  <ReservationProvider /> is placed in root layout, 
all the client components will be able to access context, but never server comps.

In RootLayout:   
 <main className="max-w-7xl mx-auto w-full">
    <ReservationProvider>{children}</ReservationProvider>
  </main>

  -children are all the pages of whatever page we are visiting means pages are all SComps. 
  -ReservationProvider is client comp. 
  -So, we are passing SComp(pages) into CComps(ReservationProvider). 
  
  Do we have problem? 
    No, because server component will be already generated and rendered on server which means 
    React elements of server components(pages) has already been created. 
    So, React elements of server components will be passed as children prop in client comp.
    thats no problem at all.

  What we cannot do? 
  Set up ReservationContext like createContext(), using hooks and ReservationContext in root layout itself. 
  Cox they are client features and root layout is Scomp. 
*/