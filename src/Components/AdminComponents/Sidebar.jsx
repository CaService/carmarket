import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  DocumentArrowUpIcon,
  UserIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";
import AdminContainer from "./AdimnContainer";
import { CardStackIcon } from "@radix-ui/react-icons";

const DefaultSidebar = ({ onViewChange }) => {
  return (
    <Card className="h-[calc(100vh-4rem)] w-full max-w-[18rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-gray-800 text-white">
      <AdminContainer>
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Actions
          </Typography>
        </div>
        <List>
          <ListItem
            className="cursor-pointer hover:text-blue-500"
            onClick={() => onViewChange("cardForm")}
          >
            <ListItemPrefix>
              <CardStackIcon className="h-5 w-5 mr-2" />
            </ListItemPrefix>
            Card Form
          </ListItem>
          {/* <ListItem
            className="cursor-pointer hover:text-blue-500"
            onClick={() => onViewChange("vehicles")}
          >
            <ListItemPrefix>
              <DocumentArrowUpIcon className="h-5 w-5 mr-2" />
            </ListItemPrefix>
            PDF upload
          </ListItem> */}
          <ListItem
            className="cursor-pointer hover:text-blue-500"
            onClick={() => onViewChange("vehiclesTable")}
          >
            <ListItemPrefix>
              <TruckIcon className="h-5 w-5 mr-2" />
            </ListItemPrefix>
            Vehicles Table
          </ListItem>
          <ListItem
            className="cursor-pointer hover:text-blue-500"
            onClick={() => onViewChange("users")}
          >
            <ListItemPrefix>
              <UserIcon className="h-5 w-5 mr-2" />
            </ListItemPrefix>
            Users
          </ListItem>
        </List>
      </AdminContainer>
    </Card>
  );
};

export default DefaultSidebar;
