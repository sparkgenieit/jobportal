import Header from "../../layouts/common/Header";
import Footer from "../../layouts/common/Footer";
import Ads from "./ads";
function AboutUs() {
    return (
        <>
            <Header />
            <div className="row">
                <div className="col-9">

                </div>
                <div className="col-3">
                    <Ads />
                </div>
            </div>


            <Footer />
        </>
    )
}
export default AboutUs;