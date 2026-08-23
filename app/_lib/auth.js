import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const GUEST_SESSION_MAX_AGE = 24 * 60 * 60 * 1000;
const GUEST_EMAIL_DOMAIN = "guest.local";

function createGuestEmail(sessionId) {
  return `guest-${sessionId}@${GUEST_EMAIL_DOMAIN}`;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      id: "guest",
      name: "Guest",
      credentials: {},
      async authorize() {
        const sessionId = crypto.randomUUID();
        const email = createGuestEmail(sessionId);
        const guest = await createGuest({
          email,
          fullName: "Guest",
        });

        return {
          id: sessionId,
          name: "Guest",
          email,
          image: null,
          guestId: guest.id,
          isGuest: true,
          guestExpiresAt: Date.now() + GUEST_SESSION_MAX_AGE,
        };
      },
    }),
  ],

  /** Callbacks are asynchronous functions you can use to control what happens 
   * when an auth-related action is performed. Callbacks allow you to implement access 
   * controls without a database or to integrate with external databases or APIs. */
  callbacks: {
    authorized({ auth }) {
      
      //auth: session obj | null and request: NextRequest
      //- true: authorized and user can navigate to that route.
      //- false: unauthorized and user cannot navigate to that route. 
      return !!auth?.user?.guestId;
    },

    async signIn({ user, account }) {
      try {
        if (account?.provider === "guest") return true;

        //Get guest
        const existingGuest = await getGuest(user.email);

        //Create guest if does not exists 
        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });

        
        return true;
      } catch (error) {
        return false;
      }
    },

    async jwt({ token, user, account }) {
      if (user) {
        const guest = user.guestId
          ? { id: user.guestId }
          : await getGuest(user.email);

        if (!guest) return null;

        token.guestId = guest.id;
        token.isGuest = account?.provider === "guest" || user.isGuest === true;

        if (token.isGuest) {
          token.guestExpiresAt =
            user.guestExpiresAt ?? Date.now() + GUEST_SESSION_MAX_AGE;
        }
      }

      if (
        token.isGuest &&
        (!token.guestExpiresAt || Date.now() > Number(token.guestExpiresAt))
      )
        return null;

      if (!token.email) return null;

      const guest = await getGuest(token.email);
      if (!guest) return null;

      token.guestId = guest.id;
      return token;
    },

    /** 
    This callback is called whenever a session is checked. 
    (i.e. when invoking the /api/session endpoint, using useSession or getSession).
    The return value will be exposed to the client, so be careful what you return here!.
    If you want to make anything available to the client which you've added to the token 
    through the JWT callback, you have to explicitly return it here as well.

    Note: By default, only a subset (email, name, image) of the token is returned for increased
    security. 

    Args: 
    The token argument is only available when using the jwt session strategy, 
    and the user argument is only available when using the database session strategy.
    */
    async session({ session, token }) {
      session.user.guestId = token.guestId;
      session.user.isGuest = token.isGuest === true;
      session.user.guestExpiresAt = token.guestExpiresAt ?? null;
      return session;
    },
  },

  /* When user is unauthorized then user is navigated to default signIn page provided by AuthJS library. 
  But we want user navigate to custom login page that we created. How to do ? 
  Adding pages in auth configuration file like below and specifying route for signIn option. 
  Same for sign out. 
  */
  pages: {
    signIn: "/login",
  },

});
/*  




Callbacks: First time app user: 


a. authorized: Invoked when a user needs authorization, using Middleware.
Step1: authorized called when navigating to account page because it requires authentication. 

b. signIn callback will be executed after signInAction executed but before the user signs in the app. 
Step2: signInAction called from  `_lib -> actions.js` 
Step3: signIn callback called  

Arguments: { user, account, profile } 

Usecase: 
-All possible operations of sign in process can be executed here. 
-It is like middleware that executes after the guest add their crendentials 
but before the user actually signs in the application. 
-Here, we will check if the logged in guest exists in guests table. 
If not then new guest will be created. 

  When guests logs in, guests data must be stored in order to make reservations,
  update the guest data and many more. 
  -If the currently logged in guests does not exists in guests table then 
  new guest will be created in guests table(supabase).
  -If the currently logged in guests exists in guests table then guestId is stored in session.

Return: It must return boolean value. 


b. session callback 
Step4: session callback called because Navigation comp called await auth() to get user session. 

Arguments: { session, user } 

Usecase: It is used to store currently logged in guest.id in session. 
Eg: Currently logged in guest id is required to make reservations, 
  update profile and many more.

So, after user has successfully signed in, this callback will be executed.
And guest data is fetched -> guestId is added to session -> session is returned. 

Now, we can get access to guestId in many places through session returned by auth(). 
And guests can make reservations, update id and many more. 
*/
