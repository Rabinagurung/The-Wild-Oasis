"use client";

import { useState } from "react";

export default function Counter({ users }) {
  const [count, setCount] = useState(null);
  return (
    <div>
      <p>There are {users.length} users</p>
      <button onClick={() => setCount((c) => c + 1)}>+{count}</button>
    </div>
  );
}

//With loading file, loading state will be loaded immeditaely in server while data is being fetched or while navigating to sub routes (deeply nested routes)
//BTS, loading file activates streaming and data will be streamed from server to client automatically and not sent in one go.
//BTS, Next.js uses rendertoReadableStream function of React-Router dom package, that has streaming functionality.
//Thats what Next.js uses in order to power this.
//This feature requires JS to be enabled in browser. Streaming will not work if the user has disabled JS in browser.
//To make website work without JS, then laoding.js state cannot be used in application.
//Using suspense, streaming can be activated for each component.
//If a page has 20 comps and only 1 comp is fetching data then whole page will be covered by loading indicator.
//If we only want that 1 data fetching comp to show loading state then suspense can be used to that comp.
