import React from "react";
import { Fragment } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const ProfileDropdown = () => {
    const { data: session } = useSession();

    return (
        <div>
            {session && (
                <Menu as="div" className="relative">
                    <div>
                        <Menu.Button
                            data-testid="user-configs"
                            className="lg:flex bg-light-green rounded-full border border-strong-green text-sm text-transparent-black font-semibold  p-2"
                        >
                            {`${session?.user?.fist_name.substring(0, 1)}${session?.user?.last_name.substring(0, 1)}`}
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 arrow w-24 origin-top-right rounded-md bg-white py-1 text-left shadow-lg ring-1 ring-black/5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        onClick={(e) => {
                                            e.preventDefault();
                                            signOut()
                                        }}
                                        href=""
                                        className={`${active ? "bg-gray-100" : ""}
                       flex justify-start gap-x-1 whitespace-nowrap px-4 py-2 text-sm`}
                                    >
                                        Sair
                                    </Link>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            )}
        </div>
    );
};

export default ProfileDropdown;
