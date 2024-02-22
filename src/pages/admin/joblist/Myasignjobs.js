import Footer from "../../../layouts/admin/Footer";
import Header from "../../../layouts/admin/Header";
import Sidebar from "../../../layouts/admin/Sidebar";

function Myasignjobs(){

    return (
        <>
        <div className="container-scrollar">
        <Header/>
        <div class="container-fluid page-body-wrapper">
            <Sidebar/>
       
        

        <Footer/>
        </div>
        </div>
        </>
    )
}
export default Myasignjobs;