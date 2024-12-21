import { Property } from "../../../types/property";

interface ShowProps {
  property: Property;
}

export default function Show({ property }: ShowProps) {
  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-6 text-4xl font-extrabold text-gray-800">
        {property.title}
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Description */}
        <div>
          <p className="text-xl font-medium text-gray-600">Description</p>
          <p className="mt-2 text-lg text-gray-800">{property.description}</p>
        </div>

        {/* Image */}
        <img
          className="h-64 w-full rounded-lg object-cover"
          src={`/storage/uploads/${property.avatarProperty}`}
          alt={property.title}
        />
        {/* Address */}
        <div>
          <p className="text-xl font-medium text-gray-600">Address</p>
          <p className="mt-2 text-lg text-gray-800">{property.address}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Price */}
        <div>
          <p className="text-xl font-medium text-gray-600">Price</p>
          <p className="mt-2 text-lg text-gray-800">
            ${property.price.toLocaleString()}
          </p>
        </div>

        {/* Bedrooms */}
        <div>
          <p className="text-xl font-medium text-gray-600">Bedrooms</p>
          <p className="mt-2 text-lg text-gray-800">{property.bedrooms}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Bathrooms */}
        <div>
          <p className="text-xl font-medium text-gray-600">Bathrooms</p>
          <p className="mt-2 text-lg text-gray-800">{property.bathrooms}</p>
        </div>

        {/* Area */}
        <div>
          <p className="text-xl font-medium text-gray-600">Area</p>
          <p className="mt-2 text-lg text-gray-800">{property.area} m²</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Type */}
        <div>
          <p className="text-xl font-medium text-gray-600">Type</p>
          <p className="mt-2 text-lg text-gray-800">{property.type}</p>
        </div>

        {/* Status */}
        <div>
          <p className="text-xl font-medium text-gray-600">Status</p>
          <p className="mt-2 text-lg text-gray-800">{property.status}</p>
        </div>
      </div>

      {/* Owner */}
      <div className="mt-6">
        <p className="text-xl font-medium text-gray-600">Owner</p>
        <p className="mt-2 text-lg text-gray-800">{property.owner?.fullName}</p>
      </div>
    </div>
  );
}
