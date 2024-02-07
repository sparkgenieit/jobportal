// import Header from '..../../layouts/company/Header';
// import Footer from '../../layouts/company/Footer';
// import Sidebar from '../../layouts/company/Sidebar';
import { useState } from 'react';
import Header from '../../../layouts/common/Header';
import Sidebar from '../../../layouts/company/Sidebar';
import Footer from '../../../layouts/common/Footer';

const List = () => {

  const [list, setList] = useState([
    {
      Id: 1,
      Firstname: "pv",
      Lastname: "praveen",
      Username: "praveen",
      Password: 354165465
    },
    {
      Id: 1,
      Firstname: "pv",
      Lastname: "praveen",
      Username: "praveen",
      Password: 354165465
    },
    {
      Id: 1,
      Firstname: "pv",
      Lastname: "praveen",
      Username: "praveen",
      Password: 354165465
    }
  ])
  return (<>


    <div className="container-scroller">

      {/* <Header /> */}
      <Header />
      <div class="container-fluid page-body-wrapper">
        {/* <Sidebar /> */}
        <Sidebar />

        <div class="main-panel">
          <div class="content-wrapper">
            <div class="page-header">
              <h3 class="page-title"> Form elements </h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="#">Forms</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Form elements</li>
                </ol>
              </nav>
            </div>

            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <form class="form-sample">
                      <div class="row">
                        <table class="table">
                          <thead>
                            <tr>
                              <td><b>Id</b></td>
                              <td><b>Firstname</b></td>
                              <td><b>Lastname</b></td>
                              <td><b>Username</b></td>
                              <td><b>Password</b></td>
                              <td><b>Action</b></td>

                            </tr>
                          </thead>
                          <tbody>
                            {
                              list.map((list, index) => {
                                return <tr key={index}>
                                  <td>{list.Id}</td>
                                  <td>{list.Firstname}</td>
                                  <td>{list.Lastname}</td>
                                  <td>{list.Username}</td>
                                  <td>{list.Password}</td>
                                  <td><button type="button" class="btn btn-success"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                  </svg></span></button></td>
                                  <td><button type="button" class="btn btn-success"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox='0 0 16 16'>
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 " /></svg></span></button></td>
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
          <footer class="footer">
          <div class="container-fluid d-flex justify-content-between">
            <span class="text-muted d-block text-center text-sm-start d-sm-inline-block">Copyright © Spark Genie It Solutions
              2023</span>
            <span class="float-none float-sm-end mt-1 mt-sm-0 text-end">  <a href="https://sparkgenieit.com/" target="_blank">Spark Genie It Solutions
                team</a></span>
          </div>
        </footer>
        </div>
        </div>
        
      </div>
    </div>
  </>)

}
export default List;