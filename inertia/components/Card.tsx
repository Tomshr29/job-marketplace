import { Property } from "#types/property";
import { format } from "date-fns";

type Props = {
  property: Property;
};

export default function Card({ property }: Props) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "yyyy-MM-dd");
  };

  return (
    <div key={property.id} className="p-2 transition-shadow hover:shadow-lg">
      <img
        alt={property.title}
        src={`/storage/uploads/${property.avatarProperty}`}
        className="size-60 object-cover"
      />
      {/* <span>{formatDate(property.createdAt)}</span> */}
      <ul>
        {Object.entries(property).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {String(value)}
          </li>
        ))}
      </ul>
    </div>
  );
}
