import React from "react";

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
        <section>
            <div className="sm:w-64 md:w-96 flex flex-col gap-4 h-screen">
                <div
                    className={`p-2  ${getColor.get(
                        column.key
                    )} rounded-xl w-24 text-center text-gray-700`}
                >
                    <p className="text-sm font-bold">{column.title}</p>
                </div>

                {children}
            </div>
        </section>
    );
};

export default Column;
