import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
  Card,
  CardHeader,
  CardBody,
  Input,
  Select,
  Option
} from "@material-tailwind/react";
import PropTypes from "prop-types";
export function AddModal(props) {
  const{modalname,open,handleOpen,handleClose,campaign,handleCampaignChange,handleSubmit} =props
  return (
 
      <Dialog open={open} size="xl" handler={handleOpen} >
        <DialogBody>
        <Card> 
        <CardHeader variant="gradient" color="gray" className=" flex justify-between mb-8 p-6">
          <Typography variant="h6" color="white">
            {modalname}
          </Typography>
          
        </CardHeader>
        <CardBody className=" px-0 pt-0 pb-2">
             <form className="mt-4 mb-2 mx-auto  max-w-screen-lg lg:w-5/6">
             
            <div className=" mb-2 mx-auto " >
              <Input
                label=" Name"
                name="name"
                onChange={(e) => handleCampaignChange(e)}
                value={campaign.name}
                required
                pattern="^\+\d{1,3}\s\d{1,4}-\d{1,4}-\d{4}$"
                className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
               
              />
            </div>
        <div className="mb-2 grid gap-y-5 gap-x-6 md:grid-cols-2 xl:grid-cols-2" >
        <Input
              maxLength={10}
              label="budget"
              value={campaign.phone}
              name="budget"
              onChange={(e) => handleCampaignChange(e)}
              required
              
              
            />
            <Select 
            label="status"
            name="status"
            value={campaign.status}
            onChange={(value) => handleCampaignChange({ target: { name: "status", value } })}
            >
              <Option value="active">active</Option>
              <Option value="paused">paused</Option>
              <Option value="completed">completed</Option>
            </Select>
         
            
            
            
          </div>
          <div className="mb-2 grid gap-y-2 gap-x-6 md:grid-cols-2 xl:grid-cols-2" >
            
            <Input
            label="Start date"
            type="date"
            name="startDate"
            value={campaign?.startDate?new Date(campaign?.startDate).toISOString().split("T")[0]:""}
            onChange={(e) => handleCampaignChange(e)}
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              required
            />
            <Input
            label="End Date"
            type="date"
            name="endDate"
            value={campaign?.endDate?new Date(campaign?.endDate).toISOString().split("T")[0]:""}
            onChange={(e) => handleCampaignChange(e)}
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              required
            />
            <Input
              value={campaign.age}
              label="age"
              name="age"
              onChange={(e) => handleCampaignChange(e)}
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <Input
              value={campaign.location}
              name="location"
              onChange={(e) => handleCampaignChange(e)}
              label="Location"
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
             
            />
            
            
            
          </div>
          
            
            
          <div className=" mb-2 mx-auto " >
            <Input
            type="text"
              label="Interests"
              name="interests"
              onChange={(e) => handleCampaignChange(e)}
              value={campaign.interests}
              required
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
             
            />
          </div>
          

          
        </form>

        </CardBody>
      </Card>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            onClick={handleClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" onClick={handleSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
   
  );
}
AddModal.defaultProps = {
  
open:false,
  
};

AddModal.propTypes = {
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
  campaign: PropTypes.object,
  handleCampaignChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

AddModal.displayName = "/src/widgets/modal/addmodal.jsx";

export default AddModal;