// ================= API =================

const API = "http://127.0.0.1:5000";


// ================= REGISTER DONOR =================

async function register(){

try{

let data = {
name: document.getElementById("name").value,
age: document.getElementById("age").value,
blood_group: document.getElementById("blood-group").value,
city: document.getElementById("city").value,
phone: document.getElementById("phone").value,
last_donation: document.getElementById("last").value
}

let res = await fetch(API + "/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(data)
})

let result = await res.json()

alert(result.message || "Donor registered successfully")

}catch(err){

alert("Registration failed")

}

}



// ================= SEARCH DONORS =================

async function searchDonors(){

try{

let blood = document.getElementById("blood-group").value
let city = document.getElementById("city").value

let res = await fetch(API + `/search?blood=${blood}&city=${city}`)
let data = await res.json()

let html = ""

if(data.length === 0){

html = "<p>No donors found</p>"

}else{

data.forEach(d => {

html += `
<div class="donor-card">

<h3>${d.name}</h3>

<p><strong>Blood:</strong> ${d.blood_group}</p>
<p><strong>City:</strong> ${d.city}</p>
<p><strong>Phone:</strong> ${d.phone}</p>

</div>
`

})

}

document.getElementById("donorResults").innerHTML = html

}catch(err){

console.error(err)

}

}



// ================= BLOOD GROUP QUICK SEARCH =================

document.querySelectorAll(".blood").forEach(group => {

group.addEventListener("click", () => {

let blood = group.innerText

document.getElementById("blood-group").value = blood

searchDonors()

})

})



// ================= SEARCH BUTTON =================

document.getElementById("searchBtn").addEventListener("click", () => {

searchDonors()

})



// ================= EMERGENCY BUTTON =================

document.getElementById("emergencyBtn").addEventListener("click", () => {

alert("Emergency request sent. Nearby donors will be notified.")

})



// ================= HOSPITAL BUTTON =================

document.getElementById("hospitalBtn").addEventListener("click", () => {

alert("Hospital list feature coming soon.")

})



// ================= REGISTER BUTTON =================

document.getElementById("registerBtn").addEventListener("click", () => {

alert("Donor registration form will open.")

})
