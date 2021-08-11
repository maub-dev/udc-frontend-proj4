function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    const requestData = {
        text: 'For those who live in the West, the dangers of warming our planet are no longer something distant, impacting people in faraway places. Climate change is not a problem of the future, its here and now and affecting every region in the world, said Dr Friederike Otto from the University of Oxford, and one of the many authors on the UNs Intergovernmental Panel on Climate Change (IPCC) report. It is the confidence of the assertions that the scientists are now making that is the real strength of this new publication. The phrase very likely appears 42 times in the 40-odd pages of the Summary for Policymakers. In scientific terms, thats 90-100% certain that something is real.'
    };

    postData('http://localhost:8080/evalText', requestData);
}

const postData = async (url, data = {})=>{
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log("error", error);
    }
};

export { handleSubmit }
