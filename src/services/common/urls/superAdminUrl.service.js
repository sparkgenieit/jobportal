class SuperAdminUrl {

    constructor() {
        this.superadmin = "/superadmin"
        this.addCategory = "/superadmin/Categories1"
        this.addSkills = "/superadmin/AddSkills"
        this.categoriesList = "/superadmin/Categorieslist1"
        this.editCategory = "/superadmin/Categories/:id"
        this.viewProfile = "/superadmin/view-profile/:user/:userId"
        this.locations = "/superadmin/locations"
        this.createAdmin = "/superadmin/admins/Create"
        this.adminList = "/superadmin/admins/List"
        this.postAd = "/superadmin/post-ad"
        this.adsList = "/superadmin/ads"
        this.skillsList = "/superadmin/Skills"
        this.users = "/superadmin/users"
        this.editSkills = "/superadmin/Skills/:id"
        this.orders = "/superadmin/orders"
        this.creditsManagement = "/superadmin/credits-management"
        this.mail = "/superadmin/mail"
        this.adminMail = "/superadmin/mail-admin"
        this.adminInbox = "/superadmin/admin-inbox"
        this.inboxDetails = "/superadmin/admin-inbox/details/:id"
        this.addPage = "/superadmin/add-page"
        this.pages = "/superadmin/pages"
        this.jobs = "/superadmin/jobs"
        this.viewJob = "/superadmin/jobs/:id"
        this.audit = "/superadmin/audit"
        this.adminAudit = "/superadmin/audit/admin"
    }

    getEditSkillUrl(id) {
        return `/superadmin/Skills/${id}`
    }

    getEditCategoryUrl(id) {
        return `/superadmin/Categories/${id}`
    }

    getUserProfileUrl(user, id) {
        return `/superadmin/view-profile/${user}/${id}`
    }

    getInboxDetails(id) {
        return `/superadmin/admin-inbox/details/${id}`
    }

    getJobUrl(id) {
        return `/superadmin/jobs/${id}`
    }

}

export const superAdminUrl = new SuperAdminUrl()

