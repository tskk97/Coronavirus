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
let data = []
let pageData = []
let perPage = 50
let activePage = 1
let select

fetch("https://api.covid19api.com/summary")
    .then(response => response.json())
    .then(res => {
        data = res
        console.log(data)
        pagination(activePage)
    })

function loadData(){

}    

function pagination(){

}

function changePage(){

}

function fillPage(){

}

window.addEventListener('load', () => {
    select = document.getElementById("pageSelect")
})