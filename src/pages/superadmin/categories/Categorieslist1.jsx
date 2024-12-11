import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from '../../../helpers/http';
import { Modal } from 'react-bootstrap';
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import { downloadCsv } from "../../../helpers/functions/csvFunctions";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import { RxCross1 } from "react-icons/rx";


function Categorieslist1() {
  const [categoriesList, setCategoriesList] = useState(null)
  const navigate = useNavigate()
  const [Msg, setMsg] = useState({
    message: "",
    class: "",
    show: false
  })
  const tableRef = useRef(null)
  const [downloading, setDownloading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [toUploadList, setToUploadList] = useState([])
  const [showConfirmation, setShowConfirmation] = useState({})
  const message = useShowMessage()

  const fetchCategories = async () => {
    http.get("/categories/all")
      .then((res) => {
        setCategoriesList(res.data)
      }).catch(err => {
        message({ status: "error", error: err })
      })
  }

  useEffect(() => {
    document.title = "Categories list"
    fetchCategories()
  }, [])

  const handleDelete = (category) => {
    http.delete(`categories/delete/${category._id}`)
      .then((res) => {
        fetchCategories()
      })
      .catch((err) => {
        message({ status: "error", error: err })
      })
  }

  const createCategories = async () => {
    setDownloading(true)
    try {
      await http.post('/categories/bulk-create', toUploadList)
      fetchCategories()
      setShowModal(false)
    } catch (error) {
      message({
        status: "error",
        error
      })
    } finally {
      setDownloading(false)
    }
  }

  function readCSV(e) {
    setDownloading(true)
    const file = e.target.files[0]
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (fileExtension !== "csv") {
      message({ status: "error", error: { message: "Please upload a csv file" } })
      return
    }

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function (event) {
      const csvData = event.target.result;
      const lines = csvData.split('\n');

      const data = [];

      const headers = ["name", "parent_id"]

      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',');
        if (row[0] && row[1]) {
          const obj = {};
          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = row[j];
          }
          data.push(obj);
        }
      }
      setToUploadList(data);
      setDownloading(false)
      setShowModal(true)
    };
  }

  const deleteAll = async () => {
    setShowConfirmation({ show: false })
    setDownloading(true)
    try {
      await http.delete('/categories/bulk-delete')
      message({ status: "success", message: "All Categories deleted" })
      fetchCategories()
    } catch (error) {
      message({ status: "error", error })
    } finally {
      setDownloading(false)
    }
  }

  function tableToCSV() {
    setDownloading(true)
    const table = tableRef.current
    let csvContent = "";
    for (let i = 0; i < table.rows.length; i++) {
      let row = table.rows[i];
      let rowData = [];

      // Iterate through each cell in the row
      for (let j = 0; j < 2; j++) {
        rowData.push(row.cells[j].textContent);
      }
      csvContent += rowData.join(",") + "\n";
    }

    downloadCsv(csvContent, "categories")
    setDownloading(false)
  }



  const editButton = (id) => {
    navigate(`/superadmin/Categories/${id}`)
  }

  return (
    <>
      <div class="container-fluid pt-4 bg-white">
        {Msg.show &&
          <div className={Msg.class}>
            {Msg.message}
          </div>}
        <h3 className="fs-4 text-center fw-bold mb-3">Categories List</h3>

        <div className="d-flex flex-column flex-lg-row justify-content-lg-end gap-3">
          <a type="button" disabled={downloading} className="btn btn-info rounded-3" onClick={() => tableToCSV()}>Download</a>
          <label htmlFor="upload_button" type="button" disabled={downloading} className="btn btn-info rounded-3" onClick={() => { }}>Upload</label>
          <input type="file" id="upload_button" onChange={readCSV} accept=".csv" hidden />
          <a type="button" disabled={downloading} className="btn btn-info rounded-3" onClick={() => navigate("/superadmin/Categories1")}>Add</a>
          <a type="button" disabled={downloading} className="btn btn-danger rounded-3" onClick={() => { setShowConfirmation({ show: true }) }}>Delete All</a>
        </div>

        <div className="table-responsive">
          <table ref={tableRef} class="table mt-4  text-center">
            <thead>
              <tr>
                <th className='text-start' >Category Name</th>
                <th className='text-start' >Parent Category </th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {categoriesList && categoriesList.map((category, index) => {
                return <tr key={index}>
                  <td className='text-start'>{category.name}</td>
                  <td className='text-start'>{category.parent_id}</td>
                  <td>
                    <a type="button" onClick={() => editButton(category._id)} class="bg-white border-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                      </svg>
                    </a>
                  </td>
                  <td>
                    <button type="button" onClick={() => handleDelete(category)} className="bg-white border-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                      </svg>
                    </button>
                  </td>
                </tr>
              })
              }
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        showModal={showConfirmation.show}
        onHideModal={() => setShowConfirmation({ show: false })}
        confirmText={"Are you really want to delete all of the categories"}
        confirmTextClasses="fw-bold mb-3 text-center"
        buttonAttributes={[
          {
            text: "Yes",
            className: "btn btn-info rounded-3",
            onClick: deleteAll
          },
          {
            text: "No",
            className: "btn btn-outline-dark rounded-3",
            onClick: () => { setShowConfirmation({ show: false }) }
          }
        ]}
      />

      <Modal show={showModal} onHide={() => { setShowModal(false) }} centered>
        <Modal.Body className="bg-white p-4 d-flex flex-column gap-3">
          <div className="p-0 d-flex justify-content-end  d-md-none">  <RxCross1 onClick={() => { setShowModal(false) }} /> </div>
          <h3 className="text-center">Categories upload</h3>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Parent Category</th>
                </tr>
              </thead>
              <tbody>
                {
                  toUploadList.length > 0 && toUploadList.map((data, i) => {
                    return <tr key={i}>
                      <td>{data.name}</td>
                      <td>{data.parent_id}</td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end">
            <button type="button" onClick={createCategories} className="btn btn-info rounded-3"> Upload</button>
          </div>

        </Modal.Body>
      </Modal>
    </>
  )
}
export default Categorieslist1;