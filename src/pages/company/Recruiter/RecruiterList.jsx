import Table from "react-bootstrap/Table"
import { Link } from "react-router-dom"


export default function RecruiterList() {

    return (
        <div className=" mt-4 container-fluid">

            <div className="d-flex">
                <h3 className="fw-bold text-center flex-grow-1">Recruiters</h3>
                <Link className="btn btn-primary rounded-3" to="add">Add Recruiter</Link>
            </div>



            <Table>

            </Table>

        </div>
    )
}