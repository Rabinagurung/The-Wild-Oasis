import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        //Get guest
        const existingGuest = await getGuest(user.email);

        //Create guest if does not exists.
        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });

        return true;
      } catch (error) {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);

      session.user.guestId = guest.id;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

/* When guests logs in, guests data must be stored in order to make reservations,
update the guest data and  many more. 
If the currently logged in guests exists in guests table then guesId is stored in session. 
If the currently logged in guests does not exists in guests table then new guest will be create in guests table. 

Solution: 
a. signIn callback added. Why? 
This signIn callback will be executed before the user signs in the app. 

Arguments: {user, account, profile}

Usecase: 
All possible operations of sign in process can be executed here. 
It is like middleware that executes after the guest add their crendenitals but before the user actually signs in the application. 
Here, we will check if the logged in guest exists in guests table. 
If not then new guest will be created. 

Return: 
It must return boolean value. 

b. session callback: 
It will be executed after signIn callback. 

Arguments: {session, user}

Usecase: 
It is used to store currently logged in guests id in session. 
Eg: Currently logged in guest id is required to make reservations, update profile and many more.

So, after user has successfully signed in, this callback will be executed.
And guest data is fetched then guestId is added to session and session is returned. 

Now, we can get access to guestId in many places through session returned by auth(). 
And guests can make reservations, update id and many more. 

*/
