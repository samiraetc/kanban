

import Toaster from '@/components/Toaster/Toaster';
import {
    useState,
    createContext,
    useEffect,
    Dispatch,
    SetStateAction
} from 'react';


const initialState = {
    showToaster: false,
    toasterInfo: {
        title: '',
        msg: '',
        type: ''
    },
    setToasterInfo: () => false,
    setShowToaster: () => false
};

interface IToasterContext {
    showToaster: boolean;
    toasterInfo: ToasterInfo;
    setShowToaster: Dispatch<SetStateAction<boolean>>;
    setToasterInfo: Dispatch<SetStateAction<ToasterInfo>>;
}

export interface ToasterInfo {
    title: string;
    msg: string;
    type: string;
}

interface ToasterContextProps {
    children: React.ReactNode;
}

const ToasterContext = createContext<IToasterContext>(initialState);

const ToasterProvider = ({ children }: ToasterContextProps) => {
    const [showToaster, setShowToaster] = useState(
        initialState.showToaster
    );
    const [toasterInfo, setToasterInfo] = useState(
        initialState.toasterInfo
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowToaster(false);
        }, 10000);
        return () => {
            clearTimeout(timer);
        };
    }, [showToaster]);

    return (
        <ToasterContext.Provider
            value={{
                showToaster,
                toasterInfo,
                setShowToaster,
                setToasterInfo
            }}
            data-testid="toaster-context"
        >
            <Toaster />
            {children}
        </ToasterContext.Provider>
    );
};

export default ToasterProvider;

export { ToasterContext, ToasterProvider };
