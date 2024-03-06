import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { IoCalendarOutline } from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";
import { pt } from "date-fns/locale";

interface DatePickerProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
}
const DatePick = ({ date, setDate }: DatePickerProps) => {
  registerLocale("pt", pt);
  return (
    <div>
      <DatePicker
        showIcon
        dateFormat="dd/MM/yyyy HH:mm"
        closeOnScroll={true}
        showPopperArrow={false}
        selected={date ? date : new Date()}
        onChange={(date) => setDate(date)}
        className="outline-none ml-2"
        icon={<IoCalendarOutline />}
        shouldCloseOnSelect={false}
        timeIntervals={15}
        showTimeSelect
        locale="pt"
      />
    </div>
  );
};

export default DatePick;
