class RolesService {

    constructor() {
        this.Admin = "admin"
        this.SuperAdmin = "superadmin"
        this.Company = "employer"
        this.User = "user"
        this.Recruiter = "recruiter"
    }
}


export const Roles = new RolesService()