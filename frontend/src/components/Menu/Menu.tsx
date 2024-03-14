import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { routeModule } from "next/dist/build/templates/app-page";
import { useRouter } from "next/router";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function Menu() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <header className="bg-white fixed w-full p-3  border-b text-transparent-black">
      <nav
        className="mx-auto flex w-full items-center justify-between lg:px-8"
        aria-label="Global"
      >
        <div className="flex gap-2">

        </div>

        <ProfileDropdown />
      </nav>
    </header>
  );
}
