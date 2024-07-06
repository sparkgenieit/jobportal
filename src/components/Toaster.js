import "./toaster.css"
import { RxCross1 } from "react-icons/rx";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

export default function Toaster({ message, setMessage }) {

    let type = message.type === "success" ? "success" : "error";

    return <>
        {message.show &&
            <div style={{ width: "25%" }} className={`toaster row  ${type} px-0 shadow rounded`}>
                <div className="col-1 px-1 align-self-center ">
                    {message.type === "success" &&
                        <span>
                            <IoIosCheckmarkCircle size={30} />
                        </span>
                    }
                    {message.type !== "success" &&
                        <span>
                            <MdOutlineCancel color="red" size={30} />
                        </span>
                    }
                </div>
                <div className="col-10 align-self-center px-4">
                    <div className="h5">{message.type === "success" ? "Success" : "Error"}</div>
                    <div className="small">{message.text}</div>
                </div>
                <div className="col-1 px-1">
                    <a type="button" onClick={() => setMessage({ ...message, show: false })}>
                        <span><RxCross1 size={"16px"} /></span>
                    </a>
                </div>
            </div >
        }
    </>
}