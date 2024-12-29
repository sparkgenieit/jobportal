import Ads from "./Ads/Ads";

function Banking() {
    return (
        <>

            <div className="container-fluid">
                <div class="row m-5 my-3">
                    <div class="col-8">


                        <p>
                            If you're on a Working Holiday Visa in New Zealand and you need to set up banking services,
                            you can typically open a bank account with most major banks in the country.
                            Here are some of the key steps and information you may need:
                        </p>
                        <p className="h4 text-primary">Choose a Bank:</p>
                        <p>
                            Research and choose a bank that suits your needs. Common banks in New Zealand include ANZ, ASB, BNZ, Kiwi Bank and Westpac.
                        </p>

                        <p className=" h4 text-primary ">Eligibility:</p>
                        <p> Ensure that you meet the bank's eligibility criteria for opening an account. This might include providing proof of identity
                            and proof of your Working Holiday Visa.
                        </p>

                        <p className=" text-primary h4">Required Documents:</p>
                        <p>
                            Typically, you will need the following documents:
                        </p>

                        <p>
                            Proof of address (such as a rental agreement or a letter from your employer).
                            IRD (Inland Revenue Department) number, which you can apply for online.
                            Visit the Bank Branch:
                            Go to a local branch of the chosen bank to open the account. Some banks also allow online account opening, but you may
                            still need to visit a branch to verify your identity.
                        </p>

                        <p className=" text-primary h4">Provide Information:</p>
                        <p>
                            You'll need to provide personal information, such as your name, address, contact details, and the duration of your stay in New Zealand.
                        </p>

                        <p className="text-primary h4">IRD Number:</p>
                        <p>
                            While not always required to open a bank account, having an IRD number is important for tax purposes. You can apply for an IRD number
                            through the Inland Revenue Department.
                        </p>

                        <p className="text-primary h4">Choose Account Type:</p>
                        <p>
                            Select the type of account that best fits your needs, whether it's a standard everyday account, a savings account, or a combination of both.
                        </p>

                        <p className="text-primary h4">Fees and Charges:</p>
                        <p>
                            Be aware of any fees associated with your chosen account. Some banks may offer fee waivers for certain accounts or services.
                        </p>

                        <p className="text-primary h4">Online Banking:</p>
                        <p>
                            Set up online banking to manage your account conveniently.
                        </p>

                        <p>
                            It's advisable to check with the specific bank for their requirements and procedures, as they may vary. Additionally, keep in mind that
                            some banks may offer special accounts or services tailored for temporary residents or Working Holiday Visa holders.
                        </p>

                        <p>
                            Before making a decision, consider comparing the services, fees, and features offered by different banks to find the one
                            that best meets your needs during your stay in New Zealand.

                        </p>
                    </div>
                    <div className="col-4">
                        <Ads />
                    </div>
                </div>
            </div>


        </>
    )
}
export default Banking;