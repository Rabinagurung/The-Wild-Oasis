import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);

  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const data = await getCabins();

  const ids = data.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-8">
          Reserve today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}

/* 1. localhost:3000/cabins/cabinId 
cabinId is dynamic segment of route and its value is not known before it is filled. 
But can also be pre-defined. 

For that reason, dynamic route is created, [cabinId]. 

Any page or layouts associated with dynmaic route segment, will get access to params argument 
that is received like a prop. 

params: { cabinId: 1 } 

By default, Next.js renderes all routes statically. 
Under certain conditions only, those routes are rendered dynamically. 

Conditions: 
    a. Route pages that uses params
    b. Route pages that uses searchParams
    c. headers() or cookies() used in route's SComps
    d. Unchached data request made to route's SComps. 


This localhost:3000//cabins/[cabinId] route is dynamically rendered because
localId is dynamic segment which is not known at build time. 
The dynamic segment is  known only when request reaches server .
This route requires information to run that depends on the request itself like params, searchParams, headers() or cookies(). 



Exporting dynamic pages as static pages. How? 
Letting Next.js know about all possible values of dynamic  URL segment by using generateStaticParams function. 
So those pages can be exported as static pages which will be faster then dynamic pages.

Telling Next.js ahead about all sets of params that can be set on dynamic route. 
In our case, fetching cabins and reading ids from there. 
Inside async generateStaticParams function: 
An array that contains object of dynamic segment (cabinId) with value is returned, where value must be String. 

Eg: [
    {   cabinId: 1  }, 
    {   cabinId: 2  }
    ]

By doing this, Next.js will export this page as static pages because all values of dynamic segment is known. 

Note: If in our app there are finite sets of vaues for dynamic URL segment then providing those values 
to Next.js will be better by using generateStaticParams fun. So, that Next.js can export that route 
staitcally at build time. 
This is much better for performance. 

If all the routes are static then website can be exported as static site using Static Site Generation. 
So, that website can be very easily deployed to any hosting provider that supports static site. 
When we are attempting to export website as static but if we have any dyamic routes then error will be thrown. 


Step 1: In next.config.mjs file: output is set to export, output : "export".
        By doing this, site will be completey exported as static assests that can be deployed anywhere. 
Steo 2: npm run build

Result: Output folder that contains html file for each routes. Each html files contains txt files. 
That txt file is RSC payload. 
What is RSC payload: 
React Server Components Payload that will be sent to browser and website will run. 
RSC payload can contain both rendered server comps and un-rendered client comps.
It contains virtual DOM of rendered server components whereas placeholder for each unrendered CC has: 
props passed to CC from SC, URL script that contains code required for CC to run on browser. 

When this output folder runs is hosted then resulting website will feel like SPA. 

Things that does not run: 
All the images that we optimized using next.js Image comp. 

Why does it not work?
All the images are optimized BTS by Vercel using their Image optimization API.
This happens dynamically on server. 
*/

/* 2. Rendering Client comp into Server comp. 
Client comp <TextExpander/> is rendered in this Page comp. 
In server components, hooks, useState functions cannot be used. 
To use this hooks, comp must be declared as client comp using "use client" directive. 

TextExpander must be declared as client comp using "use client" directive. */

/* Rendering server components inside Client component: 
Server component can be rendered in client comp as children props where the parent server comp will import 
that server comp and client comp then render that server comp and finally pass it as prop or children 
to child comp.

Example: 

import B; //Client comp
import C; //Server comp

//Parent server comp A
function A(){

  return (
    <B>
      <C/>
    </B>
  )
}

Note: 
Importing server comp directly in client comp will also make that server comp client comp. 
All the children of client comp will automatically become client comp  if they are imported in client comp. 
*/

/*3. Adding Reservation feature for each cabin. 
Two components DateSelector and ReservationForm components are added. 
Both are client components as states are required for both components. 
But they also require to fetch data from settingsAPI, bookedDatesAPI, currentCabinAPI. 

How and where to fetch data ? 
In server components, data are usually fetched and passed to client components as props. 


If all those three APIS are fetched in this page component then What will happen? 

const cabin = await getCabin(params.cabinId); 
const settings = await getSettings(); 
const bookedDates = await getBookedDatesByCabinId(params.cabinId);

Result: Blocking waterfall: fetching multiple pieces of data that do not really depend on each other.
But are still blocking one another. 
If fetching cabins takes 5 secs more then other two data, UI will be blocked for 5 secs 
and we cannot fetch other data until cabins data is fetched. 


Solution: Creating a separate comp(Reservation comp) that fetches the data and streaming that comp here.
So, Reservation comp created that fetches the data from API. 
This comp renders DateSelector and ReservationForm client comps


How to stream Reservation comp in this page? 

By using Suspense because Reservation is suspending comp that fetches the data from API. 
To avoid blocking of whole UI when the suspending comp is being rendered, Suspense is used and 
fallback UI is provided when comp is rendered. 
So, loading.js is over written by suspense and only suspending comp will be loading and 
remaining page will be loaded faster. 

Sharing data between two client comp: options: 
a. Url state: No, cox updating URL will cause navigation that triggers server comp to re-renderd and all data is re-fetcched.
b. Parent comp and lifting state : No we already used
c. Context API: Yes

ReservationContext API created. 

How to share data from client to server comp? 
Using URL state.


Creating API endpoint from next.js using a feature called Route Handlers. 
This is not that important anymore like in pages router because sever actions are used to mutate data.

*/
