import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import React, { useMemo } from "react";
import { ToastContainer, toast } from 'react-toastify';
export function ProfileInfoCard({ title, description, details, action}) {
  


	const _description = useMemo(function(){
		
		if(!description){
			return null;
		}

		return (<Typography
					variant="small"
					className="font-normal text-blue-gray-500"
				>
					{description}
				</Typography>)
	},[description]);


	const _details = useMemo(function(){

		if(!details){
			return null;
		}

		const _detailItem = Object.keys(details).map(function(el, key){

			let _txt = details[el];

			if(typeof details[el] === "string"){
				_txt = <Typography
							variant="small"
							className="font-normal text-blue-gray-500"
						>
							{details[el]}
						</Typography>
			}


			return (<li key={key} className="flex items-center gap-4">
						<Typography
							variant="small"
							color="blue-gray"
							className="font-semibold capitalize"
						>
							{el}:
						</Typography>
						{_txt}
					</li>)
		})

		return (<ul className="flex flex-col gap-4 p-0">
					{_detailItem}
				</ul>)
		

	},[details])


  
  return (
    <Card color="transparent" shadow={false}>
      <CardHeader
        color="transparent"
        shadow={false}
        floated={false}
        className="mx-0 mt-0 mb-4 flex items-center justify-between gap-4"
      >
        <Typography variant="h6" color="blue-gray">
          {title}
        </Typography>
        {action}
      </CardHeader>
      <CardBody className="p-0">
        {_description}
        {description && details ? (
          <hr className="my-8 border-blue-gray-50" />
        ) : null}
		{ _details }
       
        
      </CardBody>
     
      <ToastContainer />
    </Card>
  );
}

ProfileInfoCard.defaultProps = {
  action: null,
  description: null,
  details: {},
};

ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.node,
  details: PropTypes.object,
};

ProfileInfoCard.displayName = "/src/widgets/cards/profile-info-card.jsx";

export default ProfileInfoCard;
