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
        <div className="m-2  max-w-10/12  flex flex-row items-center justify-between">
            {content ? content : <Skeleton className="w-full h-5" times={10}/>}
        </div>
    );
};

export default OrganizationsList;