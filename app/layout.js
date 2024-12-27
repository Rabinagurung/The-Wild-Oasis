import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { ReservationProvider } from "./_components/ReservationContext";
import Header from "./_components/Header";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },

  description:
    "Luxurious cabin hotel, located in the heart of Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 
        min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}

/* Each Next js website needs to have Global Layout called Root Layout. 
This is this file. 
Its so much similar to Outlet component in React Router library. 
Like other pages, this layout is also server components. 
Server components that are rendered right on the server. 

RootLayout will be wrapped around entire application and 
will be applied to every single route. It needs to contain html and body tag. 
So, Global html structure will come from this root layout. 
Whatever we write into html will make it into the server side rendered html. 
Eg: lang attribute set to eng will make it into SSR html. 
head element will not needed here. 

In this Global Layout, navigation is required as we want navigation in all our pages. 

Whatever is rendered from RootLayout will be displayed on all pages.  
In order to display contents of each page, children prop plays an important role. 
During rendering, children prop will be populated with child page or child layout if exists. 
In our case, we only have this layout so whenever this root layout is rendered, 
children prop will be always populated with current page. 
Eg: If we have localhost:3000/account, then children prop will replaced with current page.
So, content of account page will be rendered. 

The content renderd by this global layout will be rendered in entire application,
whereas children prop will be dynamic.
*/

/*More: We can export some page metadata from this layout. 
page metadata: pages title. 
We will get <title>"The Wild Oasis"</title/> in page source just by exporting metadata from this layout. 

So, next js is all about conventions for names of the files. 
page.js will return us pages, 
layout.js will return us layout. 

Conventions about different variables that can be exported from pages or layouts. 
like: metadata. 

Conventions about we simply create routes by creating new folders. 
We have got about, account, cabins routes for now. 
*/

/* Next.js built in way of adding metadata to website. 
By exporting metadata as title: "The Wild Oasis", it will be added to <html> as <title> tag. 
text should be not manullay added to the <html> code like: title and metaTag. 
They should be added to metadata object thats Next.js convention. 

Since this layout is global layout, title also becomes global title. 
The metadata object can be added from each individual page that will overwrite the metadata from root layout. 


a. 
To configure website title like: About/The Wild Oasis, Cabins/The Wild Oasis
export const metadata = {
  title: {
    template: "%s / The Wild Oasis"
    default: "Welcome / The Wild Oasis"
  }
}, where %s will be replaced with exported title passed from individual pages. 


b. SEO which is page description. That's usally metatag in head but we will not do that manually but in Next.js way. 
SEO: Search Engine optimization. 
description can also be overwritten from other pages. 

c. To add fav icon for Next.js app, image should be named as "icon.png" and added at root of app folder. 

d. Loading and Optimizing Fonts: 
Next.js allows us to easily and automatically self host Google fonts that we want. 
Without font being downloaded from Google. 
It is good because it will prevent layout shifts, improve performance and privacy. 
It's always best to have those files on our server because that will make download them faster. 
If Google fonts are used, thats not good for privacy and might be problem with GDPR regulation. 
Its not good. 

Importing font function from next.js/fonts/google and passing few options: 
  subsets: sets of characters(can be latin, chinese anything), 
  display: way of displaying font when font is being downloaded. 
          It shows the default font first and once the font is downloaded it swaps with that font.  
  weight: This font is with variable font weight else we had to configure

Next.js will generate className that will reference font file that is self hosted. 
That file should be imported in body so entire webpage can get that font. 

If you want second font in heading then you can add font className only in that element. 
 */
