import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "~/components/Button";

export default function Home() {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <main className="mx-auto mt-20 max-w-7xl space-y-10">
      <div className="flex scale-y-95 flex-col space-y-10 text-6xl antialiased">
        <span className="font-semibold tracking-tighter">
          Rapidly build modern websites without ever leaving your AdonisJS.
        </span>
        <span className="text-xl font-medium tracking-tight text-neutral-700">
          AdonisJS is a fullstack framework that allows you to build modern
          websites using the latest technologies like React, Vue, and Tailwind
          CSS. It comes with a powerful CLI that allows you to scaffold new apps
          in seconds.
        </span>
      </div>
      <div className="space-x-3">
        <Link href="/property">
          <Button variant="primary">Discard</Button>
        </Link>
        <Button onClick={open} variant="secondary">
          Open dialog
        </Button>
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
              className="w-full max-w-md rounded-xl border bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out"
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
    </main>
  );
}
