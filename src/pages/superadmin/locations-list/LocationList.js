import Header from "../../../layouts/superadmin/Header";
import Footer from "../../../layouts/superadmin/Footer";
import Sidebar from "../../../layouts/superadmin/Sidebar";
import { useEffect, useState } from "react";
import http from '../../../helpers/http'

function LocationList() {

    const [locations, setLocations] = useState(null)

    return (
        <>

            <div class="container-fluid">
                <div class="content-wrapper">
                    <div class="page-header">
                        <h3 class="page-title">Location List</h3>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">Super Admin</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Location</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="card-body bg-white my-5">
                        <div className="row p-4">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Place ID</th>
                                        <th>Display Name</th>
                                        <th>Description</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {locations && locations.map((location, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{location.placeId}</td>
                                                <td>{location.displayName}</td>
                                                <td>{location.description} </td>
                                                <td><button type="button" className="btn btn-sm btn-gradient-primary">Edit</button></td>
                                                <td><button type="button" className="btn btn-sm btn-gradient-danger">Delete</button></td>
                                            </tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default LocationList;