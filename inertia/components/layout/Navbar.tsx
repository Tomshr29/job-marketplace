import { Link } from "@inertiajs/react";
import type User from "#models/user";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const userNavigation = [
  { name: "Your Profile", href: "/account/settings" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export function Navbar({ user }: { user: User }) {
  return (
    <header className="dark:bg-neutral-950">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-10">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="block scale-y-95 text-xl font-medium tracking-tight text-neutral-700 antialiased">
              T29 Development
            </span>
          </Link>
        </div>
        <div className="">
          {user ? (
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton>
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src={`/storage/uploads/${user.avatar}`}
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none"
              >
                {userNavigation.map((item) => (
                  <MenuItem key={item.name}>
                    <Link
                      href={item.href}
                      className="block scale-y-95 px-4 py-2 font-medium tracking-tight text-gray-700 antialiased"
                    >
                      {item.name}
                    </Link>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          ) : (
            <Link
              href="/login"
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
            >
              <span className="mb-0.5 block scale-y-90 font-bold uppercase tracking-tight antialiased">
                Login
              </span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
