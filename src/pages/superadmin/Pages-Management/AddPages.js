
import Header from '../../../layouts/superadmin/Header';
import Sidebar from '../../../layouts/superadmin/Sidebar';
import Footer from '../../../layouts/superadmin/Footer';
import { useState } from 'react';
import { BtnBold, BtnItalic, Editor, EditorProvider, Toolbar } from 'react-simple-wysiwyg';


function Addpage() {
    const [pageId, setPageId] = useState('');
    const [pageTitle, setPageTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const [error, setError] = useState({
        pageId: false,
        pageTitle: false,
        description: false,
        image: false
    })

    const handleInput = (name, e) => {
        if (name === "id") {
            setPageId(e)
        }
        if (name === "title") {
            setPageTitle(e)
        }
        if (name === "description") {
            setDescription(e)
        }
        if (name === "image") {
            setImage(e)
        }

    }
    const submitData = () => {
        let isValid = true;
        let obj = {}
        if (pageId === "") {
            obj = { ...obj, pageId: true }
            isValid = false;
        } else if (/^[0-9]{4,}$/gi.test(pageId) == false) {
            obj = { ...obj, pageId: true }
            isValid = false;
        } else {
            obj = { ...obj, pageId: false }
        }

        if (pageTitle === "") {
            obj = { ...obj, pageTitle: true }
            isValid = false;
        } else if (/^[a-z]{2,}$/gi.test(pageTitle) == false) {
            obj = { ...obj, pageTitle: true }
            isValid = false;
        } else {
            obj = { ...obj, pageTitle: false }
        }

        if (description === "") {
            obj = { ...obj, description: true }
            isValid = false;

        } else {
            obj = { ...obj, description: false }
        }


        if (image === "") {
            obj = { ...obj, image: true }
            isValid = false;

        } else {
            obj = { ...obj, image: false }
        }

        setError(obj)


    }
    return (
        <>


            <div class="container-fluid">
                <div className="content-wrapper bg-white">
                    <div className="page-header">
                        <h3 className="page-title"> Create a Page </h3>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="List">Super Admin</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Create a Page</li>
                            </ol>
                        </nav>
                    </div>


                    <div className="row ">
                        <div className="col-12 bg-white">
                            {/* <div className="card"> */}
                            <div className="card-body">
                                <h4 className="card-title">Create Page </h4>
                                <form class="form-sample">
                                    <div className='row'>
                                        <div className="col-md-12">


                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label">Page Id<span className='text-danger'>*</span></label>
                                                <div className="col-sm-8">

                                                    <input type="text" value={pageId} onChange={(e) => handleInput('id', e.target.value)} className="form-control" />
                                                    {error.pageId && <div className='text-danger'>Not a Proper Page Id</div>}


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-12">
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label">Page Title<span className='text-danger'>*</span></label>
                                                <div class="col-sm-8">
                                                    <input type="text" value={pageTitle} onChange={(e) => handleInput('title', e.target.value)} className="form-control" />
                                                    {error.pageTitle && <div className='text-danger'>Not a Proper Title</div>}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-12">
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label">Description<span className='text-danger'>*</span></label>
                                                <div className="col-sm-8">
                                                    <EditorProvider>
                                                        <Editor value={description} onChange={(e) => handleInput('description', e.target.value)} />

                                                    </EditorProvider>
                                                    {error.description && <div className='text-danger'>Please Write Description</div>}

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className="col-md-12">
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label">Image<span className='text-danger'>*</span></label>
                                                <div className="col-sm-8">
                                                    <input type="file" value={image} onChange={(e) => handleInput('image', e.target.value)} className="form-control" />
                                                    {error.image && <div className='text-danger'>Please Upload an Image</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-9 mt-3 row">
                                        <div className="col-md-12  ">
                                            <button type="button" className="btn btn-gradient-primary me-2 float-end" onClick={() => submitData()} >Submit</button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                            {/* </div> */}
                        </div>




                    </div>
                </div>
            </div>

        </>
    )

}
export default Addpage;