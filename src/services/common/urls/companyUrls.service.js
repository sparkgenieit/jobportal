class CompanyUrls {

    constructor() {
        this.home = "/"
        this.postJob = "/postajob"
        this.editJob = "/editjob/:id"
        this.postedJobs = "/jobs"
        this.appliedUsers = "/applied-users/:id"
        this.appliedUserProfile = "/applied-user-profile/:userId"
        this.companyContact = "/contact-us"
        this.inbox = "/inbox"
        this.inboxDetails = "/inbox/details/:id"
        this.audit = "/audit"
        this.transactions = "/transactions"
        this.buyCredits = "/BuyCredits"
        this.ads = "/ads"
        this.companyProfile = "/CompanyProfile"
        this.recruiters = "/recruiters"
    }

    getEditJobUrl(id) {
        return `/company/editjob/${id}`
    }

    getAppliedUsersUrl(id) {
        return `/company/applied-users/${id}`
    }

    getAppliedUserProfileUrl(id) {
        return `/company/applied-user-profile/${id}`
    }

    getInboxDetailsUrl(id) {
        return `/company/inbox/details/${id}`
    }
}

export const companyUrls = new CompanyUrls()

