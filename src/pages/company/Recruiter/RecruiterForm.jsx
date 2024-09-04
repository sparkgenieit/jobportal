export default function RecruiterForm({ recruiterData, handleRecruiterData, errors, submit, sending }) {
    return (
        <div className="card-body  rounded-3">
            <form onSubmit={submit} className="form-sample">
                <div className='row'>
                    <div className="col-md-12">
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">First name</label>
                            <div className="col-sm-8">

                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstname"
                                    value={recruiterData?.firstname}
                                    onChange={handleRecruiterData}
                                    required
                                    placeholder="First name"
                                    disabled={sending}
                                />

                                {<div className='text-danger'>{errors?.firstname}</div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-12">
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Last name</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastname"
                                    value={recruiterData?.lastname}
                                    onChange={handleRecruiterData}
                                    required
                                    placeholder="Last name"
                                    disabled={sending}
                                />

                                {<div className='text-danger'>{errors?.lastname}</div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-12">
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Email</label>
                            <div className="col-sm-8">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={recruiterData?.email}
                                    onChange={handleRecruiterData}
                                    required
                                    placeholder="Email Address"
                                    disabled={sending}
                                />

                                {<div className='text-danger'>{errors?.email}</div>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className="col-md-12">
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Password</label>
                            <div className="col-sm-8">
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={recruiterData?.password}
                                    onChange={handleRecruiterData}
                                    placeholder="Password"
                                    disabled={sending}
                                />

                                {<div className='text-danger'>{errors?.password}</div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 mt-3 row">
                    <div className="col-md-12  ">
                        <button
                            type="submit"
                            className="btn btn-gradient-primary me-2 float-end"
                            disabled={sending}
                        >
                            {sending ? "Adding Recruiter" : "Add"}
                        </button>
                    </div>
                </div>

            </form>
        </div>

    )
}