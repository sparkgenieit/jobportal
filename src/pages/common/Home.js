import './Home.css';

import Head from "../../layouts/common/Head";
import Heder from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';

function Home() {
    return <>
        <Head />
        <Heder />
        <main id="main">

            <section class="inner-page" data-aos="fade-up">
                <div class="container-fluid homeBg">
                    <div class=" d-flex flex-column justify-content-center align-items-center" style={{ height: '500px', width: '100%' }}>
                        <div class="text-center">
                            <div class="mt-5">
                                <h3>The <span class=" text-success">#1</span> Job Board for hiring or Find your next job</h3>
                                <p>Each month, more than 3 million job seekers turn to website in their search for work, making over
                                    1,40,000 applications every single day </p>
                            </div>
                            <div class="text-center btn ">
                                <div class="p-1 row " style={{ backgroundColor: 'white' }}>
                                    <input type="text" class="my-1 rounded  col-3 " placeholder="Industry" />
                                    <input type="text" class="my-1  rounded  col-3" placeholder="Location" />
                                    <input type="text" class="my-1 rounded  col-3" placeholder="Your Keyword" />
                                    <button type="button" class="btn btn-primary col-3">Search</button>
                                    <br />
                                    <p class="">Popular Searches: &nbsp;&nbsp;&nbsp; Designer,Web ,IOS, Developer, PHP, Senior, Engineer</p>
                                </div>
                            </div>

                            <div class="row mt-5">
                                <div class="col-2 m-3">
                                    <p><span class="h4 fw-bolder">2,568+ </span> <br />JobPosted</p>

                                </div>
                                <div class="col-2 m-3" >
                                    <p><span class="h4 fw-bolder">3862+ </span><br />Recruiting</p>

                                </div>
                                <div class="col-2 m-3">
                                    <p><span class="h4 fw-bolder">15k+</span>  <br />Freshers</p>

                                </div>
                                <div class="col-2 m-3">
                                    <p><span class="h4 fw-bolder">15k+</span> <br /> FreeLancers</p>

                                </div>
                            </div>
                        </div>

                    </div>


                    <div class="container">

                        <div class="container-fluid px-3">
                            <div class="d-flex justify-content-between my-3">
                                <div class="h2 ">My Jobs</div>
                                <div class="mt-1">
                                    <button class="btn btn-outline-light btn-sm "> Admin - My Jobs</button>
                                </div>
                            </div>
                            <div class="border rounded bg-light px-5">



                                <div class="row rounded ">
                                    <div class=" col-6 px-3 ">


                                        <div class="row border shadow rounded container p-3 mb-4 bg-light">
                                            <div class="col-2">

                                                <img class="rounded" src="assets/images/logo.png" width="70px" height="50px" alt="" />


                                            </div>
                                            <div class="col-10 text-start px-4">
                                                <p class="h4">Senior Full Stack Engineer,Creator Sucess</p>
                                                <p class="text-success">Madhapur,Hyderabad</p>



                                            </div>

                                            <div class="d-flex justify-content-between">
                                                <div>
                                                    <button class="btn btn-secondary btn-sm" type="button">Content Writer</button>
                                                    <button class="btn btn-secondary btn-sm" type="button">Sketch</button>
                                                    <button class="btn btn-secondary btn-sm" type="button">PSD</button>

                                                </div>
                                                <div class="text-muted">
                                                    <a class="btn primary" href="single-job.html">Apply</a>
                                                </div>

                                            </div>
                                        </div>

                                        <div class="row border shadow rounded container p-3 mb-4 bg-light">
                                            <div class="col-2">

                                                <img class="rounded" src="assets/images/logo.png" width="70px" height="50px" alt="" />


                                            </div>
                                            <div class="col-10 text-start px-4">
                                                <p class="h4">Senior Full Stack Engineer,Creator Sucess</p>
                                                <p class="text-success">Madhapur,Hyderabad</p>



                                            </div>

                                            <div class="d-flex justify-content-between">
                                                <div>
                                                    <button class="btn btn-secondary btn-sm" type="button">Content Writer</button>
                                                    <button class="btn btn-secondary btn-sm" type="button">Sketch</button>
                                                    <button class="btn btn-secondary btn-sm" type="button">PSD</button>

                                                </div>
                                                <div class="text-muted">
                                                    <a class="btn primary" href="single-job.html">Apply</a>
                                                </div>

                                            </div>
                                        </div>

                                        <div class="row border shadow rounded container p-3 mb-4 bg-light">
                                            <div class="col-2">

                                                <img class="rounded" src="assets/images/logo.png" width="70px" height="50px" alt="" />


                                            </div>
                                            <div class="col-10 text-start px-4">
                                                <p class="h4">Senior Full Stack Engineer,Creator Sucess</p>
                                                <p class="text-success">Madhapur,Hyderabad</p>



                                            </div>

                                            <div class="d-flex justify-content-between">
                                                <div>
                                                    <button class="btn btn-secondary btn-sm" type="button">Content Writer</button>
                                                    <button class="btn btn-secondary btn-sm" type="button">Sketch</button>
                                                    <button class="btn btn-secondary btn-sm" type="button">PSD</button>

                                                </div>
                                                <div class="text-muted">
                                                    <a class="btn primary" href="single-job.html">Apply</a>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="row border shadow rounded container p-3 mb-4 bg-light">
                                            <div class="col-2">

                                                <img class="rounded" src="assets/images/logo.png" width="70px" height="50px" alt="" />


                                            </div>
                                            <div class="col-10 text-start px-4">
                                                <p class="h4">Senior Full Stack Engineer,Creator Sucess</p>
                                                <p class="text-success">Madhapur,Hyderabad</p>



                                            </div>

                                            <div class="d-flex justify-content-between">
                                                <div>
                                                    <button class="btn btn-secondary btn-sm" type="button">Content Writer</button>
                                                    <button class="btn btn-secondary btn-sm" type="button">Sketch</button>
                                                    <button class="btn btn-secondary btn-sm" type="button">PSD</button>

                                                </div>
                                                <div class="text-muted">
                                                    <a class="btn primary" href="single-job.html">Apply</a>
                                                </div>

                                            </div>
                                        </div>





                                    </div>

                                    <div class="col-6  d-flex flex-column ">
                                        <div>
                                            <div class="row border shadow rounded container p-3 mb-4 bg-light">
                                                <div class="col-2">

                                                    <img class="rounded" src="assets/images/logo.png" width="70px" height="50px" alt="" />


                                                </div>
                                                <div class="col-10 text-start px-4">
                                                    <p class="h4">Senior Full Stack Engineer,Creator Sucess</p>
                                                    <p class="text-success">Madhapur,Hyderabad</p>



                                                </div>

                                                <div class="d-flex justify-content-between">
                                                    <div>
                                                        <button class="btn btn-secondary btn-sm" type="button">Content Writer</button>
                                                        <button class="btn btn-secondary btn-sm" type="button">Sketch</button>
                                                        <button class="btn btn-secondary btn-sm" type="button">PSD</button>

                                                    </div>
                                                    <div class="text-muted">
                                                        <a class="btn primary" href="single-job.html">Apply</a>
                                                    </div>

                                                </div>
                                            </div>

                                            <div class="row border shadow rounded container p-3 mb-4 bg-light">
                                                <div class="col-2">

                                                    <img class="rounded" src="assets/images/logo.png" width="70px" height="50px" alt="" />


                                                </div>
                                                <div class="col-10 text-start px-4">
                                                    <p class="h4">Senior Full Stack Engineer,Creator Sucess</p>
                                                    <p class="text-success">Madhapur,Hyderabad</p>



                                                </div>

                                                <div class="d-flex justify-content-between">
                                                    <div>
                                                        <button class="btn btn-secondary btn-sm" type="button">Content Writer</button>
                                                        <button class="btn btn-secondary btn-sm" type="button">Sketch</button>
                                                        <button class="btn btn-secondary btn-sm" type="button">PSD</button>

                                                    </div>
                                                    <div class="text-muted">
                                                        <a class="btn primary" href="single-job.html">Apply</a>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                        <div class="row border shadow rounded container p-3 mb-4 bg-light">
                                            <div class="col-2">

                                                <img class="rounded" src="assets/images/logo.png" width="70px" height="50px" alt="" />


                                            </div>
                                            <div class="col-10 text-start px-4">
                                                <p class="h4">Senior Full Stack Engineer,Creator Sucess</p>
                                                <p class="text-success">Madhapur,Hyderabad</p>



                                            </div>

                                            <div class="d-flex justify-content-between">
                                                <div>
                                                    <button class="btn btn-secondary btn-sm" type="button">Content Writer</button>
                                                    <button class="btn btn-secondary btn-sm" type="button">Sketch</button>
                                                    <button class="btn btn-secondary btn-sm" type="button">PSD</button>

                                                </div>
                                                <div class="text-muted">
                                                    <a class="btn primary" href="single-job.html">Apply</a>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="row border shadow rounded container p-3 mb-4 bg-light">
                                            <div class="col-2">

                                                <img class="rounded" src="assets/images/logo.png" width="70px" height="50px" alt="" />


                                            </div>
                                            <div class="col-10 text-start px-4">
                                                <p class="h4">Senior Full Stack Engineer,Creator Sucess</p>
                                                <p class="text-success">Madhapur,Hyderabad</p>



                                            </div>

                                            <div class="d-flex justify-content-between">
                                                <div>
                                                    <button class="btn btn-secondary btn-sm" type="button">Content Writer</button>
                                                    <button class="btn btn-secondary btn-sm" type="button">Sketch</button>
                                                    <button class="btn btn-secondary btn-sm" type="button">PSD</button>

                                                </div>
                                                <div class="text-muted">
                                                    <a class="btn primary" href="single-job.html">Apply</a>
                                                </div>

                                            </div>
                                        </div>



                                    </div>


                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section >

        </main >
        <Footer />
    </>
}

export default Home;
