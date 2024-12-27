import Spinner from "@/app/_components/Spinner";
import UpdateReservationForm from "@/app/_components/UpdateReservationForm";
import { getBooking } from "@/app/_lib/data-service";
import { Suspense } from "react";

export default async function Page({ params }) {
  const booking = await getBooking(params?.bookingId);

  // CHANGE
  const { id: reservationId } = booking;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>
      <Suspense fallback={<Spinner />}>
        <UpdateReservationForm booking={booking} />
      </Suspense>
    </div>
  );
}
