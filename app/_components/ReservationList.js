"use client";

import { deleteReservation } from "../_lib/actions";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currBookings, bookingId) =>
      currBookings.filter((booking) => booking.id !== bookingId)
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;

/* useOptimistic hook: 
It is used to optimistically predict successful state of an asychrnonous task. 
It improves user experience.

arugments: initialState and upate function (that optimistically updates state).
returns: current state(initally equal to initialState) and optimisticFn(triggers update function). 
Eg: 
const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currBookings, bookingId) =>
      currBookings.filter((booking) => booking.id !== bookingId)
  );

optimiscFn is similar to dispatch in redux that triggers update fn. 
update fun always take current state and extra info that is used to compute optimistic state. 

How to use? 
handle fun created that calls first optimstic fn and secondly actual asynchronous server action 

If the data mutation fails in server action then original UI will be immeditaely returned. 
That means, if the actual data mutation in server fails then useOptimistic hook will return that optimisically deleted state. 
*/
