import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { SocialLogin } from "./SocialLogin";
import LoginLayoutScss from "./LoginLayout.module.scss";
import { register } from "../../axios/userAxios";
import { ErrorNotification } from "./ErrorNotification";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeDropper, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(LoginLayoutScss);

function Register() {
  const {registerUser} = useUserContext();
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
    email: ""
  })
  const [errorNotification, setErrorNotification] = useState("");
  const [loading, setLoading] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(faEye);
  const [typeOfPasswordField, setTypeOfPasswordField] = useState("password");
  const navigate = useNavigate();
  // variables 
  const { username, password, email } = formValue;

  useEffect(() => {
    if(localStorage.getItem("token")){
      navigate("/");
    }
  }, [])

  // functions
  // Function for change value input in field 
  const handleChangeField = (e) => {
    if(e.target.name === "password"){
      const newPassword = e.target.value;
      checkPasswordFormat(newPassword);
      
    }
    setFormValue({...formValue, [e.target.name]: e.target.value});
  }

  const checkPasswordFormat = (newPassword) => {
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    const isLengthValid = newPassword.length >= 10;
    if(!(hasUpperCase && hasLowerCase && hasSpecialChar && isLengthValid) && newPassword !== ""){
      setErrorNotification("Mật khẩu của bạn không đúng định dạng.")
      return false;
    }
    else {
      setErrorNotification("");
      return true;
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(email==="" || password==="" || username===""){
      setErrorNotification("Some fields are empty!!")
      return;
    }
    else if(!checkPasswordFormat(password)){
      return;
    }
    formValue.social = "none";  
    setLoading(true);
    const {data} = await register(formValue);
    console.log(data);
    if(data?.data?.token){
      localStorage.setItem("token", JSON.stringify(data?.data?.token));
      await registerUser();
      navigate("/");
    }
    else {
      setErrorNotification(data.data.message);
    }
    setLoading(false);
  }

  const handleToggle = () => {
    if (typeOfPasswordField==='password'){
       setEyeIcon(faEyeSlash);
       setTypeOfPasswordField('text');
    } else {
      setEyeIcon(faEye);
      setTypeOfPasswordField('password');
    }
 }

  return (
    <div className={cx("container", "sign-in-container")}>
      <h2 className={cx("sign-in-heading", "text-center", "pb-5")}>
        Tạo Hồ Sơ
      </h2>
      <form>
        
        <div className="mb-3">
          <input
            type="text"
            className={cx(
              "username-input",
              "form-control",
              "w-100",
              " py-3",
              "rounded-4"
            )}
            aria-describedby="emailHelp"
            placeholder="Tên(Tùy Chọn)"
            name="username"
            value={username}
            onChange={handleChangeField}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className={cx(
              "username-input",
              "form-control",
              "w-100",
              " py-3",
              "rounded-4"
            )}
            aria-describedby="emailHelp"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChangeField}
            required
          />
        </div>
        <div className={cx("mb-5", "position-relative")}>
          <input
            type={typeOfPasswordField}
            className={cx(
              "password-input",
              "form-control",
              "w-100",
              " py-3",
              "rounded-4"
            )}
            placeholder="Mật Khẩu"
            name="password"
            value={password}
            onChange={handleChangeField}
            required
          />
          <div className={cx("show-pw")} onClick={handleToggle}>
            
            <FontAwesomeIcon icon={eyeIcon} />
          </div>
          <ErrorNotification errorNotification={errorNotification}/>
        </div>

        <button
          className={cx("sign-in-submit-btn", "w-100", "py-3", "rounded-4")}
          onClick={handleSubmit}
        >
          {loading?<Spinner/>:"Tạo Tài Khoản"}
          
        </button>
        
        <SocialLogin/>
      </form>
    </div>
  );
}

export default Register;
