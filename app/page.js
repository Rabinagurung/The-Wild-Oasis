import Image from "next/image";
import bg from "@/public/bg.png";
import Link from "next/link";

export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}

/* 
Part A:
When anchor element is used to navigate between pages, webpage will be hard reloaded. 

For SPA feel, <Link> is used. How does it work? 
BTS, there is an optimization technique. 
It will prefetch all the routes linked to a certain page.
We can only see that in production not in development.

Each page is downloaded separately as separate chunk which also improves performance. 
Each page that we visit in browser will be cached in the browser as well. 
It will be stored there temporarily and as we move around pages, all pages will not have to re-fetched again. 

For programmatic navigation hooks are available but will not work in page component. 
Page components are server components and React hooks does not work in server component. 


PartB: 
Each of pages in Next.js application is server component. 
That's just not because server components are default in React Server component architecture in Next.js. 
It's because pages should always need to be server components. 

Fetching data into server components in new RSC architecture in cabins page.  
*/
