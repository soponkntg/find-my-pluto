import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const PageLayout = ({ children }: Props) => (
  <div className="flex-center">
    <div className="max-width padding w-full">{children}</div>
  </div>
);
