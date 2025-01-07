import { useEffect } from "react";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import useCurrentUser from "../../../helpers/Hooks/useCurrentUser";
import { tryCatch } from "../../../helpers/functions";
import AdsForm from "../../../components/company/AdsForm";
import { adService, initialAdFormValues } from "../../../services/company/Ads.service";
import { useParams } from "react-router-dom";

function PostAd() {
    const user = useCurrentUser()
    const { type } = useParams()

    const adForm = { ...initialAdFormValues, ad_type: type }

    const message = useShowMessage()

    useEffect(() => {
        document.title = "Post an ad "
    }, [])

    const postAd = async (data) => {

        // As this is posted by company both the posted_by and company_id will be same
        data.posted_by = user._id
        data.company_id = user._id

        const { error } = await tryCatch(() => adService.postAd(data))

        if (error) {
            message({
                status: "error",
                error
            })
            return
        }

        message({
            status: "Success",
            message: "Ad Posted Successfully",
            path: "/company/ads"
        })
    }

    return (
        <div className="container-md pt-4 ">
            <div className="bg-white">
                <h3 className="fs-4 text-center fw-bold">Post an Ad</h3>
                <AdsForm initialValues={adForm} onFormValid={postAd} />
            </div>
        </div>
    )
}
export default PostAd;