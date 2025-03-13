import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { SessionList } from "@/widgets/cards";
import { getCampaigns, } from "@/utils/requestapi";
import { paginationGenerator } from "@/utils/UIUtilities/pagination";
export function Sessions() {
  const [active, setActive] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [totalSessions, setTotalSessions] = React.useState(1);
  const [list, setList] = React.useState([]); 
  React.useEffect(() => {
    async function fetchSessions() {
      try {
          const response= await getCampaigns(active)
          setList(response.data.populatedSessions);
          setTotalPages(response.data.totalPages||1);
          setTotalSessions(response.data.totalSessions);
        
        // console.log(filter)
      } catch (error) {
        console.log(error);
      }
    }
    fetchSessions();
  }, [active,]);

  // Helper to generate dynamic pagination
  const generatePagination = React.useCallback(() => {
    return paginationGenerator(active,totalPages,setActive)
    
  },[active,totalPages])

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
      <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex items-center">
  {/* Left-aligned text */}
  <Typography variant="h6" color="white">
    {totalSessions} Campaigns
  </Typography>


</CardHeader>

        <CardBody className="flex flex-col justify-between px-0 pt-0 overflow-y-auto">
          <SessionList list={list} modalname={"session"}/>
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

    </div>
  );
}

export default Sessions;
