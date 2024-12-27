//[...nextauth] : catching all segments.
// Function: All the urls that starts with route: api/auth/ like: /api/auth/providers or /api/auth/signIn or api/auth/signOut.
//will be handeled by route file.
import { handlers } from "@/app/_lib/auth";

export const { GET, POST } = handlers;

//This works because BTS, next.js has created all these relevant API routes that starts with /app/auth.
//So, all these API requests will be entirely handeled by Next.js.
//In this way, auth.js will be in charge of whole application authentication flow.

//Customizing website according to logged in user.
//How to get data about currently logged in user in component?
