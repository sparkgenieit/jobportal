import { useEffect, useState, useCallback } from "react";
import http from "../../../helpers/http";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import useCurrentUser from "../../../helpers/Hooks/useCurrentUser";
import { tryCatch } from "../../../helpers/functions";
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();

const initialValues = {
  title: "",
  description: "",
  ad_image_url: "",
  ad_type: "",
  redirect_url: "",
  google_ad_enabled: false,
  ad_client: "",
  ad_slot: "",
};

function AdForm({ ad = null, onSuccess }) {
  const user = useCurrentUser();
  const message = useShowMessage();

const isEdit = !!ad;
  const fallbackSuccess = () => {
    if (!isEdit) {
      navigate("/superadmin/admin-ads");
    }
  };

  const [adForm, setAdForm] = useState(() => ({
    ...initialValues,
    ...(ad || {}),
    google_ad_enabled: ad ? !!ad.ad_client : false,
    posted_by: user?._id,
  }));

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = ad ? "Edit Ad" : "Post an Ad";
  }, [ad]);

  const handleForm = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setAdForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setFormErrors((prev) => ({ ...prev, [name]: null }));
  }, []);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!adForm.ad_type.trim()) {
      errors.ad_type = "Ad Type is required";
      isValid = false;
    }

    if (adForm.google_ad_enabled) {
      if (!adForm.ad_client.trim()) {
        errors.ad_client = "Ad Client is required";
        isValid = false;
      }
      if (!adForm.ad_slot.trim()) {
        errors.ad_slot = "Ad Slot is required";
        isValid = false;
      }
    } else {
      ["title", "ad_image_url", "redirect_url"].forEach((key) => {
        if (!adForm[key]?.trim()) {
          errors[key] = "This field is required";
          isValid = false;
        }
      });
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    const endpoint = ad && ad._id ? `/ads/update/${ad._id}` : "/ads/create";
    const method = ad && ad._id ? http.put : http.post;

    const { error } = await tryCatch(() => method(endpoint, adForm));

    if (error) {
      message({ status: "error", error });
      setIsSubmitting(false);
      return;
    }
    
    if (typeof onSuccess === "function") {
      onSuccess(); // for edit case (modal)
    } else {
      fallbackSuccess(); // for add case (page)
    }

    message({
      status: "Success",
      message: ad ? "Ad Updated Successfully" : "Ad Posted Successfully",
      path: "/superadmin/admin-ads",
    });

    setIsSubmitting(false);
  };

  return (
    <div className="container-fluid pt-4">
      <div className="bg-white p-3 rounded shadow">
        <h3 className="fs-4 text-center fw-bold">
          {ad ? "Edit Ad" : "Post an Ad"}
        </h3>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="row">
            <div className="col-md-7">
              <FormInput
                label="Ad Title"
                name="title"
                value={adForm.title}
                onChange={handleForm}
                error={formErrors.title}
              />
              <FormInput
                label="Ad Image URL"
                name="ad_image_url"
                value={adForm.ad_image_url}
                onChange={handleForm}
                error={formErrors.ad_image_url}
              />
              <FormSelect
                label="Ad Type"
                name="ad_type"
                value={adForm.ad_type}
                onChange={handleForm}
                options={[
                  { value: "", label: "Select" },
                  { value: "short", label: "Short (min 600px width)" },
                  { value: "long", label: "Long (min 600px height)" },
                  {
                    value: "home-page-banner",
                    label: "Home Page Banner (min 900px width)",
                  },
                  {
                    value: "landing-page-popup",
                    label: "Landing Page Popup (min 900px width)",
                  },
                  { value: "category-page-ad-1", label: "Category Page Ad 1" },
                  { value: "category-page-ad-2", label: "Category Page Ad 2" },
                  { value: "category-page-ad-3", label: "Category Page Ad 3" },
                ]}
                error={formErrors.ad_type}
              />

              <FormInput
                label="Redirect URL"
                name="redirect_url"
                value={adForm.redirect_url}
                onChange={handleForm}
                error={formErrors.redirect_url}
              />

              <div className="form-group form-check mt-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="google_ad_enabled"
                  checked={adForm.google_ad_enabled}
                  onChange={handleForm}
                />
                <label className="form-check-label ms-2">
                  Include Google Ad
                </label>
              </div>

              {adForm.google_ad_enabled && (
                <GoogleAdFields
                  adForm={adForm}
                  handleForm={handleForm}
                  formErrors={formErrors}
                />
              )}

              <div className="form-group mt-4">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : ad
                    ? "Update Ad"
                    : "Submit Ad"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const FormInput = ({ label, name, value, onChange, error }) => (
  <div className="form-group row mt-3">
    <label className="col-sm-3 col-form-label">{label}</label>
    <div className="col-sm-9">
      <input
        type="text"
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="small text-danger">{error}</div>}
    </div>
  </div>
);

const FormSelect = ({ label, name, value, onChange, options, error }) => (
  <div className="form-group row mt-3">
    <label className="col-sm-3 col-form-label">{label}</label>
    <div className="col-sm-9">
      <select
        className="form-select"
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <div className="small text-danger">{error}</div>}
    </div>
  </div>
);

const GoogleAdFields = ({ adForm, handleForm, formErrors }) => (
  <>
    <FormInput
      label="Ad Client *"
      name="ad_client"
      value={adForm.ad_client}
      onChange={handleForm}
      error={formErrors.ad_client}
    />
    <FormInput
      label="Ad Slot *"
      name="ad_slot"
      value={adForm.ad_slot}
      onChange={handleForm}
      error={formErrors.ad_slot}
    />
  </>
);

export default AdForm;
