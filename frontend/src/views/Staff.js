import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { StaffContext } from '../contexts/StaffContext';

const Staff = () => {
    const {
        staffState: { staffLoading, staffList },
        getAllUser,
        deleteUsers
      } = useContext(StaffContext);

    let body = null;
    useEffect(() => {
        getAllUser();
    }, [staffLoading])

    getData()
    function getData() {
        if(staffLoading) {
            body = (<h2>No Staff Found</h2>);
        } else if(staffList == null || staffList === undefined || staffList.length === 0) {
            body = (<h2>No Staff Found</h2>);
        } else {
            console.log(staffList)
            body = (
            <>
                <div style={{borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between'}}>
                    <h2 style={{color: 'black'}}>Staffs Management</h2>
                    <Link to={"/staffs/create/new"} className="d-flex align-items-center mr-4" style={{color: 'red'}}>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="feather feather-plus-circle"
                        >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                    </Link>
                </div>
                <table class="table table-striped mt-2">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Function</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffList.map((value, idx) => {
                            return (
                                <>
                                    <tr key={idx}>
                                        <th scope="row">{value._id}</th>
                                        <td>{value.username}</td>
                                        <td>{new Date(value.createdAt).toDateString()}</td>
                                        <td><Link to={"/staffs/" + value._id} className='btn btn-primary mr-4'>Edit</Link>
                                        <button className='btn btn-info' onClick={() => {
                                            deleteUsers(value._id)
                                        }}>Delete</button></td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </>)
        }
    }
  return (
    <div style={{marginLeft: '320px'}}>
        {body}
    </div>
  )
}

export default Staff
