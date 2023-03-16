import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../Alert/Alert";

const RegisterForm = () => {
  let Navigate = useNavigate();

  // Context
  const { regisUser } = useContext(AuthContext);

  const [regisForm, setRegisForm] = useState({
    username: "",
    password: "",
    rePassword: ""
  });

  const [alert, setAlert] = useState(null);

  const { username, password, rePassword } = regisForm;
  const onChangeLoginForm = (event) =>
    setRegisForm({ ...regisForm, [event.target.name]: event.target.value });
  const regis = async (event) => {
    event.preventDefault();

    if(password === rePassword) {
      try {
        const RegisData = await regisUser(regisForm);
        if (RegisData.success) {
          Navigate("/");
        } else {
          setAlert({ type: "danger", message: RegisData.message });
          setTimeout(() => setAlert(null), 5000);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setAlert({ type: "danger", message: "Incorrect password or Re-password" });
          setTimeout(() => setAlert(null), 5000);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={regis}>
        <AlertMessage info={alert} />
        <Form.Group className="bot">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group className="bot">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            className="mt-4"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group className="bot">
          <Form.Control
            type="password"
            placeholder="RePassword"
            name="rePassword"
            className="mt-4"
            required
            value={rePassword}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button className="mt-4" variant="success" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;
