class AdminUrls {

    constructor() {
        this.admin = "/"
        this.jobQueueList = "/jobqueuelist"
        this.adsQueueList = "/adsqueuelist"
        this.assignedAds = "/Myasignads"
        this.employerQueries = "/employer-queries"
        this.generalQueries = "/general-queries"
        this.inbox = "/inbox"
        this.inboxDetails = "/inbox/details/:id"
        this.assignedJobs = "/Myasignjobs"
        this.viewJob = "/view-job/:id"
        this.adminInbox = "/admin-inbox"
        this.adminMail = "/mail-admin"
        this.adminInboxDetails = "/admin-inbox/details/:id"
        this.audit = "/audit"
        this.logs = "/my-logs"
        this.queueProfiles = "/profiles/queue"
        this.assignedProfiles = "/profiles/assigned"
        this.companyProfile = "/profiles/profile/:id"
    }

    getViewJobUrl(id) {
        return `/admin/view-job/${id}`
    }

    inboxDetailsUrl(id) {
        return `/admin/inbox/details/${id}`
    }

    getAdminInboxDetailsUrl(id) {
        return `/admin/admin-inbox/details/${id}`
    }

    getCompanyProfileUrl(id) {
        return `/admin/profiles/profile/${id}`
    }
}

export const adminUrls = new AdminUrls()

