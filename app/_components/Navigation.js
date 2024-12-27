import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex gap-2 items-center"
            >
              <img
                src={session?.user?.image}
                alt={`Picture of ${session.user.name}`}
                className="h-8 rounded-full"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

/* Using auth() from auth.js file in this static comp then this comp will become dynamic.
Why ? Because auth() fun uses cookies and headers. The auth() fun reads the cookies from incoming request. 

As we already know, reading cookies and headers switches the route to render dynamically. 
Because cookies will never be known at build time, only be known at run time.

The site is built statically but we will not know about users that might be eventually logged in. 
So, auth() needs to be dynamic. 

Since, auth() is called in navigation comp where
Navigation comp is used in all routes as it is part of layout.js, all routes of application will become dynamic. 
Entire application will be dynamic. 

How to get access to current session in client comp? 
But keeping current session in server is more beneficail.  

*/
