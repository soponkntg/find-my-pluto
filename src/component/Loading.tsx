import { useDataContext } from "@/context/DataContext";

export const Loading = () => {
  const { loading } = useDataContext();

  if (!loading) {
    return null;
  }
  return (
    <div className="fixed w-full h-full z-50 bg-blackdrop flex-center">
      <div className="h-14 w-14 rounded-full bg-secondary animate-bounce"></div>
    </div>
  );
};
