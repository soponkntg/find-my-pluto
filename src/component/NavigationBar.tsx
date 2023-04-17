import { navlink } from "@/constant/text";
import { useDataContext } from "@/context/DataContext";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

export const NavigationBar = () => {
  const router = useRouter();
  const { user, signin } = useDataContext();
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
          {user ? (
            <Link href={"/profile"}>
              <UserIcon
                className={`w-6 h-6 ${
                  router.pathname == "/profile" ? "text-white" : "text-dimWhite/50"
                }`}
              />
            </Link>
          ) : (
            <UserIcon className={`w-6 h-6 text-dimWhite/50`} onClick={() => signin()} />
          )}
        </li>
      </ul>
    </div>
  );
};
