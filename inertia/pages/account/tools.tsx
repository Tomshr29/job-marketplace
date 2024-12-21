import { LayoutAccount } from "~/components/layout/layout-account";
import { Link } from "@inertiajs/react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { Button } from "~/components/Button";

export default function Tools({ myProperty }: { myProperty: any }) {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  console.log(myProperty);

  return (
    <LayoutAccount>
      <div className="mb-6 space-y-8">
        <div className="">
          <h3 className="scale-y-95 text-2xl font-medium tracking-tight text-gray-800 antialiased dark:text-neutral-100">
            Mes propriétés
          </h3>
          <p className="scale-y-95 border-b pb-6 text-lg tracking-tight text-gray-600 antialiased dark:text-neutral-100">
            List of all your properties.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Street
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Postal Code
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  City
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {myProperty.map((property) => (
                <>
                  <tr key={property.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {property.street}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {property.postalCode}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {property.city}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      ${property.price}
                    </td>
                    <td>
                      <Button onClick={open} variant="secondary">
                        Delete
                      </Button>
                    </td>
                  </tr>
                  <Dialog
                    open={isOpen}
                    as="div"
                    className="relative z-10 focus:outline-none"
                    onClose={close}
                  >
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                          transition
                          className="w-full max-w-md rounded-xl border bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out"
                        >
                          <DialogTitle
                            as="h3"
                            className="scale-y-95 text-2xl font-medium tracking-tight text-gray-800 antialiased"
                          >
                            Delete property
                          </DialogTitle>
                          <p className="mt-2 scale-y-95 text-lg font-medium tracking-tight text-neutral-700 antialiased">
                            Are you sure you want to delete this property?
                          </p>
                          <div className="mt-4 flex space-x-4">
                            <Button onClick={close}>NOOOOO</Button>
                            <Link
                              method="delete"
                              href={`/property/${property.id}/delete`}
                            >
                              YESSSS DELETE
                            </Link>
                          </div>
                        </DialogPanel>
                      </div>
                    </div>
                  </Dialog>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutAccount>
  );
}
