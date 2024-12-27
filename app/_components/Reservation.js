import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const session = await auth();

  const [bookedDates, settings] = await Promise.all([
    getBookedDatesByCabinId(cabin.id),
    getSettings(),
  ]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <DateSelector
        bookedDates={bookedDates}
        settings={settings}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session?.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;

/*ReservationForm comp requires current session but it is client comp. 
It is beneficial to keep session in server comp. 
So, session is accessed in Reservation and passed to ReservationForm as prop. */

/*Server actions for data mutations. 
Implementing features: creating, updating and deleting cabin. 
New cutting edge React hooks.

To perform some actions in Next.js apps, React Server Components architecture
provides server actions. 

In order to build full stack applications in React using RSC architecture, data is fetched 
using SC and mutations are performed by Server Actions. 

Server Actions: 
Async function that run on server allowing us to perform data mutations. 

Created using "use server" directive and can be defined at top of async function in a Server component or
an entire module (standalone file) from where multiple server actions can be exported. 

SC: Server comp, CC: Client comp, SA: Server Actions
Unlike normal functions which cannot be passed from server comp to client comp. 
But server actions can be passed as prop from server comp to client comp. It is an exception for server actions. 
SA can be invoked right in SC in which they are created. 

use client directive is like a bridge that allows code to cross from Server to Client comp. 
Eg: Sending script url with script tag from server to browser. 

use server directive is opposite that bridges client to server. 
It allows client to communicate with server using this directive.
It likes API endpoint which allows front end application to do that. 

Server components dont need any directives. 

Speacking of API endpoints, server actions are exctaly that. 
BTS, Next.js will automatically create API endpoint(with URL) for each server action. 
Each server action gets URL which is send to client. 
Its important to note that function itself never reaches the client, only URL. 
This means the code itself will always stay on server. 
So, in server actions its safe to directly connect to databases, using secret API keys. 
Its impossible that code is leaked to  client. 

When server action is invoked as a result of user interaction, 
BTS a POST request will be made to end point and all the inputs that are send along the request 
will be seralized. 

As a developer, we will never see or use a API end point or URL. Its abstracted away in server actions. 
*/

/* Data id is updated in backend, but if we navigate around and come back then route will show stale data. 
Why? 

Browser cache also called router cache. Why not data cache or full route cache? Because they store data of static routes
The data will be changed only when 30secs has passed because browser cache stores data of dynamic routes for 30 secs and 5 mins for static routes
Till then we will not get fresh data. 

Solution: cache revalidation using: time-based revalidation and manual on demand revalidation
Manaual cache reavalidation using revalidatePath fun where path is passed. 
*/
