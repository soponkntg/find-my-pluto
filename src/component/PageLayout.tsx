import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const PageLayout = ({ children }: Props) => (
  <div className="flex justify-center min-h-[calc(100vh-136px)]">
    <div className="max-width padding w-full relative">{children}</div>
  </div>
);
