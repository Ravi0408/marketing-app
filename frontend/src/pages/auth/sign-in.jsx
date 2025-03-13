import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '@/context/usercontext';
import { logIn} from "@/utils/requestapi";
import { ToastContainer, toast } from 'react-toastify';
import { successToast } from "@/utils/UIUtilities/toaster";
export function SignIn() {
  const { user, setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false);
  const [modalopen, setModalOpen] = React.useState(false);
  const navigate = useNavigate();
    const handleOpen = React.useCallback(
      () => {
          setModalOpen(!modalopen)
        },
      [modalopen])
    const _acceptTerms=React.useCallback(()=>{
      setAgree(true)
      handleOpen()
    },[agree,modalopen])
  const handleLogin = async () => {
    try {
      setError("")
      if(!agree){
        setError("Please Agree Terms and Conditions")
        return
      }
      if(email==""){
        setError("Email Cannot be Empty")
        return
      }
      if(password==""){
        setError("Password Cannot be Empty")
        return
      }
      const response = await logIn({email,password})
      localStorage.setItem("token", response.data.token); // Store token in local storage
      const { password: userPassword, resetPasswordToken, resetPasswordExpire, ...userData } = response.data.user;
      setUser(userData);
      setEmail("")
      setPassword("")
      // console.log("user",user)
      navigate("/dashboard/home"); // Navigate to dashboard
    } catch (err) {
      console.log(err)
      setError(err.response.data.error);
    }
  };
  const handleForgotPassword = React.useCallback(async () => {
    try {
      setError("");
      if (!agree) {
        setError("Please Agree Terms and Conditions");
        return;
      }
      if (email.trim() === "") {
        setError("Email Cannot be Empty");
        return;
      }
      const response = await forgotPassword({ email });
      console.log(response.data);
  
      if (response.data?.success) {
        successToast(response.data.message);
        
        setEmail("")
        setAgree(false)
        setError("")
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong");
      errorToast(err.response?.data?.message);
    }
  }, [agree, email]);
  

  return (
    <section className="m-8 flex gap-4">
      
      <div className="w-full mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto  max-w-screen-lg lg:w-1/2">
          <div className="mb-2 mx-auto">
            
            <Input
             type="email"
             value={email}
             label="Email"
             onChange={(e) => setEmail(e.target.value)}
              size="lg"
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none mb-2" 
            />
          </div>
          <div className="mb-2 mx-auto">

            <Input
              type="password"
              label="Password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" 

            />

          </div>
          {error && <Typography color="red">{error}</Typography>}
          <Checkbox
            checked={agree}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                
                  Terms and Conditions
              </Typography>
            }
            onChange={()=>setAgree(!agree)}
            containerProps={{ className: "ml-2.5" }}
          />
          <Button onClick={handleLogin} className="mt-6" fullWidth>
            Sign In
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center justify-start font-medium"
                >
                  Subscribe me to newsletter
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            
          </div>
          
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Create account</Link>
          </Typography>
        </form>
      </div>
      
      
     
   
       <ToastContainer />
    </section>
  );
}

export default SignIn;
