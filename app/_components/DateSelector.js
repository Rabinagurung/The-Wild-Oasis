"use client";

import { useState } from "react";
import {
  differenceInCalendarDays,
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import { useReservationContext } from "./ReservationContext";
import "react-day-picker/style.css";

function isAlreadyBooked(range, dateArr) {

  return (
    range.to &&
    range.from &&
    dateArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ bookedDates, settings, cabin }) {

  const { range, setRange, resetRange } = useReservationContext();
  const [error, setError] = useState("");

  const { regularPrice, discount } = cabin;

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const cabinPrice = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength, maxGuestsPerBooking } = settings;

  if (
    typeof minBookingLength !== "number" ||
    typeof maxBookingLength !== "number" ||
    typeof maxGuestsPerBooking !== "number"
  ) {
    return (
      <p className="text-red-500">
        Invalid settings: minBookingLength, maxBookingLength and
        maxGuestsPerBooking must all be numbers.
      </p>
    );
  }

  return (
    <div className="flex flex-col justify-between shadow-grey">
      <p className="mx-auto mt-4 w-fit rounded-full bg-accent-500 px-4 py-1 text-sm font-semibold text-primary-900">
        Minimum stay {minBookingLength} nights &middot; Maximum {maxBookingLength} nights
      </p>
      <DayPicker
        className="pt-12 place-self-center" 
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        selected={displayRange}
        onSelect={(newRange, triggerDate) => {
          const attemptingSecondDate =
            range.from && !range.to && !isSameDay(triggerDate, range.from);

          if (attemptingSecondDate && !newRange?.to) {
            const nights = Math.abs(
              differenceInCalendarDays(triggerDate, range.from)
            );
            if (nights < minBookingLength) {
              setError(
                `Minimum stay is ${minBookingLength} nights — you selected ${nights}.`
              );
            } else if (nights > maxBookingLength) {
              setError(
                `Maximum stay is ${maxBookingLength} nights — you selected ${nights}.`
              );
            }
          } else {
            setError("");
          }

          setRange(newRange ?? { from: undefined, to: undefined });
        }}
        startMonth={new Date()}
        endMonth={new Date(2027, 1)}
        numberOfMonths={2}
        disabled={(currDate) =>  
          isPast(currDate) ||
          bookedDates.some((date) => isSameDay(date, currDate))
        }
        captionLayout="dropdown"
      />
      {error && (
        <p className="mx-auto -mt-2 mb-2 w-fit rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span>
                <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>
        {range.to || range.from ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => {
              setError("");
              resetRange();
            }}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;

// import { isWithinInterval } from "date-fns";
// import dynamic from "next/dynamic";
// const DayPicker = dynamic(
//   () => import("react-day-picker").then((mod) => mod.DayPicker),
//   { ssr: false }
// );

// import "react-day-picker/dist/style.css";
// import { useReservationContext } from "./ReservationContext";

// function isAlreadyBooked(range, datesArr) {
//   return (
//     range.from &&
//     range.to &&
//     datesArr.some((date) =>
//       isWithinInterval(date, { start: range.from, end: range.to })
//     )
//   );
// }

// function DateSelector({ cabin, settings, bookedDays }) {
//   const { range, setRange, resetRange } = useReservationContext();

//   // CHANGE
//   // const regularPrice = 23;
//   // const discount = 23;
//   // const numNights = 23;
//   // const cabinPrice = 23;

//   const { regularPrice, discount, numNights, cabinPrice } = cabin;

//   // SETTINGS
//   const { minBookingLength, maxBookingLength } = settings;

//   return (
//     <div className="flex flex-col justify-between">
//       <DayPicker
//         className="pt-12 place-self-center"
//         mode="range"
//         selected={range}
//         onSelect={setRange}
//         min={minBookingLength + 1}
//         max={maxBookingLength}
//         startMonth={new Date()}
//         endMonth={new Date()}
//         captionLayout="dropdown"
//         numberOfMonths={2}
//       />

//       <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
//         <div className="flex items-baseline gap-6">
//           <p className="flex gap-2 items-baseline">
//             {discount > 0 ? (
//               <>
//                 <span className="text-2xl">${regularPrice - discount}</span>
//                 <span className="line-through font-semibold text-primary-700">
//                   ${regularPrice}
//                 </span>
//               </>
//             ) : (
//               <span className="text-2xl">${regularPrice}</span>
//             )}
//             <span className="">/night</span>
//           </p>
//           {numNights ? (
//             <>
//               <p className="bg-accent-600 px-3 py-2 text-2xl">
//                 <span>&times;</span> <span>{numNights}</span>
//               </p>
//               <p>
//                 <span className="text-lg font-bold uppercase">Total</span>{" "}
//                 <span className="text-2xl font-semibold">${cabinPrice}</span>
//               </p>
//             </>
//           ) : null}
//         </div>

//         {range.from || range.to ? (
//           <button
//             className="border border-primary-800 py-2 px-4 text-sm font-semibold"
//             onClick={resetRange}
//           >
//             Clear
//           </button>
//         ) : null}
//       </div>
//     </div>
//   );
// }

// export default DateSelector;
