import { useState } from "react";

function LocationList() {

    const [locations, setLocations] = useState(null)

    return (
        <>

            <div class="container-fluid">
                <div className="content-wrapper bg-white">
                    <h3 className="fs-4 text-center fw-bold">Location List</h3>
                    <div className="card-body bg-white">
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