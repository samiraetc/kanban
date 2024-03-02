import React, { useState } from "react";
import Column, { ColumnTypes } from "../Column/Column";
import Card, { CardTypes } from "../Card/Card";
import Modal from "../Modal/Modal";

const columns = [
    {
        title: "To do",
        key: "to_do",
    },
    {
        title: "Doing",
        key: "doing",
    },
    {
        title: "Done",
        key: "done",
    },
];

const cards = [
    {
        id: "1",
        titulo: "Realizar teste",
        conteudo: "Conteudo",
        lista: "to_do",
    },
    {
        id: "2",
        titulo: "Gravar video",
        conteudo: "Conteudo",
        lista: "to_do",
    },

    {
        id: "3",
        titulo: "Fazer almoço",
        conteudo: "Conteudo",
        lista: "doing",
    },

    {
        id: "4",
        titulo: "Academia",
        conteudo: "Conteudo",
        lista: "done",
    },
];

const Board = () => {
    const [tasks, setTasks] = useState(cards);
    const [open, setOpen] = useState<boolean>(false)

    const handleUpdateTask = (item: CardTypes) => {
        const updatedCard = tasks.map((card) => {
            return card.id === item.id ? item : card;
        });

        setTasks(updatedCard);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, key: string) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("id");
        const cardFiltered = tasks.find((card) => card.id === cardId);
        cardFiltered && handleUpdateTask({ ...cardFiltered, lista: key });
    };

    const handleDeleteCard = (id: string) => {
        console.log(id)
    }

    const handleEditCard = (item: { id: string, title: string, description: string }) => {
        const cardFiltered = tasks.find((card) => card.id === item.id);
        cardFiltered && handleUpdateTask({ ...cardFiltered, titulo: item.title, conteudo: item.description });
    }

    const handleCloseModal = () => {
        setOpen(false)
    }


    return (
        <div className="bg-primary-gray p-4 m-6 rounded-lg flex justify-between">
            {columns.map((column: ColumnTypes, columnIndex: number) => {
                return (
                    <div
                        className="h-full"
                        onDropCapture={(e) => {
                            handleDrop(e, column.key);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                    >

                        <Column column={column} key={columnIndex}>
                            {column.key === "to_do" && (
                                <div
                                    className="text-center bg-gray-200 p-2 text-gray-500 rounded-lg hover:bg-gray-300 "
                                    onClick={() => setOpen(true)}

                                >
                                    <p className=" text-sm font-semibold ">+ Adicionar um cartão</p>
                                </div>
                            )}
                            {tasks.map((card: CardTypes, cardIndex: number) => {
                                return (
                                    card.lista === column.key && (
                                        <Card card={card} key={cardIndex} handleDeleteCard={handleDeleteCard} handleEditCard={handleEditCard} />
                                    )
                                );
                            })}
                        </Column>
                    </div>
                );
            })}

            <Modal open={open} close={handleCloseModal} />
        </div>


    );
};

export default Board;
