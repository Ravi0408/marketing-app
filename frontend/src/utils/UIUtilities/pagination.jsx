import React from "react";
import { IconButton } from "@material-tailwind/react";

const paginationGenerator=function(active,totalPages,setActive){
     
        const pagination = [];
        const maxButtons = 3; // Maximum visible buttons
        const halfRange = Math.floor(maxButtons / 2);
    
        let start = Math.max(active - halfRange, 1);
        let end = Math.min(active + halfRange, totalPages);
    
        // Adjust if at the beginning or end of pages
        if (active <= halfRange) {
          end = Math.min(maxButtons, totalPages);
        } else if (active > totalPages - halfRange) {
          start = Math.max(totalPages - maxButtons + 1, 1);
        }
    
        // Add first page
        if (start > 1) {
          pagination.push(
            <IconButton key={1} onClick={() => setActive(1)} variant={active === 1 ? "filled" : "text"}>
              1
            </IconButton>
          );
          if (start > 2) pagination.push(<span key="start-ellipsis">...</span>);
        }
    
        // Add middle pages
        for (let i = start; i <= end; i++) {
          pagination.push(
            <IconButton
              key={i}
              onClick={() => setActive(i)}
              variant={active === i ? "filled" : "text"}
            >
              {i}
            </IconButton>
          );
        }
    
        // Add last page
        if (end < totalPages) {
          if (end < totalPages - 1) pagination.push(<span key="end-ellipsis">...</span>);
          pagination.push(
            <IconButton key={totalPages} onClick={() => setActive(totalPages)} variant={active === totalPages ? "filled" : "text"}>
              {totalPages}
            </IconButton>
          );
        }
    
        return pagination;
}

export {paginationGenerator}