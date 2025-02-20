import styles from './DataTable.module.css';
import { useState } from "react";
import Table from 'react-bootstrap/Table';
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { BsPencilFill, BsTrash } from "react-icons/bs";
import { CiBellOn } from "react-icons/ci";
import { GoQuestion } from "react-icons/go";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { BiRepost } from "react-icons/bi";
import { useSelector } from 'react-redux';
import MessagePopup from '../jobs/MessagePopup';

const TableStatus = ({ data, setModal }) => {
    switch (data.status) {
        case "approved":
            return "Live";
        case "rejected":
            return (
                <span
                    role="button"
                    onClick={() => setModal({ show: true, type: "rejectedMessage", clickedJob: data })}
                    className='text-red-600 flex items-center justify-center underline'
                >
                    <CiBellOn /> Revise
                </span>
            );
        case "expired":
            return "Expired";
        case "closed":
            return "Closed";
        default:
            return "In Review";
    }
};

const TableActions = ({ data, goToEdit, handleDuplicate, setModal }) => (   

    <>
        <td>
            <span className='flex justify-center'>
                <BsPencilFill onClick={() => goToEdit(data)} role="button" />
            </span>
        </td>
        <td>
            <span className='flex justify-center'>
                <HiOutlineDocumentDuplicate onClick={() => handleDuplicate(data)} role="button" fontSize={20} />
            </span>
        </td>
        <td>
            {data.status === "approved" && (
                <span className='flex justify-center' role="button" onClick={() => setModal({ show: true, type: "close", clickedJob: data })}>
                    <RxCross2 color="red" fontSize={22} />
                </span>
            )}
        </td>
        <td>
            {(data.status === "closed" || data.status === "expired") && (
                <span className='flex justify-center' role="button" onClick={() => setModal({ show: true, type: "delete", clickedJob: data })}>
                    <BsTrash fontSize={16} />
                </span>
            )}
        </td>
        <td>
            {(data.status === "expired" || data.status === "closed") && (
                <span className='flex justify-center' role="button" onClick={() => setModal({ show: true, type: "repost", clickedJob: data })}>
                    <BiRepost fontSize={24} />
                </span>
            )}
        </td>
    </>
);

const TableRow = ({ data, setModal, getAppliedUsers, isTableCollapsed, goToEdit, handleDuplicate, columns }) => (
    <tr>
        
        {columns.includes("Support") && (
            <td>
                <GoQuestion role="button" onClick={() => setModal({ show: true, type: "support", clickedJob: data,title:columns.includes("Job Title") ? data.jobTitle:data.title })} fontSize={20} />
            </td>
        )}
        {columns.includes("Job Title") && <td>{data.jobTitle}</td>}
        {columns.includes("AD Title") && <td>{data.title}</td>}
        {columns.includes("Job Reference") && <td>{data.employjobreference}</td>}
        {columns.includes("Posted Date") && <td>{(data.creationdate)? new Date(data.creationdate).toLocaleDateString('en-GB'):new Date(data.date).toLocaleDateString('en-GB')}</td>}
        {columns.includes("End Date") && <td>{(data.creationdate)? new Date(data.closedate).toLocaleDateString('en-GB'):new Date(data.end_date).toLocaleDateString('en-GB')}</td>}
        {columns.includes("Status") && <td className="text-center"><TableStatus data={data} setModal={setModal} /></td>}
        {columns.includes("Views") && <td id="views" className="text-end">{data.views ? data.views : 0}</td>}
        {columns.includes("Applications") && <td> <td id="Applicants" className="text-center">
                                    {data.status === "approved" &&
                                        <>
                                            {!data.appliedUsers ? // if no applied users
                                                "0"
                                                :
                                                <button type="button" className="border-0 bg-white text-blue-600 font-bold underline " onClick={() => getAppliedUsers(data, false)}>
                                                    {data.appliedUsers}
                                                </button>
                                            }
                                        </>
                                    }
                                </td></td>}
        {columns.includes("Shortlisted") && <td>{ data.status === "approved" && data.shortlistedUsers &&
                                        <button type="button" className="border-0 bg-white text-green-600 font-bold underline " onClick={() => getAppliedUsers(data, true)}>
                                            {data.shortlistedUsers}
                                        </button>
                                    }</td>}
        {isTableCollapsed && <TableActions data={data} goToEdit={goToEdit} handleDuplicate={handleDuplicate} setModal={setModal} />}
    </tr>
);

function DataTable({ items, handleDuplicate, closeAction, getAppliedUsers, handleDelete, goToEdit,columns }) {
    const isSidebarOpen = useSelector(state => state.general.isSidebarOpen);
    const [modal, setModal] = useState({});
    const [isTableCollapsed, setIsTableCollapsed] = useState(false);
console.log('ads',items);
 
    
    return (
        <>
            <div className={isSidebarOpen ? styles.sidebarNotCollapsed : styles.sidebarCollapsed}>
                <Table responsive className="text-wrap text-center">
                    <thead>
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index} className={col === "Actions" ? "text-blue-600" : ""}>
                                    {col}
                                    {col === "Actions" && <RxHamburgerMenu fontSize={18} onClick={() => setIsTableCollapsed(prev => !prev)} />}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 && items.map(data => (
                            <TableRow
                                key={data._id}
                                data={data}
                                setModal={setModal}
                                getAppliedUsers={getAppliedUsers}
                                isTableCollapsed={isTableCollapsed}
                                goToEdit={goToEdit}
                                handleDuplicate={handleDuplicate}
                                columns={columns}
                            />
                        ))}
                    </tbody>
                </Table>
            </div>
            <MessagePopup modal={modal} setModal={setModal} handleDelete={handleDelete} closeAction={closeAction} />
        </>
    );
}

export default DataTable;
