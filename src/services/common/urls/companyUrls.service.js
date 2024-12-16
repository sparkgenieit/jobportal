class CompanyUrls {

    constructor() {
        this.home = "/company"
        this.postJob = "/company/postajob"
        this.editJob = "/company/editjob/:id"
        this.postedJobs = "/company/jobs"
        this.appliedUsers = "/company/applied-users/:id"
        this.appliedUserProfile = "/company/applied-user-profile/:userId"
        this.companyContact = "/company/contact-us"
        this.inbox = "/company/inbox"
        this.inboxDetails = "/company/inbox/details/:id"
        this.audit = "/company/audit"
        this.transactions = "/company/transactions"
        this.buyCredits = "/company/BuyCredits"
        this.ads = "/company/ads"
        this.companyProfile = "/company/CompanyProfile"
        this.recruiters = "/company/recruiters"
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

