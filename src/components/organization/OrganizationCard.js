import {Link} from 'react-router-dom';

const OrganizationCard = ({organization}) => {
    return (
        <div
            className="ml-2 rounded-md w-1/4 h-2/4 border-2 bg-amber-300 p-1 scale-100 hover:scale-110 transition-transform ">
            <div className="organization-header  rounded-md h-2/4  mb-2">
                <div className='organization-logo w-full h-full'>
                    <img className=" w-full h-full" src={organization?.logo} alt='organization-logo'/>
                </div>

            </div>
            <div className="organization_details h-2/4 mt-6">
                <div
                    className="organization-name mb-8 py-1 text-center text-md text-[#0657A8] border font-bold rounded-[8px] drop-shadow-md">
                    {organization?.name}
                </div>
                <div className='organization.industryField my-1 text-stone-900'>
                    <span>Industry</span> <span className="font-bold"> {organization?.industryField}</span>
                </div>
                <Link to={`/card-details/${organization.email}`} className="card-details font-bold  text-violet-700">
                    More details...
                </Link>
            </div>

        </div>
    );
};

export default OrganizationCard;