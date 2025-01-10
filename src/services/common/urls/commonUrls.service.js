class CommonUrls {

    constructor() {
        this.home = "/"
        this.aboutUs = "/aboutus"
        this.services = "/services"
        this.termConditions = "/terms-conditions"
        this.privacyPolicy = "/privacy-policy"
        this.contactUs = "/contact-us"
        this.aboutWhVisa = "/about-wh-visa"
        this.banking = "/banking"
        this.typesOfWork = "/types-of-work"
        this.usefulLinks = "/useful-links"
        this.places = "/places"
        this.transport = "/transport"
        this.news = "/news"
        this.tax = "/tax"
        this.accommodation = "/accommodation"
        this.holidayParks = "/holiday-parks"
        this.freedomCampaining = "/freedom-campaining"
        this.activities = "/activities"
        this.jobs = "/jobs"
        this.singleJob = "/jobs/:id"
        this.city = "/cities/:city"
        this.forgotPassword = "/forgotPassword"
        this.resetPassword = "/reset-password"
        this.activateAccount = "/activate-account"
        this.paymentStatus = "/payment-status"
        this.profile = "/profile"
        this.viewProfile = "/viewprofile"
        this.appliedJobs = "/applied-jobs"
        this.savedJobs = "/saved-jobs"
        this.navBarCategories = "/categories/:name/:topic"
    }

    getJobUrl(id) {
        return `/jobs/${id}`
    }

    getCityUrl(city) {
        return `/cities/${city}`
    }
}

export const commonUrls = new CommonUrls()

