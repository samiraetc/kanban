import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";

interface ColumnProps {
    column: ColumnTypes;
    children: any;
}

export type ColumnTypes = {
    key: string;
    title: string;
};

const Column = ({ column, children }: ColumnProps) => {

    const getColor = new Map([
        ["to_do", "bg-light-gray"],
        ["doing", "bg-light-lavander"],
        ["done", "bg-light-green"],
    ]);

    return (
        <section className="p-4">
            <div className="sm:w-64 md:w-96 flex flex-col gap-4 h-screen">
               <div className="flex items-center justify-between">
                <div
                        className={`p-2  ${getColor.get(
                            column.key
                        )} rounded-xl w-24 text-center text-gray-700`}
                    >
                        <p className="text-sm font-bold">{column.title}</p>
                    
                    </div>
                    <HiDotsHorizontal className="text-gray-600" />
               </div>

                {children}
            </div>
        </section>
    );
};

export default Column;
