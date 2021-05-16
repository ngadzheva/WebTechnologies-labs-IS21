const sendRequest = (url, options, successCallback, errorCallback) => {
    fetch(url, options)
        .then(response => {
            console.log("Response: ", response)
            response.json()
        })
        .then(data => {
            console.log("Data: ", data)
            // successCallback(data)
        })
        .catch(error => errorCallback(error));
};

const handleError = (error) => {
    console.error(error);
}
