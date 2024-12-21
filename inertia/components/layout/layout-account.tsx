import { Link, usePage } from "@inertiajs/react";

interface Props {
  children: React.ReactNode;
}

export function LayoutAccount(props: Props) {
  const { children } = props;
  const { url } = usePage();

  const links = [
    { name: "Paramètres", href: "/account/settings" },
    { name: "Mes propriétés", href: "/account/tools" },
    { name: "Notifications", href: "#" },
  ];

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:pt-0">
      <aside className="h-full w-full lg:w-80 lg:border-r">
        <div className="flex flex-col space-y-3 lg:pr-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`rounded-[7px] p-3 text-neutral-800 ${url === link.href ? "bg-blue-500 text-white" : ""}`}
            >
              <h3 className="scale-y-95 text-lg font-medium tracking-tight antialiased">
                {link.name}
              </h3>
            </Link>
          ))}
        </div>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
