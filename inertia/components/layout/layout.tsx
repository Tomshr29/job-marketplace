import { ThemeProvider } from "~/context/ThemeContext";
import { Navbar } from "./Navbar";

interface Props {
  children: React.ReactNode;
  user?: any;
}

export function Layout(props: Props) {
  const { children, user } = props;

  return (
    <ThemeProvider>
      <div className="min-h-screen dark:bg-neutral-950">
        <Navbar user={user} />
        <div className="px-10">{children}</div>
      </div>
    </ThemeProvider>
  );
}
