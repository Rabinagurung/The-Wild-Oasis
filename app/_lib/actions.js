"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

const pattern = /^[a-zA-Z0-9]{6,12}$/;

export async function updateGuest(formData) {
  //Users must be authorized to perform action in backend.
  const session = await auth();

  if (!session) throw new Error("You must be logged in ");

  const nationalID = formData.get("nationalID");
  if (!pattern.test(nationalID)) {
    throw Error("Provide valid nationalID");
  }

  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const updatedGuestData = { nationalID, nationality, countryFlag };

  const { error } = await supabase
    .from("guests")
    .update(updatedGuestData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  //Manual cache revalidation after data mutation is sucessfull
  revalidatePath("/account/profile");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
    guestId: session.user.guestId,
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Reservation could not be made");

  revalidatePath(`/cabins/${bookingData.cabinId}`);
}

//
export async function deleteReservation(bookingId) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  //Three lines validation so that guests can delete only their own reservations.
  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You cannot delete booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateReservation(bookingId, formData) {
  //Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  //Authorization
  const gusestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = gusestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(guestBookingsIds))
    throw new Error("You cannot update Booking");

  const updatedData = {
    numGuests: Number(formData?.get("numGuests")),
    observations: formData?.get("observations"),
  };

  //Data mutation
  const { error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", bookingId);

  //Error handling
  if (error) throw new Error("Booking could not be updated");

  //Revalidation
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/${bookingId}`);

  //Redirect
  redirect("/account/reservations");
}

export async function signInAction() {
  return signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  return signOut({ redirectTo: "/" });
}

/* "use server" directive is used to communicate with server from client. 
It is not used to define server component like "use client" that defines Client comp. 
It is used to define serve action. 

Each async function is server action. 
Server actions can be called from both client and server comps but will be executed only in server. How? 

BTS, Next.js will create API endpoint with URL for each server action. 
When server action is called as a result of user interaction, 
POST request will be made to that API endpoint and all the inputs will be seralized. 
So, this async function will never reach the client and will always stay in server. 
So, its safe to access databases and secret key in server actions. 

usage: 
used to peform data mutations(CUD). 
To read cookies. 

Note: 
All data mutations are done in backend. So, user must be authorised to excute action. 
The data recevied is always unsafe. Validations is required using regex. 


How to invoke ServerAction : using action attrubute of form. 
All the form input data will be seralized. 

form will automatically submit all the data to that action function. 

Errors: 
Errors are thrown and will be caught by closest error boundary.


Cache can be revaldiated using: 
a. time based revalidation
b. manaul cache revalidation using: revalidatePath and tag. 

 */

/* Functions cannot be passed directly to Client component unless you explicitly expose it by marking it as "use server". */
