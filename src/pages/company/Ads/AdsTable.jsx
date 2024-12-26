import { BiTrash } from 'react-icons/bi'
import { BsFillPencilFill } from 'react-icons/bs'


export default function AdsTable({ adsData, onEdit, onDelete }) {

    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Photo</th>
                        <th>Website</th>
                        <th className='text-center'>Edit</th>
                        <th className='text-center'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {adsData?.map(ad => (
                        <tr key={ad._id}>
                            <td>{ad.title}</td>
                            <td><img src={ad.ad_image_url} className="rounded" alt={ad.title} style={{ width: "50px", height: "50px" }} /></td>
                            <td>{ad.redirect_url}</td>
                            <td className='text-center'><BsFillPencilFill onClick={() => onEdit(ad)} fontSize={15} role='button' /> </td>
                            <td className='text-center'><BiTrash onClick={() => onDelete(ad)} fontSize={20} role='button' /></td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )
}