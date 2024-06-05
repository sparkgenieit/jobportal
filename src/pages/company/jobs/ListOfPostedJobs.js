import { useState } from "react"

import Footer from "../../../layouts/company/Footer";
import Header from "../../../layouts/company/Header";
import Sidebar from "../../../layouts/company/Sidebar";


const ListOfPostedJobs = () => {

  const [list, setList] = useState([
    {
      JobId: 1001,
      JobName: " Developer",
      JobTitle: "Front End Developer",
      CompanyName: "Spark Genie IT",
      Postdate: "01-12-2024",
      EndDate: "10-01-2024",

    },
    {
      JobId: 1002,
      JobName: " Developer",
      JobTitle: "Front End Developer",
      CompanyName: "Spark Genie IT",
      Postdate: "01-12-2024",
      EndDate: "10-01-2024",

    },
    {
      JobId: 1003,
      JobName: "Developer",
      JobTitle: "Front End Developer",
      CompanyName: "Spark Genie IT",
      Postdate: "01-12-2024",
      EndDate: "10-01-2024",

    },
    {
      JobId: 1004,
      JobName: "Developer",
      JobTitle: "Front End Developer",
      CompanyName: "Spark Genie IT",
      Postdate: "01-12-2024",
      EndDate: "10-01-2024",

    }, {
      JobId: 1005,
      JobName: "Developer",
      JobTitle: "Front End Developer",
      CompanyName: "Spark Genie IT",
      Postdate: "01-12-2024",
      EndDate: "10-01-2024",

    }
  ])

  return (
    <>
      <div className="container-scroller">

        <Header />
        <div class="container-fluid page-body-wrapper">
          <Sidebar />
          <div class="container-fluid">
            <div class="content-wrapper">
              <div class="page-header">
                <h3 class="page-title"> Jobs </h3>
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">My Posted Jobs</a></li>
                    <li class="breadcrumb-item active" aria-current="page">List</li>
                  </ol>
                </nav>
              </div>

              <div class="row">
                <div class="col-12">

                  <div class="card-body">
                    <form class="form-sample">
                      <div class="row">

                        <table style={{ textAlign: "center" }} class="table ">

                          <thead>
                            <tr>
                              <th><b>Job Id</b></th>
                              <th><b>Job Name</b></th>
                              <th><b>Job Title</b></th>
                              <th><b>Company Name</b></th>
                              <th><b>Post Date</b></th>
                              <th><b>End Date</b></th>
                              <th><b>Edit</b></th>
                              <th><b>View</b></th>



                            </tr>

                            {
                              list.map((tableList, index) => {
                                return <tr key={index}>
                                  <td>{tableList.JobId}</td>
                                  <td>{tableList.JobName}</td>
                                  <td>{tableList.JobTitle}</td>
                                  <td>{tableList.CompanyName}</td>
                                  <td>{tableList.Postdate}</td>
                                  <td>{tableList.EndDate}</td>

                                  <td><button type="button" class="btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                    </svg></button></td>
                                  <td><button type="button" class="btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                    </svg>
                                  </button></td>
                                </tr>

                              })
                            }
                          </thead>
                        </table>
                      </div>
                    </form>
                  </div>

                </div>
              </div>
            </div>

            < Footer />


          </div>
        </div>
      </div>
    </>

  )
}
export default ListOfPostedJobs;