import { Link, useForm } from "@inertiajs/react";
import { Button } from "~/components/Button";

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post("/login", {
      onSuccess: () => window.location.reload(),
    });
  }

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center rounded-lg py-10 text-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <h2 className="mt-10 scale-y-95 transform text-4xl font-semibold tracking-tighter antialiased">
          Login an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
        <form onSubmit={submit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-start">
              <span className="mb-0.5 block scale-y-90 text-sm font-semibold uppercase tracking-tight text-neutral-800 antialiased">
                Email
              </span>
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                placeholder="you@example.com"
              />
              {errors.email && <div>{errors.email}</div>}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-start">
              <span className="mb-0.5 block scale-y-95 text-sm font-semibold uppercase tracking-tighter text-neutral-800 antialiased">
                Password
              </span>
            </label>
            <div className="mt-2"></div>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              placeholder="cafuezrhze"
            />
            <p className="mb-8 mt-2 text-start">
              <Link
                href="/register"
                className="scale-y-95 tracking-tight text-blue-500 underline hover:text-blue-400"
              >
                Mot de passe oublié ?
              </Link>
            </p>
            {errors.password && <div>{errors.password}</div>}
          </div>

          <div>
            <Button
              type="submit"
              disabled={processing}
              size="large"
              variant="secondary"
            >
              Login
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center">
          <Link
            href="/register"
            className="scale-y-95 tracking-tight text-blue-500 underline hover:text-blue-400"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
