import React from 'react';

const LanguageCard = ({language}) => {
    return (
        <option value={language._id}>
            {language.title}
        </option>
    );
};

export default LanguageCard;