import PropTypes from "prop-types";
import { Avatar, Typography } from "@material-tailwind/react";

export function CategoryCard({ img, name, message, action }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-1 font-normal "
          >
            {name}
          </Typography>
        </div>
      </div>
      {action}
    </div>
  );
}

CategoryCard.defaultProps = {
  action: null,
};

CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  action: PropTypes.node,
};

CategoryCard.displayName = "/src/widgets/cards/category-card.jsx";

export default CategoryCard;
