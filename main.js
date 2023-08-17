//Set default channel to general
let channel = 'general'
let allMessagesList = [];

let h1 = document.getElementById('title');

//Set channel to events on clicking events button
let eventsBtn = document.getElementById('events')
eventsBtn.onclick = function() {
    channel = 'events';
    h1.innerHTML = "Discussion Board: Events";
    addMessagesInChannel();
}

let generalBtn = document.getElementById('general')
generalBtn.onclick = function() {
    channel = 'general';
    h1.innerHTML = "Discussion Board: General";
    addMessagesInChannel();
}

let myCommunityBtn = document.getElementById('My Community')
myCommunityBtn.onclick = function() {
    channel = 'My Community';
    h1.innerHTML = "Discussion Board: My Community";
    addMessagesInChannel();
}

let newsBtn = document.getElementById('news')
newsBtn.onclick = function() {
    channel = 'news';
    h1.innerHTML = "Discussion Board: News";
    addMessagesInChannel();
}


/**
 * Get a reference to the Firebase Database object
 */
const database = firebase.database().ref();

/**
 * Get const references to the following elements:
 *      - div with id #all-messages
 *      - input with id #username
 *      - input with id #message
 *      - button with id #send-btn and the updateDB
 *        function as an onclick event handler
 */
const allMessages = document.getElementById('all-messages');
const usernameElem = document.getElementById('username');
const messageElem = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');
sendBtn.onclick = updateDB;

/**
 * Create a function called updateDB which takes
 * one parameter, the event, that:
 *      - gets the values of the input elements and stores
 *        the data in a temporary object with the keys USERNAME
 *        and MESSAGE
 *      - console.logs the object above
 *      - writes this object to the database
 *      - resets the value of #message input element
 */
function updateDB(event){
    event.preventDefault();

    //Store the data into a temp object
    const data = {
        USERNAME: usernameElem.value,
        CHANNEL: channel,
        MESSAGE: messageElem.value,
    }

    //Writing to the database
    database.push(data);

    //Reset the value of the message
    messageElem.value = '';
    console.log(database)
}

/**
 * Add the addMessageToBoard function as an event
 * handler for the "child_added" event on the database
 * object
 */
database.on("child_added", addMessageToBoard);

/**
 * @TODO Step 5 - create a function called addMessageToBoard that
 * takes one parameter rowData which:
 *      - console.logs the data within rowData
 *      - creates a new HTML element for a single message
 *        containing the appropriate data
 *      - appends this HTML to the div with id
 *        #all-messages (we should have a reference already!)
 * 
 */
function addMessageToBoard(rowData){
    //get the object passed from the firebase 
    const data = rowData.val();
    allMessagesList.push(data);
    
    addMessagesInChannel();
}

//Add all messages of the current channel in allMessagesList to the page
function addMessagesInChannel(){
    allMessages.innerHTML = '';
    
    //Loop through allMessagesList and add each to board if its the current channel
    for (let i=0; i < allMessagesList.length; i++){

        //Get the message at the given index
        let message = allMessagesList[i];
        
        if (message.CHANNEL == channel) {
            let singleMessage = makeSingleMessageHTML(message.USERNAME, message.MESSAGE);
            allMessages.append(singleMessage);
        }
    }
}

/** 
 * @TODO Create a function called makeSingleMessageHTML which takes
 * two parameters, usernameTxt and messageTxt, that:
 *      - creates a parent div with the class .single-message
 * 
 *      - creates a p tag with the class .single-message-username
 *      - update the innerHTML of this p to be the username 
 *        provided in the parameter object
 *      - appends this p tag to the parent div
 * 
 *      - creates a p tag
 *      - updates the innerHTML of this p to be the message
 *        text provided in the parameter object
 *      - appends this p tag to the parent div
 * 
 *      - returns the parent div
 */
function makeSingleMessageHTML(usernameTxt, messageTxt){
    //Create parent div
    let parentDiv = document.createElement('div');
    parentDiv.classList.add('single-message');

    //creating p element for username 
    let usernameP = document.createElement("p");
    usernameP.classList.add('single-message-username');
    usernameP.innerHTML = usernameTxt + ":";
    parentDiv.append(usernameP);
    //creating p element for message
    let messageP = document.createElement('p');
    messageP.classList.add('single-message-message');
    messageP.innerHTML = messageTxt;
    parentDiv.append(messageP);


    //Return the full username + message parentDiv
    return parentDiv;
}

const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const previewImage = document.createElement('img');
            previewImage.classList.add('previewImage');
            previewImage.src = e.target.result;
            previewContainer.innerHTML = '';
            previewContainer.appendChild(previewImage);
        }

        reader.readAsDataURL(file);
    }
});

/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 * 
 * @BONUS use an arrow function
 */

