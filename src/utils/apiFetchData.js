import axios from "axios";

const fetchData = async (dataName) => {
    const result = {};
    console.log(dataName)
    try {
        const response = await axios({
            method: "GET",
            url: `http://localhost:5000/${dataName}`
        });
        if (response) {
            result['data'] = await response.data.data
            return result;
        }
    } catch (e) {
        console.log(e)
        result['err'] = "Did not receive expected! Please reload the app."
        return result;
    }
}

export default fetchData;