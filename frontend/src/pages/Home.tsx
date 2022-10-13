import { CPPMap } from "../components/CPPMap";
import { Navigation } from "../components/Navigation";
import { DateTime } from "../components/DateTime";
//import '../styles/general.css'
import { ProSidebarProvider } from "react-pro-sidebar";

export const Home = (): JSX.Element => {
  return (
    <div>
      <ProSidebarProvider>
        <CPPMap />
      </ProSidebarProvider>
    </div>
  );
};
