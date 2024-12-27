import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* <Image width="60" height="60" src="/logo.png" alt="The Wild Oasis Logo" /> */}
      <Image
        src={logo}
        width="60"
        height="60"
        alt="The Wild Oasis Logo"
        quality={100}
        placeholder="blur"
      />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;

/* In order to make folder private and opt folder out of route, next.js convention _ is used. 
Eg: components is also folder in app and components route will also be created. 
In order to make it private and opt it out of route, _components is used. 
Now, no route will be created for this folder. 

Important: Next.js also support import alasis: jsconfig.json file 
It avoid deep fold structure. 
Eg: "@/app/_components "
*/

/*Optimizing images: by statically importing image like logo and we can confgiure quality prop. 
<Image/> from NEXT adds more functionality like lazy loading, prevent layout shifts by making sure that dimensions are added */
