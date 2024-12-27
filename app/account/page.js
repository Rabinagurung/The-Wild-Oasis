export const metadata = {
  title: "Guests area",
};

export default function Page() {
  return <h1>Account Page</h1>;
}

/* Protecting guests area routes from unauthorized users. 
How?
Using middleware that runs after the request and before the navigated route is rendered and sent back.
By default, it runs before every route is rendered in Next.js project. 
But matcher can be specified to run middlewear in route that we want. 

Middleware needs to produce response. Two ways: 
a. Redirect or rewrite the route. In other words, running middleware before some route. 
b. Sending direct response to client as json response like API. This feautre is not much used. 
  Route handlers are also used to send json repsonse to client. 

Use cases of middleware: 
a. To read incoming cookies and headers and to set the cookies and headers on response.
b. To implement features like authorization, authentication, server-side analytics, A/B testing. 

middlware convention file must be created in project root folder. 

*/

/* Use case of middleware in our app */
