import { useState } from "react";
import { Property } from "#types/property";
import { Link } from "@inertiajs/react";
import { Button } from "~/components/button";
import Card from "~/components/Card";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

type Props = {
  properties: Property[];
};

export default function Index({ properties }: Props) {
  let [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const filteredProperties = properties.filter((property) => {
    const price = property.price;

    const isMinPriceValid = minPrice ? price >= Number(minPrice) : true;
    const isMaxPriceValid = maxPrice ? price <= Number(maxPrice) : true;
    const isTypeValid = selectedType ? property.type === selectedType : true;

    return isMinPriceValid && isMaxPriceValid && isTypeValid;
  });

  return (
    <div className="h-full">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h3 className="scale-y-95 text-2xl font-medium tracking-tight text-gray-800 antialiased dark:text-neutral-100">
            Properties
          </h3>
          <p className="scale-y-95 border-b pb-6 text-lg tracking-tight text-gray-600 antialiased dark:text-neutral-100">
            Real-time information and activities of your property.
          </p>
        </div>
        <div className="space-x-3">
          <Link href="/property/create" className="mb-6">
            <Button variant="secondary">Create</Button>
          </Link>
          <Button onClick={open} variant="primary">
            Open dialog
          </Button>
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <div className="flex flex-col">
          <label className="scale-y-90 font-bold uppercase tracking-tight text-gray-800 antialiased">
            Min Price
          </label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="100 000 €"
            className="rounded-lg border p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="scale-y-90 font-bold uppercase tracking-tight text-gray-800 antialiased">
            Max Price
          </label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="240 000 €"
            className="rounded-lg border p-2"
          />
        </div>

        {/* Property Type Filter */}
        <div className="flex w-full flex-col">
          <label className="scale-y-90 font-bold uppercase tracking-tight text-gray-800 antialiased">
            Property Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-lg border p-2"
          >
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
          </select>
        </div>
      </div>

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
              className="h-80 w-full max-w-4xl rounded-xl border bg-white p-6 backdrop-blur-2xl duration-300 ease-out"
            >
              <DialogTitle
                as="h3"
                className="scale-y-95 text-2xl font-medium tracking-tight text-gray-800 antialiased"
              >
                Payment successful
              </DialogTitle>
              <p className="mt-2 scale-y-95 text-lg font-medium tracking-tight text-neutral-700 antialiased">
                Your payment has been successfully submitted. We’ve sent you an
                email with all of the details of your order.
              </p>
              <div className="mt-4">
                <Button onClick={close}>Got it, thanks!</Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* Résultats */}
      <div className="mt-6 grid h-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {filteredProperties.length === 0 ? (
          <span className="mx-auto flex w-full items-center justify-center bg-red-500">
            No properties found
          </span>
        ) : (
          filteredProperties.map((property) => (
            <Link key={property.id} href={`/property/${property.id}`}>
              <Card property={property} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
