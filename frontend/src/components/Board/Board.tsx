import React, { useEffect, useState } from "react";
import Column, { ColumnTypes } from "../Column/Column";
import Card, { CardTypes } from "../Card/Card";
import Modal from "../Modal/Modal";
import useFetch from "@/hook/useFetch";
import Loading from "../Loading/Loading";

const Board = () => {
  const { fetchData, updateData, postData, removeData, loading } = useFetch();
  const [tasks, setTasks] = useState<CardTypes[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [list, setList] = useState<string>("to_do");
  const [columns, setColumns] = useState<ColumnTypes[]>([]);

  useEffect(() => {
    const fetch = async () => {
      setColumns((await fetchData("/columns")).column);
      setTasks((await fetchData("/cards")).cards);
    };


    fetch();

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
      handleUpdateTask({ ...cardFiltered, list: key });
      await updateData(`/cards/${cardId}`, {
        ...cardFiltered,
        list: key,
      });
    }
  };


  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleAddNewCard = async (
    title: string,
    description: string,
    list: string,
    date?: Date | null
  ) => {
    const newCard: CardTypes = await postData("/cards", {
      title,
      description,
      list,
      date: date,
    });

    newCard && setTasks([...tasks, newCard]);
  };

  return !loading ? (
    <div className="flex lg:flex-row flex-col justify-between">
      {columns?.map((column: ColumnTypes, columnIndex: number) => {
        return (
          <div
            key={columnIndex}
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
                  card.list === column.key && (
                    <Card
                      card={card}
                      key={cardIndex}
                      handleUpdateTask={handleUpdateTask}
                      setTasks={setTasks}
                      tasks={tasks}

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
  ) : (
    <Loading />
  );
};

export default Board;
