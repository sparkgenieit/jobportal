import { useEffect, useState } from 'react';
import userService from '../services/common/user.service';
import { forwardRef } from 'react';
import ViewProfileData from './ViewProfileData';
import { Link } from 'react-router-dom';

const ViewProfileComponent = forwardRef((props, ref) => {
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');

  const [user, SetUserData] = useState({});
  const [JobTypes, setJobtypes] = useState([])
  // const myRefname= useRef<HTMLButtonElement>(null);
  // let JobTypes = []
  useEffect(() => {

    userService.get(userId)
      .then(response => {
        SetUserData(response.data)

        // To display the keys of jobtypes which is true
        let jobtype = response.data.preferredJobTypes[0]
        let jobs = []
        for (const key in jobtype) {
          const element = jobtype[key];
          if (element === true) {
            jobs.push(key)
          }
        }
        setJobtypes(jobs)


        // localStorage.setItem('token', response.data.token);
        // const token = response.data.token;

        // // Store the token securely (e.g., in localStorage or HTTP-only cookies)
        // localStorage.setItem('token', token);

        // localStorage.setItem('role', response.data.role)
        // setTimeout(() => {
        //   // Inside the handleLogin function
        //   navigate('/viewprofile'); // Redirect to the dashboard after login
        // }, 1500);

      })
      .catch(e => {
        console.log(e);
      })
  }, [userId])

  const handleClick = () => {
    console.log(props);
    //props.myRefname.current.click;
  }

  // const handleDownload = (event,path, file) => {
  //   event.preventDefault();
  //   fetch("http://localhost:8080/upload/file/?path="+path +"&file="+file,{
  //     responseType: "blob",
  //   })
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const url = window.URL.createObjectURL(blob);
  //       const link = document.createElement("a");
  //       link.href = url;
  //       //link.setAttribute("download", file);
  //       link.download = file;
  //       document.body.appendChild(link);

  //       link.click();

  //       document.body.removeChild(link);
  //       window.URL.revokeObjectURL(url);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching the file:", error);
  //     });
  // };

  return <>


    <div className="row bg-white" ref={ref}>
      <div className="col-12">
        {/* <div className="card"> */}
        <div className="card-body p-3" >
          <div className='row my-4'>

            {user && <ViewProfileData user={user} JobTypes={JobTypes} />}

          </div>
        </div>
      </div>







    </div>


  </>

});
export default ViewProfileComponent;