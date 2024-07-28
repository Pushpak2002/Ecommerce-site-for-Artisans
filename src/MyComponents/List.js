import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {NavBar} from './NavBar'
import axios from 'axios';

export const List = () => {

  const [users, setUsers] = useState([]);

  const { id } = useParams();

  useEffect(()=>
  {
    axios.get("http://localhost:5000/api/auth/getalluser")
    .then(users => setUsers(users.data))
    .catch(err=>console.log(err))
  },[])

  
  return (
    <>
     <NavBar title="HandCraft" />
      <div>
            into List {id}
            <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
              <div className='w-50'>
              <table className="table">
                <thead>
                <tr>
                  <th>
                    Name
                  </th>
                  <th>
                    Username
                  </th>
                  <th>
                    gmail
                  </th>
                  <th>
                    ID
                  </th>
                </tr>
                </thead>
                <tbody>
                  {
                    users.map(user => {
                    return <tr>
                      <td>
                        {user.Name}
                      </td>
                      <td>
                        {user.UserName}
                      </td>
                      <td>
                        {user.Mail}
                      </td>
                      <td>
                        {user._id}
                      </td>
                    </tr>
                  })}
                </tbody>
              </table>
              </div>
            </div>
      </div>
    </>
        
    
    
  );
};
