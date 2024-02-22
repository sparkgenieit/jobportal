

import Header from '../../layouts/common/Header';
import Sidebar from '../../layouts/common/Sidebar';
import Footer from '../../layouts/common/Footer';
import { useState } from "react"



 function Savejob() {
  const [savejob, setSavejob] = useState([


    {
      Id: 1,
      jobtitle: "Angular",
      companyname: "Tataconsultancy",

    },
    {
      Id: 2,
      jobtitle: "React",
      companyname: "Mahindraconsultancy",
    }
  ])

  return <>
    <Header /> 
   <main id="main">

   <section class="inner-page" data-aos="fade-up"> 
   <div class="container-fluid homeBg">
    <div class="container-fluid page-body-wrapper">
     <Sidebar />
      <div class="main-panel bg-light">
        <div className="content-wrapper">

        <div class="container">

<div class="container-fluid px-3">
    <div class="d-flex justify-content-between my-3">

        <div class="mt-1">
            <button class="btn btn-outline-light btn-sm "> Admin - My Jobs</button>
        </div>
    </div>
        <div class="border rounded bg-light">


<div class='container' style={{ marginLeft: '17px', marginRight: '40px', }}>
    <div className="row d-flex" style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
        <div class=" col-6 px-3  border=200  ">
            {
                savejob.map((Item) => {
                    return (
                        <div className='mt-3' style={{ display: 'flex'}}>
                            <div className="row">
                                <div className="col-6 border shadow rounded container p-3 mb-4  bg-light" style={{ margin: '10px', height: '150px', width: '250px' }} >
                                    <div class="col-2">

                                        <img class="rounded" src="assets/images/logo.png" width="70px" height="50px" alt="" />
                                    </div>
                                    <div class="col-10 text-start px-4">
                                        <p class="h4">{Item.title}</p>
                                        <p class="text-success">{Item.location}</p>
                                        <p class="text-success">{Item.skills}</p>
                                        <p class="text-success">{Item.company}</p>
                                    </div>

                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <button class="btn btn-secondary btn-sm mx-2" type="button">Content Writer</button>
                                            <button class="btn btn-secondary btn-sm" type="button">Sketch</button>
                                            <button class="btn btn-secondary btn-sm mx-2" type="button">PSD</button>

                                        </div>
                                        <div class="text-muted">
                                            <a class="btn primary" href="single-job.html float-end:center">Apply</a>
                                        </div>


                                    </div>
                                </div>
                                </div>
                                <div className='col-6'>
                                <div className="col-6 border shadow rounded container p-3 mb-4 bg-light" style={{ margin: '10px', height: '150px', width: '250px' }} >
                                    <div class="col-2">

                                        <img class="rounded" src="assets/images/logo.png" width="70px" height="50px" alt="" />
                                    </div>
                                    <div class="col-10 text-start px-4">
                                        <p class="h4">{Item.title}</p>
                                        <p class="text-success">{Item.location}</p>
                                        <p class="text-success">{Item.skills}</p>
                                        <p class="text-success">{Item.company}</p>
                                    </div>

                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <button class="btn btn-secondary btn-sm mx-2" type="button">Content Writer</button>
                                            <button class="btn btn-secondary btn-sm" type="button">Sketch</button>
                                            <button class="btn btn-secondary btn-sm mx-2" type="button">PSD</button>

                                        </div>
                                        <div class="text-muted " >
                                            <a class="btn primary float-end  " href="single-job.html">Apply</a>
                                        </div>


                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    )
                })


            }
        </div>
    </div>
</div>
</div>
</div>


</div>
         </div>
        </div>
        </div>
        </div>
        
    </section>
    </main> 
    <Footer />
  </>
}

export default Savejob;


// function Savejob() {

//   const [savejob, setSavejob] = useState([


//     {
//       Id: 1,
//       jobtitle: "Angular",
//       companyname: "Tataconsultancy",

//     },
//     {
//       Id: 2,
//       jobtitle: "React",
//       companyname: "Mahindraconsultancy",
//     }
//   ])
//   return (<>
//     <div class="main-panel">
//       <div class="content-wrapper">
//         <div class="page-header">
//           <h3 class="page-title"> Employee Profile </h3>

//           <Header />
// //     {/* <main id="main"> */}

// //     {/* <section class="inner-page" data-aos="fade-up"> */}
// //     {/* <div class="container-fluid homeBg"> */}
// //     <div class="container-fluid page-body-wrapper">
// //       <Sidebar />

// //       <div class="main-panel bg-light">
// //         <div className="content-wrapper">
// //           <table border={"5"}>
// //             <tr>
// //               <th>Id</th>
// //               <th>Jobtitle</th>
// //               <th>Companyname</th>
// //             </tr>

// //             {savejob.map((res) => {
//             return <tr>

//               <td>{res.Id}</td>
//               <td>{res.jobtitle}</td>
//               <td>{res.companyname}</td>
//             </tr>
//           })}

//                 </table>
//               </div>
//               {/* </div> */}
//             </div>

//           </div>
//           {/* </div> */}
//           {/* </section> */}

//           {/* </main> */}
//           <Footer />
//         </div>
//       </div>
//     </div>

//   </>)

// }
// export default Savejob;


