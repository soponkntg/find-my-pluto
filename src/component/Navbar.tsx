import Image from "next/image";
import logo from "../../public/logo.png";
import { navlink } from "@/constant/text.js";
import Link from "next/link";

import { UserIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import { useUser } from "@/context/AuthContext";

export const Navbar = () => {
  const router = useRouter();
  const userContext = useUser();
  return (
    <nav className="bg-primary shadow-navbar flex-center">
      <div className="w-full max-width flex py-1 padding-x justify-between items-center">
        <div className="relative w-[238px] h-[72px]">
          <Link href={"/"}>
            <Image src={logo} alt="find-my-pluto" fill className="bg-contain" />
          </Link>
        </div>
        <ul className="xs:flex list-none space-x-4 hidden">
          {navlink.map((link) => (
            <li
              key={link.id}
              className={`navlink ${
                router.pathname == link.slug ? "text-white" : "text-dimWhite/50"
              }`}
            >
              <Link href={link.slug}>{link.title}</Link>
            </li>
          ))}
          <li className="navlink">
            {userContext.user ? (
              <Link href={"/profile"}>
                <UserIcon
                  className={`w-6 h-6 ${
                    router.pathname == "/profile" ? "text-white" : "text-dimWhite/50"
                  }`}
                />
              </Link>
            ) : (
              <UserIcon
                className={`w-6 h-6 text-dimWhite/50`}
                onClick={() => Auth.federatedSignIn()}
              />
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
