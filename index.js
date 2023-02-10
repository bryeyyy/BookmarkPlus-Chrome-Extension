const subinput = document.querySelector("#submitinput")
const subtab = document.querySelector("#submittab")
const inputel = document.querySelector("#inputEl")
const bookmarks = document.querySelector("#bookmarkarea")
const delbtn = document.querySelector(".delbtn")

let myLeads = []

const br = document.createElement("br")

const storedleads = JSON.parse(localStorage.getItem("myLeads"))

subinput.addEventListener("click", () => {
    myLeads.push(inputel.value)
    renderLeads(myLeads)
    inputel.value = "https://"
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
})

subtab.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads(myLeads)
    })
    inputel.value = "https://"
})

function renderLeads(leadsarray) {
    let liItems = ""
    
    for (let i = 0; i < leadsarray.length ; i++){
        liItems += `<a href='${leadsarray[i]}' target="_blank">
                        ${leadsarray[i]}
                    </a>`
    }
    bookmarks.innerHTML = liItems
    bookmarks.scrollTop = bookmarks.scrollHeight;
}

delbtn.addEventListener("click", () => {
    localStorage.clear()
    myLeads = []
    renderLeads(myLeads)
    ifmyleadsnull()
    confirm("Delete Everything?")
})

function ifmyleadsnull(){
    bookmarks.innerHTML = ` <p> Your saved links will go here. Start saving! </p>`
}

if (storedleads) {
    myLeads = storedleads
    renderLeads(myLeads)
    console.log("found")
}

//run on start
ifmyleadsnull()