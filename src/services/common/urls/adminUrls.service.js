class AdminUrls {

    constructor() {
        this.admin = "/admin"
        this.jobQueueList = "/admin/jobqueuelist"
        this.employerQueries = "/admin/employer-queries"
        this.generalQueries = "/admin/general-queries"
        this.inbox = "/admin/inbox"
        this.inboxDetails = "/admin/inbox/details/:id"
        this.assignedJobs = "/admin/Myasignjobs"
        this.viewJob = "/admin/view-job/:id"
        this.adminInbox = "/admin/admin-inbox"
        this.adminMail = "/admin/mail-admin"
        this.adminInboxDetails = "/admin/admin-inbox/details/:id"
        this.audit = "/admin/audit"
        this.logs = "/admin/my-logs"
        this.queueProfiles = "/admin/profiles/queue"
        this.assignedProfiles = "/admin/profiles/assigned"
        this.companyProfile = "/admin/profiles/profile/:id"
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

