import { Navbar, NavigationBar, PageLayout } from "@/component";
import { useContext, createContext } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Prompt } from "next/font/google";
import { useEffect, useState } from "react";
import { Amplify, Auth, Hub } from "aws-amplify";
import awsConfig from "../aws-exports";

const prompt = Prompt({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-prompt",
});

export const UserContext = createContext<{
  user: {} | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}>({ user: null, setUser: () => {} });

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          getUser().then((userData) => setUser(userData));
          break;
        case "signOut":
          setUser(null);
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data);
          break;
      }
    });

    getUser().then((userData) => setUser(userData));
  }, []);

  const isLocalhost = process.env.NODE_ENV === "development";

  const [localRedirectSignIn, productionRedirectSignIn] = awsConfig.oauth.redirectSignIn.split(",");

  const [localRedirectSignOut, productionRedirectSignOut] =
    awsConfig.oauth.redirectSignOut.split(",");

  const updatedAwsConfig = {
    ...awsConfig,
    oauth: {
      ...awsConfig.oauth,
      redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
      redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
    },
  };

  Amplify.configure(updatedAwsConfig);

  const getUser = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      return userData;
    } catch {
      return console.log("Not signed in");
    }
  };

  return (
    <main className={`${prompt.variable} font-sans`}>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <div className="min-h-[calc(100vh-128px)]">
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </div>
        <NavigationBar />
      </UserContext.Provider>
    </main>
  );
}
