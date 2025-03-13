import React, { useCallback, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,

  Button
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { registerCampaign,getCampaigns} from "@/utils/requestapi";
import { SessionList } from "@/widgets/cards";
import { useNavigate } from "react-router-dom";
import {AddModal} from "@/widgets/modal"
import { useUser } from "@/context/usercontext";
import { ToastContainer, toast } from 'react-toastify';
import { errorToast, successToast } from "@/utils/UIUtilities/toaster";
import { paginationGenerator } from "@/utils/UIUtilities/pagination";
export function Home() {
  const [modalopen, setModalOpen] = React.useState(false);
  const [active, setActive] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [totalSessions, setTotalSessions] = React.useState(1);
  const [todayList, setTodaysList] = React.useState([]);
  const [campaign, setCampaign]=React.useState({
    name:"",
    budget:"",
    age:"",
    location:"",
    interests:"",
    startDate:"",
    endDate:"",
    status:"active"
  })
  const navigate = useNavigate();




  const handleOpen = React.useCallback(
    () => {
        setModalOpen(!modalopen)
        setCampaign({
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
    [modalopen])
  const handleClose = React.useCallback(
    () => {
        setModalOpen(!modalopen)
        setCampaign({
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
    [modalopen])
  const handleCampaignChange=React.useCallback((e)=>{
    const { name, value } = e.target;
    setCampaign((prevdata)=>({
      ...prevdata,
      [name]:value
    }))
  },[campaign])


  const handleSubmit = React.useCallback(async () => {
      try {
        console.log(campaign)
        let data={
          name:campaign.name,
          budget:campaign.budget,
          startDate:campaign.startDate,
          endDate:campaign.endDate,
          status:campaign.status,
          targetAudience:{
            age:campaign.age,
            location:campaign.location,
            interests:campaign.interests.split(",")
          }
        }
        const response = await registerCampaign(data)
        _fetchCampaignData()
        if(response.data.success){
          successToast("Campaign Created Successfully!");
          
        }
        handleOpen()
      } catch (error) {
        console.error("Error in handleSubmit:", error);
        errorToast(error.response.data.error);
      }
    }, [campaign]);
  



  const _fetchCampaignData = useCallback(() => {
    try {
        async function getSessionData() {
          const response= await getCampaigns(active)
          setTodaysList(response.data.populatedSessions)
          setTotalPages(response.data.totalPages||1);
          setTotalSessions(response.data.totalTodaySessions);
          console.log(response.data)
        }
        const token = localStorage.getItem("token");
        if (!token) {
          return navigate("/auth/sign-in");
        }
        getSessionData()
      } catch (error) {
        console.log(error)
      }
    }, [navigate,active]);



  const generatePagination =React.useCallback( () => {
    return paginationGenerator(active,totalPages,setActive)
  },[active,totalPages])
  

  useEffect(_fetchCampaignData,[active]);

  return (
    <div className="mt-12">
      <Card> 
        <CardHeader variant="gradient" color="gray" className=" flex justify-between gap-2 mb-8 p-6">
        <Button
            variant="filled"
            color="blue-gray"
            className=""
            onClick={handleOpen}
          >
            Add Campaign
          </Button>

        </CardHeader>
        <CardBody className="flex flex-col justify-between  px-0 pt-0 pb-2 overflow-y-auto">
        <SessionList 
        list={todayList}
        fetch={_fetchCampaignData}
        modalname={"home"}
        />
        </CardBody>
        <div className="flex items-center justify-center gap-4 mt-4">
            <Button
              variant="text"
              className="flex items-center gap-2"
              onClick={() => setActive((prev) => Math.max(prev - 1, 1))}
              disabled={active === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> 
            </Button>
            <div className="flex items-center gap-2">{generatePagination()}</div>
            <Button
              variant="text"
              className="flex items-center gap-2"
              onClick={() => setActive((prev) => Math.min(prev + 1, totalPages))}
              disabled={active === totalPages}
            >
             <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
          </div>
      </Card>
      <AddModal 
      modalname={"Add Campaign"}
      open={modalopen} 
      handleOpen={handleOpen}
      campaign={campaign}
      handleCampaignChange={handleCampaignChange}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      />

      <ToastContainer />
    </div>
  );
}

export default Home;
