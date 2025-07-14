class SuperAdminUrl {
  constructor() {
    this.superadmin = "/";
    this.addCategory = "/Categories1";
    this.addSkills = "/AddSkills";
    this.categoriesList = "/Categorieslist1";
    this.editCategory = "/Categories/:id";
    this.viewProfile = "/view-profile/:user/:userId";
    this.locations = "/locations";
    this.createAdmin = "/admins/Create";
    this.adminList = "/admins/List";
    this.postAd = "/post-ad";
    this.adsList = "/admin-ads";
    this.companyAdsList = "/company-ads";
    this.galleryList = "/gallery";
    this.addGallery = "/gallery/add";
    this.editGallery = "/gallery/edit/:id";
    this.skillsList = "/Skills";
    this.users = "/users";
    this.editSkills = "/Skills/:id";
    this.orders = "/orders";
    this.creditsManagement = "/credits-management";
    this.mail = "/mail";
    this.adminMail = "/mail-admin";
    this.adminInbox = "/admin-inbox";
    this.inboxDetails = "/admin-inbox/details/:id";
    this.addPage = "/add-page";
    this.pages = "/pages";
    this.specificPage = "/specific-page";
    this.jobs = "/jobs";
    this.ads = "/ads";
    this.viewJob = "/jobs/:id";
    this.viewAd = "/ads/:id";
    this.audit = "/audit";
    this.adminAudit = "/audit/admin";
  }

  getEditSkillUrl(id) {
    return `/superadmin/Skills/${id}`;
  }

  getEditCategoryUrl(id) {
    return `/superadmin/Categories/${id}`;
  }

  getUserProfileUrl(user, id) {
    return `/superadmin/view-profile/${user}/${id}`;
  }

  getInboxDetails(id) {
    return `/superadmin/admin-inbox/details/${id}`;
  }

  getJobUrl(id) {
    return `/superadmin/jobs/${id}`;
  }
}

export const superAdminUrl = new SuperAdminUrl();
