
import { handlers } from "@/app/_lib/auth";

export const { GET, POST } = handlers;

/** This route.js is route hadler file
 *  [...nextauth] : catching all segments.
    Function: All the urls that starts with route: api/auth/ like: 

    /api/auth/providers or 
    /api/auth/signIn or 
    /api/auth/signOut.

will later be handeled by auth.js file.

GET and POST route handlers (result from NextAuth()) is imported and exported from this route handler file.
Why? In route handler file, we need to export handler fucntions like GET, POST, PUT, PATCH

http://localhost:3000/api/auth/signin = takes me to sign in with Google

How this work?
This works because BTS, Next.js has created all these relevant API routes that starts with /app/auth.
So, all these API requests will be entirely handeled by Next.js.
In this way, Auth.js will be in charge of whole application authentication flow.

Customizing website according to logged in user.
How to get data about currently logged in user in component ?
*/
