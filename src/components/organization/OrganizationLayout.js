import {Outlet} from 'react-router-dom';
import OrganizationNav from "./OrganizationNav";
import Footer from '../Footer';

const OrganizationLayout = () => {
    return (
        <>
            <OrganizationNav/>
            <Outlet/>
            {/*<Footer/>*/}
        </>
    );
};

export default OrganizationLayout;