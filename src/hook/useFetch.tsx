import axios from "axios";
import { useContext } from "react";
import { ToasterContext } from "@/context/ToasterContext";
import { BASE_URL, DEFAULT_HEADERS } from "@/pages/api/api";

const useFetch = () => {
  const { setToasterInfo, setShowToaster } = useContext(ToasterContext);

  const api = axios.create({
    baseURL: BASE_URL,
    headers: DEFAULT_HEADERS,
  });

  const fetchData = async (endpoint: string) => {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      handleRequestError(error, "Erro ao buscar os dados");
    }
  };

  const updateData = async (endpoint: string, data: any) => {
    try {
      const response = await api.put(endpoint, data);
      return response.data;
    } catch (error) {
      handleRequestError(error, "Erro ao atualizar os dados");
    }
  };

  const addData = async (endpoint: string, data: any) => {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      handleRequestError(error, "Erro ao adicionar os dados");
    }
  };

  const removeData = async (endpoint: string) => {
    try {
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      handleRequestError(error, "Erro ao remover os dados");
    }
  };

  const handleRequestError = (error: any, errorMessage: string) => {
    setToasterInfo({
      title: errorMessage,
      msg: "Tente novamente mais tarde",
      type: "error",
    });
    setShowToaster(true);
    throw error;
  };

  return {
    fetchData,
    updateData,
    addData,
    removeData,
  };
};

export default useFetch;
