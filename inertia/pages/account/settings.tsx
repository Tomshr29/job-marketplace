import { LayoutAccount } from "~/components/layout/layout-account";
import { useForm, usePage } from "@inertiajs/react";
import { Button } from "~/components/Button";
import React from "react";

export default function Settings() {
  const { user } = usePage<any>().props;
  const { setData, post, progress, data, processing } = useForm<{
    avatar: File | null;
    firstName: string;
    lastName: string;
    email: string;
  }>({
    avatar: null,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
  });

  const isButtonDisabled = !data.avatar || processing;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post("/settings/avatar");
  }

  function updateUser(e: React.FormEvent) {
    e.preventDefault();
    post("/settings/update", {
      preserveScroll: true,
    });
  }

  return (
    <LayoutAccount>
      <div className="mb-6 space-y-8">
        <div className="">
          <h3 className="scale-y-95 text-2xl font-medium tracking-tight text-gray-800 antialiased dark:text-neutral-100">
            Paramètres
          </h3>
          <p className="scale-y-95 border-b pb-6 text-lg tracking-tight text-gray-600 antialiased dark:text-neutral-100">
            Real-time information and activities of your property.
          </p>
          <div>
            <div className="mt-4 flex items-center">
              <div>
                <h3 className="scale-y-95 text-2xl font-medium tracking-tight text-gray-800 antialiased dark:text-neutral-100">
                  Avatar
                </h3>
                <img
                  src={`/storage/uploads/${user.avatar}`}
                  alt={`Avatar de ${user.fullName}`}
                  className="mt-4 h-24 w-24 rounded-full border-neutral-800 object-cover shadow-lg"
                />
              </div>
              <form onSubmit={submit} className="mt-6 px-4">
                <Button variant="primary">
                  <label htmlFor="button2">Change</label>
                </Button>
                <input
                  hidden
                  name="button2"
                  id="button2"
                  type="file"
                  accept="image/*"
                  className="mt-1 w-full scale-y-95 text-lg tracking-tight text-gray-800"
                  onChange={(e) =>
                    setData("avatar", e.target.files?.[0] || null)
                  }
                />
              </form>
            </div>
          </div>
        </div>

        <div className="border-b pb-6">
          <h3 className="scale-y-95 text-2xl font-medium tracking-tight text-gray-800 antialiased dark:text-neutral-100">
            Full name
          </h3>
          <form onSubmit={updateUser}>
            <div className="mt-4 grid grid-cols-2 gap-6">
              <div>
                <label className="block scale-y-95 text-lg tracking-tight text-gray-900 antialiased dark:text-neutral-100">
                  First name
                </label>
                <input
                  type="text"
                  value={data.firstName}
                  onChange={(e) => setData("firstName", e.target.value)}
                />
              </div>
              <div>
                <label className="block scale-y-95 text-lg tracking-tight text-gray-900 antialiased dark:text-neutral-100">
                  Last name
                </label>
                <input
                  type="text"
                  value={data.lastName}
                  onChange={(e) => setData("lastName", e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <label className="block scale-y-95 text-lg tracking-tight text-gray-900 antialiased dark:text-neutral-100">
                  Adresse e-mail
                </label>
                <input
                  type="text"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 flex w-full justify-end">
              <Button type="submit" variant="secondary">
                Save
              </Button>
            </div>
          </form>
        </div>

        <div className="border-b pb-6">
          <h3 className="scale-y-95 text-2xl font-medium tracking-tight text-gray-800 antialiased dark:text-neutral-100">
            Account security
          </h3>
          <p className="scale-y-95 text-lg tracking-tight text-gray-600 antialiased dark:text-neutral-100">
            Manage your account security
          </p>
          <div className="mt-4 justify-start space-x-2">
            <Button variant="primary">Discard</Button>
            <Button variant="secondary">Accept</Button>
          </div>
        </div>
      </div>
    </LayoutAccount>
  );
}
