import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
    open: boolean;
    close: () => void;
    addNew: (title: string, description: string, list: string) => void;
}

const Modal = ({ open, close, addNew }: ModalProps) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleCloseModal = () => {

        close()
        setTitle('')
        setDescription('')
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={close}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-60 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg  bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div className="flex flex-col gap-2">

                                    <div className="text-md font-semibold ">
                                        <textarea
                                            autoFocus
                                            className="w-full outline-none resize-none"
                                            value={title}
                                            rows={2}
                                            placeholder="Titulo"
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>



                                    <div className="text-gray-500 text-sm ">
                                        <textarea
                                            autoFocus
                                            rows={4}
                                            className="w-full outline-none resize-none"
                                            value={description}
                                            placeholder="Descrição"
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <button className="rounded-xl w-24 p-2 text-center text-gray-700 bg-light-green font-semibold text-sm" onClick={() => { addNew(title, description, 'to_do'); handleCloseModal() }}>Salvar</button>
                                    </div>

                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Modal;
