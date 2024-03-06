import { format } from "date-fns";

export const formatDate = (date: string | Date) => {
  return date ? format(new Date(date), "dd/MM/yyyy HH:mm") : "";
};
