const sendRequest = (url, options, successCallback, errorCallback) => {
    fetch(url, options)
        .then(response => response.json())
        .then(data => successCallback(data))
        .catch(error => errorCallback(error));
};

const handleError = (error) => {
    console.error(error);
}
