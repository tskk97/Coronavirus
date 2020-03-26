var homepage = document.getElementById("homepage")
homepage.addEventListener('click', gotoHomepage)

var summary = document.getElementById("summary")
summary.addEventListener('click', gotoSummary)

function gotoHomepage(){
    location.replace('index.html')
}

function gotoSummary(){
    location.replace('summary.html')
}