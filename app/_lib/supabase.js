import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

/* The environment variables are used to store supabase url and key because Next.js has built in support for supabase urls.
They are simply some variables that we can set up and are available just to Node.js env in which application is running.
They are placed in separate file and Next.js will grab that variable and make them available on a special process variable.

The environment variables are not leaked to browser and only available to environment where the application is running. 
Next.js also allows to make it public to client : NEXT_PUBLIC_SUPABASE_ANON_KEY 

We want all types of users(authenticated users or non-authenticated users) to access the cabins data in website. 
But in our supabase, Row Level Security is enabled that only authenticated users can access the data. 
So, to by pass that service_roles key is used that has the ability to bypass Row Level Security. 
Never share it publicly.
*/
