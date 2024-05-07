import Header from "../../layouts/common/Header";
import Footer from "../../layouts/common/Footer";
import Ads from "./ads";


function Aboutwhvisa() {
  return (
    <>
      <Header />

      <div class="row container m-5 my-3">
        <div class="col-8">
          <div className="text-primary">
            <h4>About Working Holiday Visa</h4>
          </div>
          <div className="text-primary">
            <h6>Eligibility and criteria for working holiday visas</h6>
          </div>
          <div>
            <p>
              Working holiday visas are avaliable to young peoples,usually aged 18 to 30,
              but 18 to 35 in a selected few counteries.They let you travel and work in
              New Zealand for up to 12 months.If you are from Canada they let you travel
              and work for up to 23 months,and for up to 36 months if you are from
              United Kingdom.For more information please visit
              https://www.immigration.govt.nz

            </p >
          </div>

          <div className="text-primary">
            <h6>Employment Conditions</h6>
          </div>
          <div>
            <p>
              You cannot accept a permanent job offer while on a New Zealand working under
              visa Employment Conditions vary between the differnt countries. Check the details
              for your country's working holiday visa scheme.

            </p >
          </div >
          <div className="text-primary">
            <h6>List of Countries with a working holiday visa agreement</h6>
          </div>
          <div >

            <li>Argentina Working Holiday Visa</li>
            <li>Austria Working Holiday Visa</li>
            <li>Belgium Working Holiday Visa</li>
            <li>Brazil Working Holiday Visa</li>
            <li>Canada Working Holiday Visa</li>
            <li>Chile Working Holiday Visa</li>
            <li>China Working Holiday Visa</li>
            <li>Croatia Working Holiday Visa</li>
            <li>Czech Working Holiday Visa</li>
            <li>Denmark Working Holiday Visa</li>
            <li>Estonia Working Holiday Visa</li>
            <li>Finland Working Holiday Visa</li>
            <li>France Working Holiday Visa</li>
            <li>Germany Working Holiday Visa</li>
            <li>Hong Kong Working Holiday Visa</li>
            <li>Hungary Working Holiday Visa</li>
            <li>Ireland Working Holiday Visa</li>
            <li>Israel Working Holiday Visa</li>
            <li>Italy Working Holiday Visa</li>
            <li>Japan Working Holiday Visa</li>
            <li>Korea Working Holiday Visa</li>
            <li>Latvia Working Holiday Visa</li>
            <li>Lithuania Working Holiday Visa</li>
            <li>Luxemboung Working Holiday Visa</li>
            <li>Malaysia Working Holiday Visa</li>
            <li>Malta Working Holiday Visa</li>
            <li>Mexico Working Holiday Visa</li>
            <li>Netherlands Working Holiday Visa</li>
            <li>Norway Working Holiday Visa</li>
            <li>Peru Working Holiday Visa</li>
            <li>Philippines Working Holiday Visa</li>
            <li>Poland Working Holiday Visa</li>
            <li>Portugal Working Holiday Visa</li>
            <li>Singapore Working Holiday Visa</li>
            <li>Slovakia Working Holiday Visa</li>
            <li>Slovenia Working Holiday Visa</li>
            <li>Spain Working Holiday Visa</li>
            <li>Sweden Working Holiday Visa</li>
            <li>Taiwan Working Holiday Visa</li>
            <li>Thailand Working Holiday Visa</li>
            <li>Turkey Working Holiday Visa</li>
            <li>United Kingdom Working Holiday Visa</li>
            <li>Uruguay Working Holiday Visa</li>
            <li>USA Working Holiday Visa</li>
            <li>Vietnam Working Holiday Visa</li>
          </div>
        </div>

        <div class="col-4">
          <div class="mt-5 mb-5 text-info">
            <Ads />
          </div>

          <div class="mt-5 mb-5 text-info">
            <Ads />
          </div>


          {/* <!-- <div ><img src = "../ "  width="200px", height="200px"></div> 
            <div><img src = "../ "  width="200px", height="200px"></div>
            <div><img src = "../ "  width="200px", height="200px"></div> --> */}


        </div>







      </div >

      <Footer />




    </>
  )

}
export default Aboutwhvisa;