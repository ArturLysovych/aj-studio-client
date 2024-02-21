import { useEffect, useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import usePopupStore from "@/store/popup.store";

const Popup = ({ responseData }: { responseData: string }): JSX.Element => {
    const [right, setRight] = useState('-100%');
    const response = usePopupStore(state => state.responseData);
    const setResponse = usePopupStore(state => state.setResponse);
    
    useEffect(() => {
        if (response !== '') {   
            setRight('25px');
            setTimeout(() => {
                setRight('-100%');
                setResponse('');
            }, 3000);
        } else {
            setRight('-100%');
        }
    }, [response]);

    return (
        <div className={`w-[280px] h-[80px] p-[10px] gap-[10px] flex justify-between items-center z-50 bg-[#f8f8f8] shadow-md rounded-lg fixed trasition-all duration-1000 bottom-[25px]`} style={{ right: right }}>
            <IoMailOutline className="text-[65px]" />
            <h2 className="h-[50px] w-[200px] overflow-hidden font-medium">{ responseData }</h2>
        </div>
    );
};

export default Popup;