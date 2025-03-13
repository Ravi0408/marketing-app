import PropTypes from "prop-types";
import { Typography,IconButton } from "@material-tailwind/react";
import InvoiceModal from "../modal/InvoiceModal";
import { AddModal } from "../modal";
import React from "react";
import {CloudArrowUpIcon, PencilIcon } from "@heroicons/react/24/solid";
import {updateCampaign} from "@/utils/requestapi"
import { errorToast, successToast } from "@/utils/UIUtilities/toaster";
export function SessionList({ list = [] ,modalname,fetch}) {
  const [invoiceopen, setInvoiceOpen] = React.useState(false);
  const [invoicedata, setInvoiceData] = React.useState({});
  const [editOpen,setEditOpen]=React.useState(false)
  const [campaignData,setCampaignData]=React.useState({})
  const handleEditCampaign=React.useCallback((id)=>{
    let _campaignData = list.find((item) => item._id === id);
    console.log(_campaignData);
    let {targetAudience, ...rest} = _campaignData;
    let {interests,location,age} = targetAudience;
    setCampaignData({...rest,interests:interests.join(","),location,age});
    setEditOpen(!editOpen);
  },[list])

  const handleInvoiceOpen = React.useCallback(
    (id) => {
      let invoiceitem = list.find((item) => item._id === id);
      console.log(invoiceitem)
      setInvoiceData(invoiceitem);
      setInvoiceOpen(!invoiceopen);
    },
    [invoiceopen, list] // Include list in dependencies if it's dynamic
  );
  const handleUploadOpen = React.useCallback(
    (id) => {
      let invoiceitem = list.find((item) => item._id === id);
      console.log(invoiceitem)
      setInvoiceData(invoiceitem);
      setInvoiceOpen(!invoiceopen);
    },
    [invoiceopen, list] // Include list in dependencies if it's dynamic
  );
  const handleOpen = React.useCallback(
    () => {
      setEditOpen(!editOpen)
    },
  [editOpen])
    const handleCampaignChange=React.useCallback((e)=>{
      const { name, value } = e.target;
      setCampaignData((prevdata)=>({
        ...prevdata,
        [name]:value
      }))
    },[campaignData])
    const handleClose = React.useCallback(
        () => {
            setEditOpen(!editOpen)
            setCampaignData({
              name:"",
              budget:"",
              age:"",
              location:"",
              interests:"",
              startDate:"",
              endDate:"",
              status:"active"
            })
          },
        [editOpen])
    const handleSubmit = React.useCallback(async () => {
      try {
        let data={
          name:campaignData.name,
          budget:campaignData.budget,
          startDate:campaignData.startDate,
          endDate:campaignData.endDate,
          status:campaignData.status,
          targetAudience:{
            age:campaignData.age,
            location:campaignData.location,
            interests:campaignData.interests.split(",")
          }
        }
        const response = await updateCampaign(campaignData._id,data)
        // console.log(response.data.success);
        fetch()
        if(response.data.success){
          successToast("Campaign Updated Successfully!");
        }
        handleClose()
      } catch (error) {
        console.error("Error in handleSubmit:", error);
        errorToast(error.response?.data?.error||"Error in updating");
      }
    }, [campaignData]);
  const renderedList = React.useMemo(() => {
    return list?.map(
      // ({ patient, patientMobileNumber, nextAppointmentDate, symptoms, category, _id }, key) => {
      (item, key) => {
      const className = `py-3 px-5 ${
          key === list.length - 1 ? "" : "border-b border-blue-gray-50"
        }`;

        return (
          <tr key={key}>
            <td className={className}>
              <div className="flex items-center gap-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold"
                  >
                    {item.name}
                  </Typography>
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {item.status}
                  </Typography>
                </div>
              </div>
            </td>
            <td className={className}>
              <Typography className="text-xs font-normal text-blue-gray-500">
                {item.budget||"General"}
              </Typography>
            </td>
            <td className={className}>
              <Typography className="text-xs font-semibold text-blue-gray-600">
                {item.startDate?new Date(item.startDate).toISOString().split("T")[0]:"-"}
              </Typography>
              <Typography className="text-xs font-normal text-blue-gray-500">
                {item.endDate?new Date(item.endDate).toISOString().split("T")[0]:"-"}
                
              </Typography>
            </td>
            <td className={className}>
              <Typography className="text-xs font-normal text-blue-gray-500">
                {item.targetAudience.age || "Unspecified"}
              </Typography>
            </td>
            <td className={className}>
              <Typography className="text-xs font-semibold text-blue-gray-600">
                {item.targetAudience.location || "Unspecified"}
              </Typography>
            </td> 
            <td className={className}>
            <Typography className="text-xs font-semibold text-blue-gray-600">
                {item.targetAudience.interests || "Unspecified"}
              </Typography>
              
            </td>
            <td className={className}>

              <IconButton
                variant="text"
                color="gray"
                
                onClick={(e) => handleEditCampaign(item._id)}
                // className="text-xs font-semibold text-blue-gray-600"
                >
                <PencilIcon className="h-5 w-5 text-blue-gray-500"/>
              </IconButton>
              <IconButton
                variant="text"
                color="gray"
                
                onClick={(e) => handleUploadOpen(item._id)}
                // className="text-xs font-semibold text-blue-gray-600"
                >
                <CloudArrowUpIcon className="h-5 w-5 text-blue-gray-500"/>
              </IconButton>
            </td>
          </tr>
        );
      }
    );
  }, [list]);

  return (
    <>
      {list.length > 0 ? (
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Name", "Budget", "Start Date-End Date", "Age group", "location","interests",""].map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 py-3 px-5 text-left"
                >
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderedList}</tbody>
        </table>
      ) : (
        <div className="flex justify-center py-20">
          <Typography variant="h4" color="gray" className="text-center">
          {modalname=="home"? "No campaigns!":"No Data Found"}
          </Typography>
        </div>
      )}
      <InvoiceModal
        invoiceopen={invoiceopen}
        handleInvoiceOpen={handleUploadOpen}
        invoicedata={invoicedata}
      />
         <AddModal 
            modalname={"Edit Campaign"}
            open={editOpen} 
            handleOpen={handleOpen}
            campaign={campaignData}
            handleCampaignChange={handleCampaignChange}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
          />
    </>
  );
}

SessionList.defaultProps = {
  action: null,
};

SessionList.propTypes = {
  list: PropTypes.array.isRequired,
  action: PropTypes.node,
};

SessionList.displayName = "/src/widgets/cards/session-list.jsx";

export default SessionList;
