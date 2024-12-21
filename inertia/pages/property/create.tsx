import { Button } from "~/components/Button";
import { useForm } from "@inertiajs/react";

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    street: "",
    postalCode: "",
    city: "",
    price: "",
    avatarProperty: null,
    type: "house",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data before submission:", data);
    post("/property", {
      onSuccess: () => {
        // Réinitialiser les champs après succès (optionnel)
      },
    });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="">
        <h3 className="scale-y-95 text-2xl font-medium tracking-tight text-gray-800 antialiased dark:text-neutral-100">
          Create Property
        </h3>
        <p className="scale-y-95 border-b pb-6 text-lg tracking-tight text-gray-600 antialiased dark:text-neutral-100">
          Add a new property to the list.
        </p>
      </div>

      {/* Formulaire pour créer une nouvelle propriété */}
      <form onSubmit={handleSubmit} className="my-4 space-y-4">
        {/* Titre */}
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
            setData("avatarProperty", e.target.files?.[0] || null)
          }
        />
        <div>
          <label className="block scale-y-95 text-lg tracking-tight text-gray-900 antialiased dark:text-neutral-100">
            Street
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={data.street}
            onChange={(e) => setData("street", e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        {/* Description */}
        <div>
          <label className="block scale-y-95 text-lg tracking-tight text-gray-900 antialiased dark:text-neutral-100">
            Postal Code
          </label>
          <input
            type="text"
            id="title"
            name="description"
            value={data.postalCode}
            onChange={(e) => setData("postalCode", e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        {/* Adresse */}
        <div>
          <label className="block scale-y-95 text-lg tracking-tight text-gray-900 antialiased dark:text-neutral-100">
            City
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={data.city}
            onChange={(e) => setData("city", e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        {/* Prix */}
        <div className="mb-10">
          <label className="block scale-y-95 text-lg tracking-tight text-gray-900 antialiased dark:text-neutral-100">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={data.price}
            onChange={(e) => setData("price", e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
          {errors.price && (
            <div className="text-sm text-red-500">{errors.price}</div>
          )}
        </div>
        <div className="mb-10">
          <label className="block scale-y-95 text-lg tracking-tight text-gray-900 antialiased dark:text-neutral-100">
            Property Type
          </label>
          <select
            id="type"
            name="type"
            value={data.type}
            onChange={(e) => setData("type", e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          >
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
          </select>
          {errors.type && (
            <div className="text-sm text-red-500">{errors.type}</div>
          )}
        </div>
        <div className="mt-12">
          <Button
            type="submit"
            variant="secondary"
            className="w-full"
            disabled={processing}
          >
            Submit Property
          </Button>
        </div>
      </form>
    </div>
  );
}
