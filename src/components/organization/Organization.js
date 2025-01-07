import React, {useEffect} from 'react';

function Organization(props) {
    useEffect(() => {
        console.log("Hello")
    }, [])
    return (
        <div>Organization</div>
    );
}

export default Organization;