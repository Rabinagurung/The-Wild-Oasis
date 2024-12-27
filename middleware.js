import { NextResponse } from "next/server";

//Experiment
// export function middleware(request) {
//   return NextResponse.redirect(new URL("/about", request.url));

//   /* We get error: too many redirects.
//   Beause middlewear runs before every route by default in Next.js project.
//   When matcher isn't specified, /cabins, /about, /account routes are redirected to /about route.
//   So, there is indefinite loop to about route. So, error is thrown.

//   Solution: matcher takes an array of routes where middleware will run
//   */
// }

import { auth } from "@/app/_lib/auth";
// import { auth  as middleware} from "@/app/_lib/auth";

// export { middleware };
export const middleware = auth;

export const config = {
  matcher: ["/account"],
};

/* The auth() function of Next-auth is also middleware. 
matcher is specified  so, middleware will only run in /account route. 
So,  /account route  is protected route because middleware only runs in that route. 

So, authorization is applied to Guests Area where unauthorized user cannot access that page. 
How ? 
In auth.js, callbacks is specified where authorized callback fun will be called when the user navigates to /account route. 
Why? 
Because auth() fun is middleware and middleware only runs in /account route. 
auth() will call that authorised callback which recevies two arg: auth, request 
auth: session obj
request: object

The authorized callback needs to return Boolean value. 
true: authorized and user can navigate to that route.
false: unauthorized and user cannot navigate to that route. 
*/

/* When user is unauthorized then user is navigated to default signIn page provided by Auth library. 
But we want user navigate to custom login page that we created. 
How to do ? 
Adding pages in auth configuation file and specifying route for signIn option. 
Same for sign out. 

*/
