import React, { useEffect, useState } from "react";
import Column, { ColumnTypes } from "../Column/Column";
import Card, { CardTypes } from "../Card/Card";
import Modal from "../Modal/Modal";
import useFetch from "@/hook/useFetch";
import Loading from "../Loading/Loading";

const Board = () => {
    const { getCards, updateCard, removeCard, addCard, getColumns } = useFetch();
    const [tasks, setTasks] = useState<CardTypes[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [list, setList] = useState<string>("to_do");
    const [columns, setColumns] = useState<ColumnTypes[]>([]);

    useEffect(() => {
        (async () => {
            setTasks(await getCards());
            setColumns(await getColumns())
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
        const cardFiltered: CardTypes | undefined = tasks?.find(
            (card) => card.id === cardId
        );

        if (cardFiltered) {
            handleUpdateTask({ ...cardFiltered, lista: key });
            await updateCard({ ...cardFiltered, lista: key });
        }
    };

    const handleDeleteCard = async (id: string) => {
        const remove: CardTypes | undefined = tasks?.find((task) => task.id === id);
        remove && setTasks(await removeCard(id));
    };

    const handleEditCard = async (item: {
        id: string;
        title: string;
        description: string;
    }) => {
        const cardFiltered: CardTypes | undefined = tasks?.find(
            (card) => card.id === item.id
        );

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
        const newCard: CardTypes | undefined = await addCard({
            titulo: title,
            conteudo: description,
            lista: list,
        });
        newCard && setTasks([...tasks, newCard]);
    };

    return columns.length >= 1 ? (
        <div className="bg-primary-gray p-4 m-6 rounded-lg flex lg:flex-row flex-col justify-between">
            {columns?.map((column: ColumnTypes, columnIndex: number) => {
                return (
                    <div
                        className="h-full"
                        onDropCapture={(e) => {
                            handleDrop(e, column.key);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <Column column={column} key={columnIndex}>
                            <div
                                className="text-center bg-gray-200 p-2 text-gray-500 rounded-lg hover:bg-gray-300 "
                                onClick={() => {
                                    setOpen(true);
                                    setList(column.key);
                                }}
                                key={columnIndex}
                            >
                                <p className=" text-sm font-semibold ">+ Adicionar um cartão</p>
                            </div>
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

            <Modal
                open={open}
                close={handleCloseModal}
                addNew={handleAddNewCard}
                list={list}
            />
        </div>
    ) : (<Loading />);
};

export default Board;
