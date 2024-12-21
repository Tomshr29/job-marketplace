import { useForm } from "@inertiajs/react";

export const BuyButton = () => {
  const { post } = useForm();

  return (
    <form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        post("/stripe/subscription");
      }}
    >
      <button type="submit">Upgrade to MASTER PLAN</button>
    </form>
  );
};
