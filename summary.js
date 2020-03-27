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

let countryNames = ["Andorra", "United Arab Emirates", "Afghanistan", "Antigua and Barbuda", "Anguilla", "Albania", "Armenia", "Netherlands Antilles", "Angola", "Argentina", "American Samoaa", "Austria", "Australia", "Aruba", "Aland Islands", "Azerbaijan", 
"Bosnia and Herzegovina", "Barbados", "Bangladesh", "Belgium", "Burkina Faso", "Bulgaria", "Bahrain", "Burundi", "Benin", "Saint Barthélemy", "Bermuda", "Brunei Darussalam", "Bolivia", "Brazil", "Bahamas", "Bhutan", "Bouvet Island", "Botswana", "Belarus", "Belize", 
"Canada", "Central African Republic", "Congo", "Switzerland", "Cote D'Ivoire", "Cook Islands", "Chile", "Cameroon", "China", "Colombia", "Costa Rica", "Cuba", "Cape Verde", "Curacao", "Christmas Island", "Cyprus", "Czech Republic", 
"Germany", "Djibouti", "Denmark", "Dominica", "Dominican Republic", "Algeria" 
]

let countryCodes = ["ad", "ae", "af", "ag", "ai", "al", "am", "an", "ao", "ar", "as", "at", "au", "aw", "ax", "az", 
"ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bl", "bm", "bn", "bo", "br", "bs", "bt", "bv", "bw", "by", "bz", 
"ca", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "cr", "cu", "cv", "cw", "cx", "cy", "cz", 
"de", "dj", "dk", "dm", "do", "dz" 
]

console.log(countryNames.length)
console.log(countryCodes.length)

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
    let page = activePage
    let low = (page-1)*perPage
    let high = page*perPage
    pageData = data.Countries.filter((a,i) => i >= low && i < high)
    fillPage(page)
}

function pagination(page){
    let total = data.Countries.length;
    let pageCount = Math.ceil(total/perPage)
    let pages = document.getElementById("pages")
    pages.innerHTML = ""

    for(let i = 0; i < pageCount; i++){
        let li = document.createElement('li')
        if(i === page-1)
            li.setAttribute('class', 'page-item active')
        else
            li.setAttribute('class', 'page-item')

        li.setAttribute('onclick', `changePage(${i+1})`)
        let a = document.createElement('a')
        a.setAttribute('class', 'page-link')
        a.setAttribute('href', `#${i+1}`)
        a.textContent = i+1
        li.append(a)
        pages.append(li)
    }
    loadData()
}

function changePage(newPage){
    let liActive = document.querySelector(`#pages li:nth-child(${activePage})`)
    console.log(liActive.innerHTML)
    liActive.setAttribute('class', 'page-item')
    activePage = newPage
    let liNew = document.querySelector(`#pages li:nth-child(${activePage})`)
    liNew.setAttribute('class', 'page-item active')
    loadData()
}

function fillPage(){
    let div = document.getElementById("data")
    div.innerHTML = ""
    pageData.forEach(Countries => {
        
        let countryCol = document.createElement('div')
        countryCol.setAttribute('class', 'col-3 mb-5')

        let col = document.createElement('div')
        col.setAttribute('class', 'col')

        let card = document.createElement('div')
        card.setAttribute('class', 'card mx-auto shadow-lg')
        card.setAttribute('style', "width: 24rem; font-family: 'Titillium Web', sans-serif;")

        let cardHeader = document.createElement('div')
        cardHeader.setAttribute('class', 'card-header border-dark')

        let row = document.createElement('div')
        row.setAttribute('class', 'row')

        let country = document.createElement('div')
        country.setAttribute('class', 'col-8')

        let h3 = document.createElement('h3')
        h3.setAttribute('class', 'card-title font-weight-bold mt-3')
        h3.textContent = Countries.Country
        // console.log(Countries.Country)

        let flag = document.createElement('div')
        flag.setAttribute('id', 'flag')
        flag.setAttribute('class', 'col-4 text-right my-auto')

        let img = document.createElement('img')
        img.setAttribute('class', 'card-img')
        img.setAttribute('style', 'width: 64px;')
        for(var i = 0; i < countryNames.length; i++){
            if(countryNames[i] == Countries.Country){
                img.setAttribute('src', 'https://www.countryflags.io/'+countryCodes[i]+'/flat/64.png')
            }
        }

        let cardBody = document.createElement('div')
        cardBody.setAttribute('class', 'card-body mt-4 font-weight-bold h5')

        let nConfirmed = document.createElement('div')
        nConfirmed.setAttribute('class', 'card-subtitle mb-3 text-primary')
        nConfirmed.textContent = "New Confirmed: "

        let newConfirmed = document.createElement('span')
        newConfirmed.setAttribute('class', 'card-text text-dark')
        newConfirmed.textContent = Countries.NewConfirmed

        let tConfirmed = document.createElement('div')
        tConfirmed.setAttribute('class', 'card-subtitle mb-3 text-primary')
        tConfirmed.textContent = "Total Confirmed: "

        let totalConfirmed = document.createElement('span')
        totalConfirmed.setAttribute('class', 'card-text text-dark')
        totalConfirmed.textContent = Countries.TotalConfirmed

        let nDeaths = document.createElement('div')
        nDeaths.setAttribute('class', 'card-subtitle mb-3 text-danger')
        nDeaths.textContent = "New Deaths: "

        let newDeaths = document.createElement('span')
        newDeaths.setAttribute('class', 'card-text text-dark')
        newDeaths.textContent = Countries.NewDeaths

        let tDeaths = document.createElement('div')
        tDeaths.setAttribute('class', 'card-subtitle mb-3 text-danger')
        tDeaths.textContent = "Total Deaths: "

        let totalDeaths = document.createElement('span')
        totalDeaths.setAttribute('class', 'card-text text-dark')
        totalDeaths.textContent = Countries.TotalDeaths

        let nRecovered = document.createElement('div')
        nRecovered.setAttribute('class', 'card-subtitle mb-3 text-success')
        nRecovered.textContent = "New Recovered: "

        let newRecovered = document.createElement('span')
        newRecovered.setAttribute('class', 'card-text text-dark')
        newRecovered.textContent = Countries.NewRecovered

        let tRecovered = document.createElement('div')
        tRecovered.setAttribute('class', 'card-subtitle mb-3 text-success')
        tRecovered.textContent = "Total Recovered: "

        let totalRecovered = document.createElement('span')
        totalRecovered.setAttribute('class', 'card-text text-dark')
        totalRecovered.textContent = Countries.TotalRecovered

        country.appendChild(h3)
        flag.appendChild(img)
        row.appendChild(country)
        row.appendChild(flag)
        cardHeader.appendChild(row)

        nConfirmed.appendChild(newConfirmed)
        tConfirmed.appendChild(totalConfirmed)
        nDeaths.appendChild(newDeaths)
        tDeaths.appendChild(totalDeaths)
        nRecovered.appendChild(newRecovered)
        tRecovered.appendChild(totalRecovered)

        cardBody.appendChild(nConfirmed)
        cardBody.appendChild(tConfirmed)
        cardBody.appendChild(nDeaths)
        cardBody.appendChild(tDeaths)
        cardBody.appendChild(nRecovered)
        cardBody.appendChild(tRecovered)

        card.appendChild(cardHeader)
        card.appendChild(cardBody)

        col.appendChild(card)
        countryCol.appendChild(col)
        div.appendChild(countryCol)
    })
}

window.addEventListener('load', () => {
    select = document.getElementById("pageSelect")
})