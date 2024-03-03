import React, { useEffect, useState } from "react";
import Column, { ColumnTypes } from "../Column/Column";
import Card, { CardTypes } from "../Card/Card";
import Modal from "../Modal/Modal";
import useFetch from "@/hook/useFetch";
import { error } from "console";

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

const Board = () => {
    const { getCards, updateCard, removeCard, addCard } = useFetch();
    const [tasks, setTasks] = useState<CardTypes[]>();
    const [open, setOpen] = useState<boolean>(false);



    useEffect(() => {
        (async () => {
            setTasks(await getCards());
        })();
    }, []);



    const handleUpdateTask = (item: CardTypes) => {
        setTasks((prevTasks) =>
            prevTasks?.map((card) => (card.id === item.id ? item : card))
        );
    };

    const handleDrop = async (
        e: React.DragEvent<HTMLDivElement>,
        key: string
    ) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("id");
        const cardFiltered = tasks?.find((card) => card.id === cardId);

        if (cardFiltered) {

            handleUpdateTask({ ...cardFiltered, lista: key });
            await updateCard({ ...cardFiltered, lista: key });

        }
    };

    const handleDeleteCard = async (id: string) => {
        const remove = tasks?.find((task) => task.id === id);



        remove && setTasks(await removeCard(id));

    };

    const handleEditCard = async (item: {
        id: string;
        title: string;
        description: string;
    }) => {
        const cardFiltered = tasks?.find((card) => card.id === item.id);


        if (cardFiltered) {
            await updateCard({
                ...cardFiltered,
                titulo: item.title,
                conteudo: item.description,
            });

            setTasks(
                tasks?.map((task) =>
                    task.id === item.id
                        ? { ...task, titulo: item.title, conteudo: item.description }
                        : task
                )
            );
        }

    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleAddNewCard = async (
        title: string,
        description: string,
        list: string
    ) => {
        await addCard({ titulo: title, conteudo: description, lista: list });
    };

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
                                    key={columnIndex}
                                >
                                    <p className=" text-sm font-semibold ">
                                        + Adicionar um cartão
                                    </p>
                                </div>
                            )}
                            {tasks?.map((card: CardTypes, cardIndex: number) => {
                                return (
                                    card.lista === column.key && (
                                        <Card
                                            card={card}
                                            key={cardIndex}
                                            handleDeleteCard={handleDeleteCard}
                                            handleEditCard={handleEditCard}
                                        />
                                    )
                                );
                            })}
                        </Column>
                    </div>
                );
            })}

            <Modal open={open} close={handleCloseModal} addNew={handleAddNewCard} />
        </div>
    );
};

export default Board;
