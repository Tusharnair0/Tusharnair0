import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const User = () => {
    const {
        authState: { authLoading, userList },
        getAllUser,
        deleteUsers
      } = useContext(AuthContext);

    let body = null;
    useEffect(() => {
        getAllUser();
    }, [authLoading])

    getData()
    function getData() {
        if(authLoading) {
            body = (<h2>No user Found</h2>);
        } else if(userList == null || userList == undefined || userList.length == 0) {
            body = (<h2>No user Found</h2>);
        } else {
            body = (
            <>
                <div style={{borderBottom: '1px solid #ccc'}}>
                    <h2 style={{color: 'black'}}>Users Management</h2>
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
                        {userList.map((value, idx) => {
                            return (
                                <>
                                    <tr key={idx}>
                                        <th scope="row">{value._id}</th>
                                        <td>{value.username}</td>
                                        <td>{new Date(value.createdAt).toDateString()}</td>
                                        <td><Link to={"/users/" + value._id} className='btn btn-primary mr-4'>Edit</Link>
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

export default User
