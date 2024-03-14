import axios from "axios";
import { useContext, useState } from "react";
import { ToasterContext } from "@/context/ToasterContext";
import { BASE_URL, DEFAULT_HEADERS } from "@/pages/api/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const useFetch = () => {
  const { setToasterInfo, setShowToaster } = useContext(ToasterContext);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });

  const fetchData = async (endpoint: string, data?: any) => {
    try {
      const response = await api.get(endpoint, data);

      if (response.status === 401) {
        return router.push("/login");
      }

      setLoading(false);


      return response.data;
    } catch (error) {
      handleRequestError(error, "Erro ao buscar os dados");
    }
  };

  const updateData = async (endpoint: string, data: any) => {
    try {
      const response = await api.put(endpoint, data);

      if (response.status === 401) {
        return router.push("/login");
      }

      return response.data;
    } catch (error) {
      handleRequestError(error, "Erro ao atualizar os dados");
    }
  };

  const postData = async (endpoint: string, data: any, routerUrl?: string) => {
    try {
      const response = await api.post(endpoint, data);

      if (response.status === 401) {
        return router.push("/login");
      }

      routerUrl && router.push(routerUrl);
      return response.data;
    } catch (error) {
      handleRequestError(error, "Erro ao adicionar os dados");
    }
  };

  const removeData = async (endpoint: string) => {
    try {
      const response = await api.delete(endpoint);

      if (response.status === 401) {
        return router.push("/login");
      }
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
    postData,
    removeData,
    loading,
  };
};

export default useFetch;
