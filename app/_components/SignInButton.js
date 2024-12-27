import { signInAction } from "../_lib/actions";

function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;

/* When button is clicked, user must be signed in to Google provider using exported signIn function from auth. 
But if we add onClick prop on button this component will become client component. 
Keeping the auth in server is more beneficial. 

How do we add interactivity in server component ? 
Using server actions in form. 
When the button is clicked then action attribute of form is used to execute server action. 

Server actions: 
  They are used to add interactivity in server component. 
  They always run on server. 
  They can be called on both client and server components but will be executed on server only, 

Server actions are created using file convention action.js in lib. 
There we will provide all the required server action functions. 

There will be two server actions: 
a. SignInAction
b. SignOutAction
*/
