import { auth } from "@/app/_lib/auth";

export const middleware = auth;

/* The auth() function of Next-auth  has many funcitonalities: 
  - get user current session 
  - serves as middleware

matcher is specified  so, middleware will only run in /account route( protected route)
Authorization is applied to Guests Area where unauthorized user cannot access that page. 
How? 

In auth.js, callbacks are specified where authorized callback fun will be called 
when the user navigates to /account route. Why? 

- Because auth() fun is middleware and middleware only runs in /account route. 
auth() will call that authorised callback which recevies two arg: auth, request 
auth: session obj
request: object

The authorized callback needs to return Boolean value. 
- true: authorized and user can navigate to that route.
- false: unauthorized and user cannot navigate to that route. 
*/
export const config = {
  matcher: ["/account/:path*"],
};
