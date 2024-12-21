import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Link, useForm } from "@inertiajs/react";
import { useTheme } from "~/context/ThemeContext";

export default function DropdownMenu({ user }: { user: any }) {
  const { post } = useForm();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="">
      <Menu>
        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img
            alt=""
            src={`/storage/uploads/${user.avatar}`}
            className="size-8 rounded-full object-cover"
          />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-neutral-200 bg-white p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <Link
              href="/account/tools"
              className="group flex w-full items-center px-3 py-1.5 text-[15px] font-medium text-neutral-950 antialiased dark:text-neutral-200"
            >
              <h3 className="scale-y-95 text-lg font-medium tracking-tight antialiased">
                Annonces
              </h3>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/account/settings"
              className="group flex w-full items-center px-3 py-1.5 text-[15px] font-medium text-neutral-950 antialiased dark:text-neutral-200"
            >
              <h3 className="scale-y-95 text-lg font-medium tracking-tight antialiased">
                Account
              </h3>
            </Link>
          </MenuItem>
          <div className="my-1 h-px bg-black/5 dark:bg-white/50" />
          <MenuItem>
            <button
              onClick={toggleTheme}
              className="group flex w-full items-center px-3 py-1.5 text-[15px] font-medium text-neutral-950 antialiased dark:text-neutral-200"
            >
              <h3 className="scale-y-95 text-lg font-medium tracking-tight antialiased">
                Mode sombre
              </h3>
            </button>
          </MenuItem>
          <MenuItem>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                post("/logout", {
                  onSuccess: () => window.location.reload(),
                });
              }}
            >
              <button className="group flex w-full items-center px-3 py-1.5 text-[15px] font-medium text-neutral-950 antialiased dark:text-neutral-200">
                <h3 className="scale-y-95 text-lg font-medium tracking-tight antialiased">
                  Log out
                </h3>
              </button>
            </form>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
