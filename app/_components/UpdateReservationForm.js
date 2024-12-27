"use client";

import { updateReservation } from "../_lib/actions";
import { useFormStatus } from "react-dom";
import SubmitButton from "./SubmitButton";

function UpdateReservationForm({ booking }) {
  const {
    id: bookingId,
    numGuests,
    observations,
    cabins: { maxCapacity },
  } = booking;

  const udpateReservationWithId = updateReservation.bind(null, bookingId);

  return (
    <form
      action={udpateReservationWithId}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      {/* <input type="hidden" name="bookingId" value={bookingId} /> */}
      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          name="numGuests"
          defaultValue={numGuests}
          id="numGuests"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          defaultValue={observations}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingText="Updating...">
          Update Reservation
        </SubmitButton>
      </div>
    </form>
  );
}

export default UpdateReservationForm;
