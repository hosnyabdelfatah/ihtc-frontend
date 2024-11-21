import {useSelector, useDispatch} from "react-redux";
import {useFetchOrganizationsQuery} from '../../store';
import {getCurrentUser} from "../../features/currentUserSlice";
import Skeleton from "../Skeleton";
import OrganizationCard from "./OrganizationCard";


const OrganizationsList = ({organization}) => {

    const dispatch = useDispatch();
    const {data, error, isFetching} = useFetchOrganizationsQuery(organization);

    const result = useSelector(getCurrentUser)
    const organizationData = result?.currentUser

    let content;
    if (isFetching) {
        content = <Skeleton times={8} className='h-full w-full'/>
    } else if (error) {
        console.log(error)
        content = <div>Error loading organizations.</div>
    } else {
        const organizationCommunity = data.data.filter((organization) => organization.email !== organizationData.email)
        content = organizationCommunity.map((organization) => {
            return <OrganizationCard key={organization.id} organization={organization}/>
        })
    }


    return (
        <div className="m-2  max-w-[90%]  mx-auto  flex flex-row  flex-wrap items-center justify-between p-2">
            {content ? content : <Skeleton times={10} className="w-full h-screen"/>}
        </div>
    );
};

export default OrganizationsList;