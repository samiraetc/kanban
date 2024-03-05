import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CardTypes } from "../Card/Card";
import { RiCloseLine } from "react-icons/ri";

interface ModalProps {
    open: boolean;
    close: () => void;
    addNew?: (title: string, description: string, list: string) => void;
    editCard?: (value: {
        id: string;
        title: string;
        description: string;
    }) => void;
    list?: string;
    card?: CardTypes;
}

const Modal = ({
    open,
    close,
    addNew,
    list = "to_do",
    card,
    editCard,
}: ModalProps) => {
    const [title, setTitle] = useState<string>(card?.id ? card?.titulo : "");
    const [description, setDescription] = useState<string>(card?.id ? card?.conteudo : "");

    const handleCloseModal = () => {
        close();
        !card && setTitle('')
        !card && setDescription('')
    };

    useEffect(() => {
        if(card) {
            setTitle(card?.titulo)
            setDescription(card?.conteudo)
        }
    }, [editCard])

    return (
        <Transition.Root show={open} as={Fragment} key={card?.id ?? 'index'}>
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
                                    <div className="flex text-md font-semibold ">
                                        <textarea
                                            autoFocus
                                            className="w-full outline-none resize-none"
                                            value={title}
                                            rows={2}
                                            placeholder="Titulo"
                                            onChange={(e) => setTitle(e.target.value)}
                                        />

                                        <RiCloseLine className="h-6 w-6 text-gray-400" onClick={handleCloseModal} />
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

                                    <div className="flex justify-end gap-4">
                                        <button
                                            className="rounded-xl w-24 p-2 text-center text-red-700 bg-light-red font-semibold text-sm"
                                            onClick={handleCloseModal}
                                        >
                                            Cancelar
                                        </button>
                                        {addNew && (
                                            <button
                                                className="rounded-xl w-24 p-2 text-center text-gray-700 bg-light-green font-semibold text-sm"
                                                onClick={() => {
                                                    addNew(title, description, list);
                                                    handleCloseModal();
                                                }}
                                            >
                                                Criar
                                            </button>
                                        )}
                                        {editCard && card && (
                                            <button
                                                className="rounded-xl w-24 p-2 text-center text-gray-700 bg-light-green font-semibold text-sm"
                                                onClick={() => {
                                                    editCard({ id: card?.id, title, description });
                                                    handleCloseModal();
                                                }}
                                            >
                                                Salvar
                                            </button>
                                        )}
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
