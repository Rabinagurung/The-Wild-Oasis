"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteReservation } from "../_lib/actions";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(() => onDelete(bookingId));
  }

  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <div className="m-auto">
          <SpinnerMini />
        </div>
      )}
    </button>
  );
}

export default DeleteReservation;

/* Server action created to delete Reservation.
How to create server action: 
a. Inside the server component and async server action created and inside "use server" is marked. 
b. standalone file and export it

Cannot go with a because this component needs to be client comp. 

How to access server action: 
a. form element in server comp 
b. directly in client comp. 


To make interactive, this comp is converted to client comp. 

How to get access to loading indicator? 
Using useTranstion hook of react. 
It is used to mark state update as transition, then if that state is updated then 
it will not  block UI. So, UI will remain response. 

In Next.js, useTranstion hook is used to mark state update like: server actions as transitions. 
If the server action is peforming action then it will not block the UI and state is updated in backgroud. 

returns: [isPending, startTransition] 

startTransition: fun that marks server action as transition by passing callback with server action. 
 
*/
