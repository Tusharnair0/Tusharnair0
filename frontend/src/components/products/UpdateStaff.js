import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { StaffContext } from '../../contexts/StaffContext'

const UpdateStaff = () => {
    const {
        staffState: {staffLoading},
        updateUsers
    } = useContext(StaffContext);
    const params = useParams()
    const [formData, setFormData] = useState({
        id: params.id,
        password: '',
        rePassword: '',
    })
    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if((formData.password !== "" && formData.rePassword !== "") 
        && formData.password === formData.rePassword) {
            updateUsers(formData)
        }
    }

  return (
    <div style={{ marginLeft: '320px'}}>
        <div style={{borderBottom: '1px solid #ccc'}}>
            <h2 style={{color: 'black'}}>Update Password For Staff {params.id}</h2>
        </div>
      <Form onSubmit={onSubmit} className="d-flex flex-column align-items-center">
        <Form.Group style={{width: '40%'}}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              required-aria-aria-describedby="password-help"
              value={formData.password}
              onChange={onChange}
            />
        </Form.Group>
        <Form.Group style={{width: '40%'}} className="my-2">
            <Form.Label>Re-Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-Password"
              name="rePassword"
              required-aria-aria-describedby="rePassword-help"
              value={formData.rePassword}
              onChange={onChange}
            />
        </Form.Group>
        <Button variant="primary" type="submit">
            Update
          </Button>
      </Form>
    </div>
  )
}

export default UpdateStaff
