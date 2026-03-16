const API="http://127.0.0.1:5000"

let map
let vehicleMarker



function initMap(){

map=new google.maps.Map(document.getElementById("map"),{

center:{lat:17.385, lng:78.4867},
zoom:12

})

}


/* SEARCH DONORS */

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



/* BLOOD QUICK SEARCH */

document.querySelectorAll(".blood").forEach(b=>{

b.onclick=()=>{

document.getElementById("blood-group").value=b.innerText
searchDonors()

}

})



/* HOSPITAL MAP MARKERS */

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
title:h.name,
icon:"https://maps.google.com/mapfiles/ms/icons/red-dot.png"

})

})

}



/* BLOOD TRANSPORT TRACKING */

function startTracking(){

let path=[

{lat:17.385,lng:78.486},
{lat:17.386,lng:78.480},
{lat:17.388,lng:78.475},
{lat:17.390,lng:78.470},
{lat:17.392,lng:78.465}

]

let i=0

vehicleMarker=new google.maps.Marker({

position:path[0],
map:map,
title:"Blood Transport",
icon:"https://maps.google.com/mapfiles/ms/icons/ambulance.png"

})

setInterval(()=>{

if(i<path.length){

vehicleMarker.setPosition(path[i])
map.panTo(path[i])
i++

}

},3000)

}
