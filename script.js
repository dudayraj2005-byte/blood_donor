const API="http://127.0.0.1:5000"

let map
let vehicleMarker

function initMap(){

map=new google.maps.Map(document.getElementById("map"),{

center:{lat:17.385,lng:78.4867},
zoom:12

})

}

function openLogin(){
document.getElementById("authModal").style.display="flex"
}

function closeAuth(){
document.getElementById("authModal").style.display="none"
}


async function registerUser(){

let name=document.getElementById("authName").value
let phone=document.getElementById("authPhone").value
let blood=document.getElementById("authBlood").value
let city=document.getElementById("authCity").value

let res=await fetch(API+"/register",{

method:"POST",
headers:{"Content-Type":"application/json"},

body:JSON.stringify({name,phone,blood_group:blood,city})

})

let data=await res.json()

alert(data.message)

}


async function loginUser(){

let phone=document.getElementById("authPhone").value

let res=await fetch(API+"/login",{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({phone})

})

let data=await res.json()

alert(data.message)

}


async function searchDonors(){

let blood=document.getElementById("blood-group").value
let city=document.getElementById("city").value

let res=await fetch(API+`/search?blood=${blood}&city=${city}`)

let data=await res.json()

let html=""

data.forEach(d=>{

html+=`
<div class="donor-card">
<h3>${d.name}</h3>
<p>Blood: ${d.blood_group}</p>
<p>City: ${d.city}</p>
<p>Phone: ${d.phone}</p>
</div>
`

})

document.getElementById("donorResults").innerHTML=html

}

document.getElementById("searchBtn").onclick=searchDonors


function showHospitals(){

let hospitals=[

{lat:17.385,lng:78.486,name:"City Hospital"},
{lat:17.401,lng:78.470,name:"Red Cross Blood Bank"},
{lat:17.368,lng:78.490,name:"Apollo Hospital"},
{lat:17.392,lng:78.450,name:"Care Hospital"}

]

hospitals.forEach(h=>{

new google.maps.Marker({

position:{lat:h.lat,lng:h.lng},
map:map,
title:h.name

})

})

}


function startTracking(){

let path=[

{lat:17.385,lng:78.486},
{lat:17.386,lng:78.480},
{lat:17.388,lng:78.475},
{lat:17.390,lng:78.470}

]

let i=0

vehicleMarker=new google.maps.Marker({

position:path[0],
map:map,
title:"Blood Transport"

})

setInterval(()=>{

if(i<path.length){

vehicleMarker.setPosition(path[i])
map.panTo(path[i])
i++

}

},3000)

}


function setHospital(){

let hospital=document.getElementById("hospitalInput").value

document.getElementById("trackingStatus").innerText="Hospital set to "+hospital

}
