export default function AdsTable({ adsData, onEdit, onDelete }) {

    if (!adsData) {
        return null
    }

    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Photo</th>
                        <th>Website</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>




                </tbody>
            </table>

        </div>
    )
}