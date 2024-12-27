"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const route = useRouter();
  const pathName = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    route.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex gap-2">
      <Button filter="all" onFilter={handleFilter} activeFilter={activeFilter}>
        All cabins
      </Button>
      <Button
        filter="small"
        onFilter={handleFilter}
        activeFilter={activeFilter}
      >
        2&mdash;3
      </Button>
      <Button
        filter="medium"
        onFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7
      </Button>
      <Button
        filter="large"
        onFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12
      </Button>
    </div>
  );
}

function Button({ filter, onFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeFilter === filter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => onFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;

// export function Button({ filter, onFilter, children }) {
//   return <Button onClick={() => onFilter(filter)}>{children}</Button>;
// }

/* URLSearchParams: It is part of Web API, not Next.js that is used to manipulate the URL query parameters. 
It requires current searchParams as argument. 

How to access searchParmas in client comp?
Using useSearchParams hook from next/navigation. 

After we pass the searchParams in URLSearchParams, we can mutate the URL query parameters
like: set, delete. 
But it only sets the Url query parameter internally. It does not change anything in URL

How to place query parameters to URL bar? 
Use replace fun provided by useRouter hook from next/navigation. 
useRouter custom hook allows programmatic navigation between routes in Nex.js

There are always declarative and programmatic(imperative) way to navigate into routes in Next.js:
a. Link comp: Declarative way
b. replace fun from useRouter custom hook : programmatic(imperative)

How to use replace fun ?
Building url where we want to navigate programatically, params must be in String. 
pathName can be accessed from usePathName hook.

How can we access query parameters or searchParams ? 
Only in page.js files in server. 
*/
