"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}

/* 
Setting up global error boundary that would wrap the entire application into a React error boundary.
For example: if we are trying to access something that does not exists in JSX like: 
capacity.max then capacity is undefined error will be thrown. 
To catch that error, global error boundary is created. 

By default in Next.js, components are server components. 

Error boundary always need to be client component. So, "use client" boundary is used. 
Error component recevies error object itself and function to reset error boundary. 
So that clicking(action), interactive part can only happen in client component. 
So, error boundary needs to be client component. Sever components are not interactive. 

Error boundary will catch errors only in rendering. 
Errors in callback funs will not be caught by a React error boundary. 
It will also not catch errors that might happen in root layout. 

If we do some data fetching in root layout and there is some error. 
That error will not be catched by error boundary. 
So, we have to create another gloabl error boundary called gloabl-error.js to catch rendering errors in root layout. 

In that gloabl-error.js, html and body should also be placed. 
*/
