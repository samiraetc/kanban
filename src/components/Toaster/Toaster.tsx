import React, { Fragment, useContext, useEffect, useState } from "react";
import {
    HiOutlineCheckCircle,
    HiOutlineXMark,
    HiOutlineInformationCircle,
    HiOutlineXCircle,
} from "react-icons/hi2";
import { Transition } from "@headlessui/react";
import { ToasterContext } from "@/context/ToasterContext";

export default function Toaster() {
    const { toasterInfo, showToaster, setShowToaster } =
        useContext(ToasterContext);

    const getIcon = new Map([
        [
            "error",
            <HiOutlineXCircle className="size-6 text-red-400" aria-hidden="true" />,
        ],
        [
            "success",
            <HiOutlineCheckCircle
                className="size-5 text-green-600"
                aria-hidden="true"
            />,
        ],
        [
            "info",
            <HiOutlineInformationCircle
                className="size-5 text-blue-400"
                aria-hidden="true"
            />,
        ],
    ]);

    return (
        <>
            <div
                id="notification"
                aria-live="assertive"
                className="pointer-events-none fixed -inset-4 z-[1000] flex items-end px-4 py-6 transition-all duration-300 sm:items-start sm:p-6"
            >
                <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                    <Transition
                        show={showToaster}
                        as={Fragment}
                        enter="transition ease-in-out duration-500 transform"
                        enterFrom="translate-x-full -translate-y-full"
                        enterTo="translate-x-0 translate-y-0"
                        leave="transition ease-in-out duration-500 transform"
                        leaveFrom="translate-x-0 translate-y-0"
                        leaveTo="translate-x-full -translate-y-full"
                    >
                        <div
                            className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg  bg-white border border-gray-300`}
                        >
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="shrink-0">
                                        {getIcon.get(toasterInfo.type)}
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-700">{toasterInfo.title}</p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {toasterInfo.msg}
                                        </p>
                                    </div>
                                    <div className="ml-4 flex justify-center shrink-0">
                                        <button
                                            type="button"
                                            className="inline-flex cursor-pointer justify-center rounded-md bg-white text-gray-400 hover:text-gray-500"
                                            onClick={() => setShowToaster(false)}
                                        >
                                            <span className="sr-only">Close</span>
                                            <HiOutlineXMark className="size-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    );
}
