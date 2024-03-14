import React, { useEffect, useState } from "react";
import { CgTrash } from "react-icons/cg";
import { TbPencil } from "react-icons/tb";
import Modal from "../Modal/Modal";
import { IoCalendarOutline } from "react-icons/io5";
import { formatDate } from "@/utils/format";
import useFetch from "@/hook/useFetch";

interface CardProps {
  card: CardTypes;
  handleUpdateTask: (it: CardTypes) => void,
  tasks: CardTypes[]
  setTasks: (value: CardTypes[]) => void
}

export type CardTypes = {
  id: string;
  title: string;
  description: string;
  list: string;
  date?: Date | null;
};

const handleDragCard = (e: React.DragEvent<HTMLDivElement>, id: string) => {
  e.dataTransfer.setData("id", id);
};

const Card = ({ card, handleUpdateTask, tasks, setTasks }: CardProps) => {
  const { updateData, removeData } = useFetch();
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [isEditingDescription, setIsEditinDescription] =
    useState<boolean>(false);
  const [title, setTitle] = useState<string>(card.title);
  const [description, setDescription] = useState<string>(card.description);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const diferenceHours =
    Math.abs(new Date(card.date ?? "").getTime() - new Date().getTime()) /
    (1000 * 60 * 60);

  const textColor = () => {
    if (new Date(card.date ?? "").getTime() < new Date().getTime()) {
      return "text-red-400";
    }
    return diferenceHours >= 0 && diferenceHours <= 48
      ? "text-orange-400"
      : "text-gray-500";
  };
  const handleOpenToEdit = () => {
    setOpenModal(true);
  };

  const handleDeleteCard = async (id: string) => {

    await removeData(`/cards/${id}`);
    setTasks(tasks?.filter((task: CardTypes) => task.id !== id));
  };

  const handleEditCard = async (item: {
    id: string;
    title: string;
    description: string;
    date?: Date | null;
  }) => {
    const cardFiltered: CardTypes | undefined = tasks?.find(
      (card) => card.id === item.id
    );

    if (cardFiltered) {
      const updatedCard = await updateData(`/cards/${item.id}`, {
        ...cardFiltered,
        title: item.title,
        description: item.description,
        date: item.date,
      });


      updatedCard && handleUpdateTask({
        ...cardFiltered,
        title: item.title,
        description: item.description,
        date: item.date,
      })

    }
  };

  useEffect(() => {
    setTitle(card.title);
    setDescription(card.description);
  }, [openModal]);

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
        <div className="bg-white p-4 rounded-lg shadow flex flex-col  gap-2">
          {isEditingTitle ? (
            <div className="text-md font-semibold ">
              <textarea
                autoFocus
                className="w-full outline-none resize-none"
                rows={2}
                onBlur={() => {
                  setIsEditingTitle(false);
                  handleEditCard({
                    id: card.id,
                    title,
                    description,
                    date: card.date,
                  });
                }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          ) : (
            <p
              className="text-md font-semibold"
              onClick={() => setIsEditingTitle(true)}
            >
              {card.title}
            </p>
          )}

          {isEditingDescription ? (
            <div className="text-gray-500 text-sm ">
              <textarea
                autoFocus
                className="w-full outline-none resize-none"
                rows={4}
                onBlur={() => {
                  setIsEditinDescription(false);
                  handleEditCard({
                    id: card.id,
                    title,
                    description,
                    date: card.date,
                  });
                }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          ) : (
            <p
              className="text-gray-500 text-sm"
              onClick={() => setIsEditinDescription(true)}
            >
              {card.description}
            </p>
          )}

          <div className="flex justify-between items-center">
            <div className={`${textColor()} text-sm flex gap-2 items-center`}>
              {card?.date && (
                <>
                  <IoCalendarOutline />
                  <span>{`${formatDate(card.date?.toString() ?? "")}`}</span>
                </>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <TbPencil
                className="h-5 w-5 text-gray-500 hover:text-green-600"
                onClick={() => handleOpenToEdit()}
              />
              <CgTrash
                className="h-5 w-5 text-gray-500 hover:text-red-500"
                onClick={() => handleDeleteCard(card.id)}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={openModal}
        close={() => setOpenModal(false)}
        card={card}
        editCard={handleEditCard}
      />
    </section>
  );
};

export default Card;
