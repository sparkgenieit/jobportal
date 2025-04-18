class CompanyUrls {

    constructor() {
        this.home = "/company"
        this.postJob = "/postajob"
        this.editJob = "/editjob/:id"
        this.postedJobs = "/jobs"
        this.appliedUsers = "/applied-users/:id"
        this.appliedUserProfile = "/applied-user-profile/:userId"
        this.companyContact = "/contact-us"
        this.inbox = "/inbox"
        this.inboxDetails = "/inbox/details/:id"
        this.audit = "/audit"
        this.adAudit = "/adAudit"
        
        this.transactions = "/transactions"
        this.adTransactions = "/AdTransactions"
        this.jobTransactions = "/JobTransactions"
        this.buyAdCredits = "/BuyAdCredits"
        this.buyJobCredits = "/BuyJobCredits"
        this.ads = "/ads"
        this.selectAdType = "/ads/post"
        this.postAd = "/ads/post/:type"
        this.editAd = "/ads/editad/:id"; // Remove /company
        this.companyProfile = "/CompanyProfile"
        this.recruiters = "/recruiters"
    }

    getEditJobUrl(id) {
        return `/company/editjob/${id}`
    }

    getUrl(path) {  // As the company is not appended in the path of the pages by using this the company will be appended
        return this.home + path
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

    goTopostAd(type) {
        return `/company/ads/post/${type}`
    }
}

export const companyUrls = new CompanyUrls()

