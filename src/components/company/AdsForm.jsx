import { useState } from "react"
import { validateIsNotEmpty } from "../../helpers/functions/textFunctions"



const AdsForm = ({ initialValues, onFormValid }) => {
    const [adForm, setAdForm] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})

    const handleForm = (e) => {
        const name = e.target.name
        const value = e.target.value
        setAdForm({ ...adForm, [name]: value })
        setFormErrors({ ...formErrors, [name]: value.trim() ? null : "This field is required" })
    }

    const SubmitBtn = async (event) => {
        event.preventDefault()
        let isValid = true;

        let obj = {};

        Object.keys(adForm).forEach(key => {
            const value = adForm[key]
            if (!validateIsNotEmpty(value)) {
                isValid = false
                obj[key] = "This field is required"
            }
        })

        setFormErrors(obj)

        if (isValid) {
            onFormValid(adForm)
        }
    }

    return (
        <form onSubmit={SubmitBtn} className="flex mt-3 flex-col md:justify-center w-full">

            <div className="container flex flex-col gap-4 p-3">

                <div className="grid  md:grid-cols-3">
                    <label className="">Ad Title <span className="text-red-600">*</span> </label>
                    <div className="md:col-span-2">
                        <input className="px-3 py-2 w-full shadow-sm " value={adForm?.title} name="title" onChange={handleForm} required />
                        {formErrors?.title && <span className='text-red-600 text-sm'>{formErrors?.title}</span>}
                    </div>
                </div>

                <div className="grid  md:grid-cols-3">
                    <label className="">Ad Description <span className="text-red-600">*</span> </label>
                    <div className="md:col-span-2">
                        <textarea className="px-3 py-2 w-full shadow-sm " value={adForm?.description} name="description" onChange={handleForm} required />
                        {formErrors?.description && <span className='text-red-600 text-sm'>{formErrors?.description}</span>}
                    </div>
                </div>

                <div className="grid  md:grid-cols-3">
                    <label>
                        Ad Webiste URL  <span className="text-red-600">*</span>
                        <br />
                        <small style={{ fontSize: "10px" }}>(URL of the website when the user click on the ad)</small>
                    </label>
                    <div className="md:col-span-2">
                        <input type="url" className="px-3 py-2 w-full shadow-sm " value={adForm?.redirect_url} name="redirect_url" onChange={handleForm} required />
                        {formErrors?.redirect_url && <div className='text-sm text-red-600'>{formErrors?.redirect_url} </div>}
                    </div>
                </div>

                <div className="grid  md:grid-cols-3">
                    <label>
                        Ad Image URL<span className="text-red-600">*</span>
                        <br />
                        <small style={{ fontSize: "10px" }}>(URL of the image to be displayed on the ad)</small>
                    </label>
                    <div className="md:col-span-2">
                        <input type="url" className="px-3 py-2 w-full shadow-sm " value={adForm?.ad_image_url} name="ad_image_url" onChange={handleForm} required />
                        {formErrors?.ad_image_url && <div className='text-sm  text-red-600'>{formErrors?.ad_image_url} </div>}
                    </div>
                </div>

                <div className='flex justify-end'>
                    <button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-semibold rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
                </div>
            </div>
        </form >)
}

export default AdsForm;