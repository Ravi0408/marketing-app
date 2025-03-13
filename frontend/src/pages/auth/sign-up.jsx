import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"; // useNavigate hook for React Router v6
import { registerUser } from "@/utils/requestapi";
import { successToast } from "@/utils/UIUtilities/toaster";
export function SignUp() {
   const [error, setError] = useState("");
   const [agree, setAgree] = useState(false);



  const [user, setUser]=React.useState({
    name:"",
    email:"",
    password:"",
    confirmpassword:"",
  })
  const handleUserChange=React.useCallback((e)=>{
    const { name, value } = e.target;
    setUser((prevdata)=>({
      ...prevdata,
      [name]:value
    }))
  },[user])


  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setError("")
      if(!agree){
        setError("Please Agree Terms and Conditions")
        return
      }
      if(user.name==""){
        setError("Name Cannot be Empty")
        return
      }

      if(user.email==""){
        setError("Email Cannot be Empty")
        return
      }

      if(user.password==""){
        setError("Password Cannot be Empty")
        return
      }
      if(user.confirmpassword==""){
        setError("Password Cannot be Empty")
        return
      }
      
      if(user.confirmpassword!==user.password){
        setError("Password should be same")
        return
      }

      const response = await registerUser(user)
      if (response.data.success) {
        successToast("Registerd! Lets Sign You In");
        
        setTimeout(() => {
          navigate("/auth/sign-in");  // Redirect to login page after successful registration
        }, 3000);
      }
    } catch (err) {
      console.log(err)
      setError(err.response.data.error);
      errorToast(err.response?.data?.error);
    }
  };

  return (
    <section className="m-8 flex">
            
      <div className="w-full  flex flex-col items-center mt-6">
        <div className="text-center">
        {/* <p>
          {import.meta.env.VITE_AUTHORS}
        </p> */}
          <Typography variant="h2" className="font-bold mb-4">Sign Up</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to register.</Typography>
        </div>
        <form className="mt-1 mb-2 mx-auto  max-w-screen-lg lg:w-5/6">

    
        <div className="mb-2 grid gap-y-5 gap-x-6 md:grid-cols-12 xl:grid-cols-12">
          <div className="md:col-span-6 xl:col-span-6 ">
          <Input
                label="Name"
                name="name"
                onChange={(e) => handleUserChange(e)}
                value={user.name}
                // placeholder="e.g., +1 123-456-7890"
                className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                
              />
          </div>

          <div className="md:col-span-6 xl:col-span-6">
          <Input
            label="Email"
              // size="lg"
              value={user.email}
              name="email"
              onChange={(e) => handleUserChange(e)}
              // placeholder="name@mail.com"
              // className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
             
            />
          </div>
        </div>
          <div className="mb-2 grid gap-y-5 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
            {/* <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography> */}
            <Input
              // size="lg"
              value={user.password}
              onChange={(e) => handleUserChange(e)}
              type="password"
              label="Password"
              name="password"
              // placeholder="password"
              // className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              
            />
            <Input
              // size="lg"
              value={user.confirmpassword}
              onChange={(e) => handleUserChange(e)}
              type="password"
              name="confirmpassword"
              label="Confirm Password"
              // placeholder="password"
              // className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              
            />
          </div>
          {error && <Typography color="red">{error}</Typography>}

            <Checkbox
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
            containerProps={{ className: "-ml-2.5" }}
            checked={agree}
            />
          <Button onClick={handleRegister} className="mt-6 mt-8" fullWidth>
            Register Now
          </Button>

       
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>

      </div>

      <ToastContainer />
    </section>
  );
}

export default SignUp;
