import { navlink } from "@/constant/text";
import { UserContext } from "@/pages/_app";
import { UserIcon } from "@heroicons/react/24/outline";
import { Auth } from "aws-amplify";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

export const NavigationBar = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  return (
    <div className="w-full bg-primary py-4 px-20 xs:hidden bottom-0 sticky">
      <ul className="flex justify-between w-full list-none">
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
  );
};
