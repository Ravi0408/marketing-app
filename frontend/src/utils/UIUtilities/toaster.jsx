import { toast } from "react-toastify";

const successToast = function(msg){

    return toast.success(msg,{
              className:`bg-green-200 text-blue-gray-500` 
            });

}

const errorToast = function(msg){

    return toast.error(msg,{
        className:`bg-red-100 text-blue-gray-500` 
    });

}


export {successToast, errorToast}