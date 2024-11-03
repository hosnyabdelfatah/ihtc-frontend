import {useState, useEffect} from 'react';

const ProgressBar = ({increase}) => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const increaseProgress = () => {
            setProgress(increase);
        }
        increaseProgress();
    }, [increase]);


    return (
        <div className="flex flex-col items-center justify-center my-8 bg-lime-100">

            <div
                className="relative  px-.5 w-full max-w-md h-4 bg-lime-100 rounded-lg border-2 border-blue-400 overflow-hidden">
                <div className="absolute  h-full bg-lime-400 rounded transition-all duration-300"
                     style={{width: `${progress}%`}}></div>
            </div>
            {/*<p className="mt-2 text-lg font-semibold">{progress}</p>*/}
        </div>
    );
};

export default ProgressBar;