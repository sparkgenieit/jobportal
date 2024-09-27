// import Header from '..../../layouts/company/Header';
// import Footer from '../../layouts/company/Footer';
// import Sidebar from '../../layouts/company/Sidebar';
import { useEffect, useState } from 'react';
import Header from '../../../layouts/superadmin/Header';
import Sidebar from '../../../layouts/superadmin/Sidebar';
import Footer from '../../../layouts/superadmin/Footer';

const PagesList = () => {
    const [pages, setPages] = useState([
        {
            pageId: "233",
            pageTitle: "Home",
            description: "About latest Jobs",
            image: "https://cdn.sanity.io/images/v6oximkk/production/21d23aacc75f36df01310f8782e8102a0882276f-1600x900.jpg?w=1600&h=900&auto=format"
        },
        {
            pageId: "4588",
            pageTitle: "About",
            description: "About Website",
            image: "https://www.blogtyrant.com/wp-content/uploads/2021/06/gill-andrews.png"
        },
        {
            pageId: "89777",
            pageTitle: "Terms and Conditions",
            description: "Terms and conditions of the Website",
            image: "https://www.encora.com/hs-fs/hubfs/Imported_Blog_Media/500px-Screen-Shot-2019-09-24-at-13_22_16-1.png?width=1328&height=742&name=500px-Screen-Shot-2019-09-24-at-13_22_16-1.png"
        },
        {
            pageId: "85241",
            pageTitle: "Plans",
            description: "Structure of the plans provided by the Website",
            image: "https://images01.nicepagecdn.com/page/87/80/website-template-preview-87806.jpg"
        }
    ])
    return (<>




        <div class="container-fluid">
            <div className="content-wrapper bg-white">
                <div class="page-header">
                    <h3 class="page-title"> Pages-Management </h3>
                </div>


                <div class="row ">

                    <div class="col-12">

                        <div class="card">
                            <div className="p-3  d-flex justify-content-between">
                                <div className='fw-bold h4  pt-3 px-3'>Pages List</div>
                                <a type="button" className="btn btn-primary float-end" href="/superadmin/add-page">Add</a>

                            </div>
                            <div class="card-body pt-3">
                                <form class="form-sample">
                                    <div class="row">
                                        <table class="table ">
                                            <thead>
                                                <tr>
                                                    <th>Page Id</th>
                                                    <th>Page Title</th>
                                                    <th>Descripton</th>
                                                    <th>Image</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    pages.map((page, index) => {
                                                        return <tr key={index}>
                                                            <td>{page.pageId}</td>
                                                            <td>{page.pageTitle}</td>
                                                            <td>{page.description}</td>
                                                            <td><img style={{ width: "100px", height: "70px", borderRadius: "8px" }} src={page.image} alt={page.pageTitle} /></td>
                                                            <td>
                                                                <a type="button" class="btn btn-white btn-xs border m-1"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" class="bi bi-pencil" viewBox="0 0 16 16">
                                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" /></svg></span></a>
                                                                <button type="button" class="btn btn-danger btn-xs border m-1"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 16">
                                                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                                                </svg></span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    })

                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    </>)
}

export default PagesList;