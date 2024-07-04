import "./toaster.css"
import { RxCross1 } from "react-icons/rx";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

export default function Toaster({ message, setMessage }) {

    let type = message.type === "success" ? "success" : "error";

    return <>
        {message.show &&
            <div style={{ width: "30%" }} className={`toaster d-flex align-items-center justify-content-between ${type} shadow rounded`}>
                <div>
                    {message.type === "success" &&
                        <span>
                            <IoIosCheckmarkCircle size={40} />
                        </span>
                    }
                    {message.type !== "success" &&
                        <span>
                            <MdOutlineCancel color="red" size={40} />
                        </span>
                    }
                </div>
                <div>
                    <div className="h5">{message.type === "success" ? "Success" : "Error"}</div>
                    <div className="small">{message.text}</div>
                </div>
                <div>
                    <a type="button" onClick={() => setMessage({ ...message, show: false })}>
                        <span><RxCross1 size={"16px"} /></span>
                    </a>
                </div>
            </div >
        }
    </>
}