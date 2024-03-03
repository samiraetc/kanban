import { CardTypes } from "@/components/Card/Card";

const AUTH_URL = "http://localhost:5000/login";
const CARD_URL = "http://localhost:5000/cards";

const CREDENTIAL = { login: "letscode", senha: "lets@123" };

const DEFAULT_HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

const useFetch = () => {
    let token: any;

    const authenticate = async () => {
        return await fetch(AUTH_URL, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(CREDENTIAL),
            headers: DEFAULT_HEADERS,
        })
            .then((resp) => resp.json())
            .then((token) => `Bearer ${token}`)
            .then((token) => ({ Authorization: token }))
            .catch(console.error);
    };

    const getToken = async () => {
        token = await authenticate();
    };

    const getCards = async (): Promise<CardTypes[]> => {
        if (!token) await getToken();

        return await fetch(CARD_URL, { headers: { ...token, ...DEFAULT_HEADERS } })
            .then(async (res) => {
                if (res.status === 200) {
                    return res.json() as Promise<CardTypes[]>;
                } else if (res.status === 401) {
                    await getToken();
                    return getCards();
                } else throw new Error("Código de status inesperado.");
            })
            .catch((error) => {
                console.error(error);
                throw new Error("Ocorreu um erro ao buscar os cards.");
            });
    };

    const updateCard = async (card: {
        id?: string;
        titulo: string;
        conteudo: string;
        lista: string;
    }) => {
        if (!token) await getToken();

        await fetch(`${CARD_URL}/${card.id}`, {
            headers: { ...token, ...DEFAULT_HEADERS },
            method: "PUT",
            body: JSON.stringify(card),
        })
            .then((res) => {
                if (res.status === 200) return res.json();
                else if (res.status === 401) getToken();
                else throw new Error("unexpected status code");
                return updateCard(card);
            })
            .catch(console.error);
    };

    const addCard = async (card: {
        id?: string;
        titulo: string;
        conteudo: string;
        lista: string;
    }) => {
        if (!token) await getToken();

        await fetch(`${CARD_URL}`, {
            headers: { ...token, ...DEFAULT_HEADERS },
            method: "POST",
            body: JSON.stringify(card),
        })
            .then((res) => {
                if (res.status === 201) return res.json();
                else if (res.status === 401) getToken();
                else throw new Error("unexpected status code");
                return updateCard(card);
            })
            .catch(console.error);
    };

    const removeCard = async (id: string): Promise<CardTypes[]> => {
        if (!token) await getToken();

        return fetch(`${CARD_URL}/${id}`, {
            headers: { ...token, ...DEFAULT_HEADERS },
            method: "DELETE",
        })
            .then(async (res) => {
                if (res.status === 200) return res.json() as Promise<CardTypes[]>;
                else if (res.status === 401) {
                    await getToken();
                    return removeCard(id);
                } else throw new Error("Código de status inesperado");
            })
            .catch((error) => {
                console.error(error);
                throw new Error("Ocorreu um erro ao remover o cartão");
            });
    };

    return {
        addCard,
        getCards,
        updateCard,
        removeCard,
    };
};

export default useFetch;
