"use client";

import { updateGuest } from "../_lib/actions";
import { useFormStatus } from "react-dom";

function UpdateProfileForm({ guest, children }) {
  // CHANGE
  const { fullName, countryFlag, email, nationalID } = guest;

  return (
    <form
      action={updateGuest}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          name="fullname"
          defaultValue={fullName}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          name="email"
          disabled
          defaultValue={email}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <Button />
      </div>
    </form>
  );
}

//Button comp is rendered inside form and useFormStatus hook is used. So, Button comp must be client comp.
//If UpdateProfileForm was a sever comp then this Button must be exported in separate file as client comp.
function Button() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {!pending ? <span>Update profile</span> : <span>Updating.....</span>}
    </button>
  );
}
export default UpdateProfileForm;

/* Guest data is recevied and set as default values for form.
To update the guests data, server action is created and using form action attribute server action will be invoked. 
When the btn is clicked then form will make a POST request to generated API endpoint of server action 
and all form inputs will be seralized. 
Server action will receive form data using formData Web API that also works in browser. 

Server action can be created in two ways: 
a. Inside the server component. 
b. Stand alone file

Our case: This comp is client comp so we cannot create sever action inisde CC. 
So we go with option b. 

All the input data of form will be automatically submmited to action funciton. 
Note: we need to provide name to all form fields same as guest table column names in database
Same is done in Select Country sever comp passed as children prop in CC. 
*/

/* Showing Loading idicator when server action is performing action. 
useFormStatus hook is used provided by ReactDOM. 
It can be only used in comp that is rendered inside form. 
Not in comp that contains the form. 

UpdateProfileForm contains the form, so we cannot use it in the body. 
This hook must be placed inside the comp rendered insde form.
Where do we want to display form status? 
In button element, so separate button component is created and useFormStatus is used and forms status is displayed. 

returns: {
  pending(async work is being done in background),
  formData,
  action, 
  method
}
  
*/

/* useTransition hook: It is concurrent feature in React-18.  
It allows us to mark a state update as transition.
When state udpate is marked as transition using useTransition hook, then that state will update 
in background without blocking UI. 
UI will remain responsive during a re-render and indication is provided that state transition is happening. 

In Next.js, useTransition can be used to mark the server action as transition too. 

useTransition: 
returns : [isPending, startTransition ]
startTransition: fun that used to wrap heavy state update. 

Server action will be wrapped inside the startTransition as callback fun. 

BTS, it works because React is using suspense boundaries for all of this. 
All navigations in Next.js are wrapped into transitions by framework automatically.
*/
