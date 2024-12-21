import { useForm } from "@inertiajs/react";

export default function UserSettings() {
  const { post, processing, errors } = useForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/stripe/portal", {
      onFinish: () => {
        console.log("Demande envoyée pour accéder au portail Stripe.");
      },
      onError: () => {
        console.error("Une erreur s'est produite lors de la demande.");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={processing}>
        {processing ? "Chargement..." : "Account Settings"}
      </button>

      {errors && <div style={{ color: "red" }}>{errors.message}</div>}
    </form>
  );
}
