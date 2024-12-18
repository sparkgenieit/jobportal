class RecruiterUrl {

    constructor() {
        this.home = "/recruiter"
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
    }

    getEditJobUrl(id) {
        return `/recruiter/editjob/${id}`
    }

    getAppliedUsersUrl(id) {
        return `/recruiter/applied-users/${id}`
    }

    getAppliedUserProfileUrl(id) {
        return `/recruiter/applied-user-profile/${id}`
    }

    getInboxDetailsUrl(id) {
        return `/recruiter/inbox/details/${id}`
    }
}

export const recruiterUrl = new RecruiterUrl()

