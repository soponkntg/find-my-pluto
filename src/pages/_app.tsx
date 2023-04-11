import "@/styles/globals.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-toastify/dist/ReactToastify.css";

import { Navbar, NavigationBar } from "@/component";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import { Prompt } from "next/font/google";
import { Amplify } from "aws-amplify";
import awsConfig from "../aws-exports";
import AuthContext from "@/context/AuthContext";
import UIContext, { useUI } from "@/context/UIContext";
import { Form } from "@/component/Form";

interface Props {
  children: React.ReactElement;
}

const prompt = Prompt({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-prompt",
});

const ContextProvider = ({ children }: Props) => (
  <UIContext>
    <AuthContext>{children}</AuthContext>
  </UIContext>
);

export default function App({ Component, pageProps }: AppProps) {
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

  return (
    <UIContext>
      <AuthContext>
        <main className={`${prompt.variable} font-sans`}>
          <ToastContainer />
          <Form />
          <Navbar />
          <Component {...pageProps} />
          <NavigationBar />
        </main>
      </AuthContext>
    </UIContext>
  );
}
