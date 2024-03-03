import React, { useState } from "react";
import { CgTrash } from "react-icons/cg";

interface CardProps {
    card: CardTypes;
    handleDeleteCard: (id: string) => void;
    handleEditCard: (value: { id: string, title: string, description: string }) => void;
}

export type CardTypes = {
    id: string;
    titulo: string;
    conteudo: string;
    lista: string;
};

const handleDragCard = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("id", id);
};

const Card = ({ card, handleDeleteCard, handleEditCard }: CardProps) => {
    const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
    const [isEditingDescription, setIsEditinDescription] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(card.titulo);
    const [description, setDescription] = useState<string>(card.conteudo)
    return (
        <section>
            <div
                draggable
                onDragStart={(e) => {
                    handleDragCard(e, card.id);
                }}
                onDragOver={(e) => e.preventDefault()}
                className="flex gap-4 w-full flex-col "
            >
                <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
                    {isEditingTitle ? (
                        <div className="text-md font-semibold ">
                            <textarea autoFocus className="w-full outline-none resize-none" rows={2} onBlur={() => {
                                setIsEditingTitle(false)
                                handleEditCard({ id: card.id, title, description })
                            }} value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                    ) : (
                        <p className="text-md font-semibold" onClick={() => setIsEditingTitle(true)}>{card.titulo}</p>
                    )}

                    {isEditingDescription ? (
                        <div className="text-gray-500 text-sm ">
                            <textarea autoFocus className="w-full outline-none resize-none" rows={4} onBlur={() => {
                                setIsEditinDescription(false)
                                handleEditCard({ id: card.id, title, description })
                            }} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm" onClick={() => setIsEditinDescription(true)}>{card.conteudo}</p>
                    )}


                    <div className="flex justify-end">
                        <CgTrash
                            className="h-5 w-5 text-gray-500 hover:text-red-500"
                            onClick={() => handleDeleteCard(card.id)}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Card;
