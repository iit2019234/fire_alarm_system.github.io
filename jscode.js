

function sendEmail(temperature_value,gas_value,flame_value){
    Email.send({
        Host : "smtp.gmail.com",
        Username : "iit2019234@iiita.ac.in",
        Password : "Pravallika@26",
        To : 'pravallika.kodi@gmail.com',
        From : "iit2019234@iiita.ac.in",
        Subject : "FIRE ALERT🔥🔥🔥",
        Body : "Warning: This is fire alert. Fire is detected!!!<br/> Be cautious and take necessary actions...<br/> "+
        "flame_value: "+flame_value+"<br/>gas_value: "+gas_value+"<br/>temperature_value: "+temperature_value
    }).then(
        //message => alert(message)
        console.log("Mail sent successfully!!!")
    );
}
// Your web app's Firebase configuration
var firebaseConfig = {
// YourCode
    apiKey: "AIzaSyBV3jP5cl1AVP3HgO6_1J_wrjyffqQUfko",
    authDomain: "iotproject-2800f.firebaseapp.com",
    databaseURL: "https://iotproject-2800f-default-rtdb.firebaseio.com",
    projectId: "iotproject-2800f",
    storageBucket: "iotproject-2800f.appspot.com",
    messagingSenderId: "863247827424",
    appId: "1:863247827424:web:ba640e5eabf0b412062b85",
    measurementId: "G-727CF3R175"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var loop=1;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function data_to_firebase(){
    while(loop<=5){
    // Add data
    var temperature_value=Math.random()*101;
    var gas_value=Math.random()*101;
    var flame_value=Math.random()*101;
    console.log("temperature_value: ",temperature_value);
    console.log("gas value: ",gas_value);
    console.log("flame sensor: ",flame_value);
    let obj = {
        temperature: temperature_value,
        gas: gas_value,
        flame_sensor: flame_value
    };
    var str="sensor_data/"+loop;
    // if(temperature_value>15 && gas_value>=15 && flame_value>=18){
    //     sendEmail(temperature_value,gas_value,flame_value);
    // }
    firebase.database().ref(str).set(obj);
    firebase.database().ref(str).on("value", (sanpshot) => {
        //console.log(sanpshot.val().gas);
        if(sanpshot.val().temperature>15 && sanpshot.val().gas>=15 && sanpshot.val().flame_sensor>=18){
            sendEmail(sanpshot.val().temperature,sanpshot.val().gas,sanpshot.val().flame_sensor);
        }
    });
    //console.log("printing values ",sanpshot.val().gas)
    await sleep(2 * 1000);
    loop++;

    }
}
data_to_firebase(); 


// // read data
// firebase.database().ref("users/user1").on("value", (sanpshot) => {console.log(sanpshot.val());});

// update data
//let newupdateddata = {
//     name: "TF0",
//   };
//   firebase.database().ref("users/user3").update(newupdateddata);

//   // remove data
//   firebase.database().ref("users/user3").remove();

