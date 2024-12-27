import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import { ReservationProvider } from "../_components/ReservationContext";
import ReservationReminder from "../_components/ReservationReminder";

export const metadata = {
  title: "Cabins",
};

export default function Page({ searchParams }) {
  const filter = searchParams?.capacity || "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div>
        <Filter />
      </div>
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
      xx
    </div>
  );
}

/*
This is server component and data is directly fetching using fetch fun.
The comp is madea async as we need to fetch data.
The data appears in terminal which came from server.
Data is fetched in server and everything is assembled in html and send off to browser.
Data will be cached in browser Next.js app.

We can't use react hooks and state in server components. 
Client components can be imported and rendered in server components. 
But server components cannot be imported in client components but can be rendered. 

Hydration process is involed to make server components interactive. 
In background, React bundle is being downloaded and till then server components are static. 
And once thats downloaded whole page will be hydrated and interactive. 
Meaning all logic code(event handlers and button) will be added back.

Server components can pass data between them and also to client components using props. 
props acts as bridge between server and client. 

On initial render, all components (both server component and client component) are rendered in server. 
The data passed from server to client will be displayed  even though client component present 
inside React bundle is still being downloaded. Its all because of above reason. 

How SSR related to RSC? 
 */

/* searchParamas can only be accessed in Page component. 

Navigations in Next.js is wrapped inside transitions. 
What is transitions? navigation caused by user. 

When Cabins page is first rendered, cabins data is already fetched. 
So, when different filter is applied, Suspense comp will not hide already rendered data and does not render fallback UI(Spinner). 
Instead, new content(filteredCabins) will be swaped in old content. 
This is default behvaiour of Supsense. 

How can it be changed? 
By rendering different suspense comp every time it is rendered by passing unique key prop. 
Like rendering different list elements in List. 
After passing unique key prop, Suspense component will hide content and display Fallback UI while newContent is being rendered. 
*/
