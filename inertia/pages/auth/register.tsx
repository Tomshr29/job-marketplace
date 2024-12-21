import { Link, useForm } from "@inertiajs/react";
import { Button } from "~/components/Button";

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post("/register", {
      onSuccess: () => window.location.reload(),
    });
  }

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center text-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 scale-y-95 transform text-4xl font-semibold tracking-tighter antialiased">
          Register an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
        <form onSubmit={submit} className="space-y-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label htmlFor="fullName" className="block text-start">
                <span className="mb-0.5 block scale-y-90 font-semibold uppercase tracking-tight text-neutral-800 antialiased">
                  first name
                </span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="fullName"
                  value={data.firstName}
                  onChange={(e) => setData("firstName", e.target.value)}
                />
                {errors.firstName && <div>{errors.firstName}</div>}
              </div>
            </div>

            <div>
              <label htmlFor="fullName" className="block text-start">
                <span className="mb-0.5 block scale-y-90 font-semibold uppercase tracking-tight text-neutral-800 antialiased">
                  Last name
                </span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastName"
                  value={data.lastName}
                  onChange={(e) => setData("lastName", e.target.value)}
                />
                {errors.lastName && <div>{errors.lastName}</div>}
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="email" className="block text-start">
                <span className="mb-0.5 block scale-y-90 font-semibold uppercase tracking-tight text-neutral-800 antialiased">
                  Email
                </span>
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                />
                {errors.email && <div>{errors.email}</div>}
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="password" className="block text-start">
                <span className="mb-0.5 block scale-y-90 font-semibold uppercase tracking-tight text-neutral-800 antialiased">
                  Password
                </span>
              </label>
              <div className="mt-2"></div>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
              />
              {errors.password && <div>{errors.password}</div>}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={processing}
              size="large"
              variant="secondary"
            >
              Register
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="bg-[#fae100] font-medium text-neutral-950 antialiased"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
