
const url = "https://apodapi.herokuapp.com/api/?start_date=2018-10-05&end_date=2018-12-10&thumbs=true&image_thumbnail_size=480&image_thumbnail_size=240"

const starryBgLoop = document.getElementById("starryBgLoop")
console.log(starryBgLoop.playbackRate)
const searchContainer = document.getElementById("searchContainer")
const particlesJs = document.getElementById("particles-js")
const headerDataPage = document.getElementById("headerDataPage")
const ufo = document.getElementById("ufo")
const ufoImage = document.getElementById("ufoImage")
ufoImage.addEventListener("click", warp) 


const getData = async () => {
    const response = await fetch(url)
    console.log("response", response)
    const data = await response.json()
    console.log("data", data)

    return data
} 

async function controller() {
    const dataList = await getData()
    console.log("dataList", dataList)

    createDropdownMenu(dataList)
    createMonths(dataList)
    createNewMonths(months)
    createDataListWithMonths(dataList)
    createCheckboxMenu(dataList)
    searchContainerEventListeners(newDataList)
}
controller()

const createDropdownMenu = (list) => {
    const dropdownMenu = document.getElementById("dropdownMenu")
    const mediaTypes = list.map(e => e.media_type)
    console.log("mediaTypes", mediaTypes)
    const uniqueMediaTypes = [... new Set(mediaTypes)]
    console.log("uniqueMediaTypes", uniqueMediaTypes)
    uniqueMediaTypes.forEach(mediaType => {
        let option = document.createElement("option")
        option.innerHTML = mediaType
        option.value = mediaType
        dropdownMenu.appendChild(option)
    })
}

const months = []
const createMonths = (list) => {
    const dates = list.map(e => e.date)
    console.log("dates", dates)
    dates.forEach(date => {
        let month = new Date(date).toLocaleString('en-us', { month: 'long' })
        console.log("month", month)
        months.push(month)
    }) 
    console.log("months", months)
}

const newMonths = []
const createNewMonths = (months) => {
    months.forEach(month => {
        let newMonth = {value: month}
        newMonths.push(newMonth)
    })
    console.log("newMonths", newMonths)
}

const newDataList = []
const createDataListWithMonths = (list) => {
    for (let i = 0; i < list.length; i++) {
        let newItem = Object.assign(list[i], newMonths[i])
        newDataList.push(newItem)
    }
    console.log("newDataList", newDataList)
}

const createCheckboxMenu = (list) => {
    const checkboxMenu = document.getElementById("checkboxMenu")
   
    const uniqueMonths = [... new Set(months)]
    console.log("uniqueMonths", uniqueMonths)
    uniqueMonths.forEach(month => {
        const monthWrapper = document.createElement("div")
        monthWrapper.className = "form-check"
        monthWrapper.id = "monthWrapper"
        let input = document.createElement("input")
        input.id = "inputId"
        input.type = "checkbox"
        input.className = "form-check-input"
        input.name = "month"
        input.value = month
        console.log("month", month)
        let label = document.createElement("label")
        label.innerHTML = month
        label.className ="form-check-label text-white"
        monthWrapper.appendChild(input)
        monthWrapper.appendChild(label)
        checkboxMenu.appendChild(monthWrapper)
    })
}

const searchContainerEventListeners = (list) => {
    document.getElementById("dropdownMenu")
        .addEventListener("change", (event) => {
            filterByMenu(list)
        })
    document.getElementById("checkboxMenu")
        .addEventListener("change", (event) => {
            filterByMenu(list)
        })
}

const filterByMenu = (list) => {
    const dropdownMenuValue = document.getElementById("dropdownMenu").value
    console.log("dropdownMenuValue", dropdownMenuValue)

    const htmlCollection = document.getElementsByTagName("input")
    console.log("htmlCollection", htmlCollection)
    const inputItems = Array.from(htmlCollection)
    console.log("inputItems", inputItems)
 
    let inputChecked = []
        inputItems.forEach(inputItem => {
            console.log("inputItem", inputItem)
            console.log("inputItem.value", inputItem.value)
            console.log("typeof inputItem.value", typeof inputItem.value)
            if (inputItem.checked === true) {
                inputChecked.push(inputItem.value)
            } return inputChecked
        })
    
    console.log("inputChecked", inputChecked)
    console.log("inputChecked.value", inputChecked.value)
   
    const filteredList = list.filter(listItem => {
        for (let i = 0; i < inputChecked.length; i++) {
            if (listItem.value === inputChecked[i]) {
                return listItem.media_type === dropdownMenuValue || dropdownMenuValue === "all" 
            }
        }
    })
    createCards(filteredList)
}

const createCards = (list) => {

    let row = document.getElementById("row")
    let popUpImages = document.getElementById("popUpImages")
    row.innerHTML = ""
    
    list.forEach(listItem => {

        const col = document.createElement("div")
            col.setAttribute("class", "col-sm-12 col-md-6 col-lg-4")
            row.appendChild(col)

        const card = document.createElement("div")
            card.setAttribute("class", "card embed-responsive position-relative")
            col.appendChild(card)

        const cardBody = document.createElement("div")
            cardBody.setAttribute("class", "card-body embed-responsive position-absolute")
            card.appendChild(cardBody)

        const cardTitle = document.createElement("div")
            cardTitle.innerHTML = listItem.title
            cardTitle.setAttribute("class", "card-title position-absolute")
            cardBody.appendChild(cardTitle)

        const cardButton = document.createElement("btn")
            cardButton.setAttribute("class", "btn")
            cardButton.setAttribute("type", "button")
            cardButton.append(cardTitle)
            cardBody.appendChild(cardButton)

        const cardDate = document.createElement("div")
            cardDate.setAttribute("class", "card-subtitle position-absolute bottom-0 start-98")
            cardBody.appendChild(cardDate)

        const cardCopyright = document.createElement("div")
            cardCopyright.innerHTML = listItem.date + " by:<br>" + listItem.copyright
            cardCopyright.setAttribute("class", "blockquote position-absolute bottom-0 start-98")
            cardBody.appendChild(cardCopyright) 

        if (listItem.media_type == "image") {
            const cardImage = document.createElement("img")
            cardImage.setAttribute("src", listItem.url)
            cardImage.setAttribute("class", "card-img embed-responsive-item position-absolute")
            card.appendChild(cardImage)
            card.addEventListener("click", imageEnlarge)
        }
        else if (listItem.media_type == "video") {   
            const cardIframe = document.createElement("iframe")
            cardIframe.setAttribute("src", listItem.url)
            cardIframe.setAttribute("class", "card-iframe embed-responsive-item position-absolute")
            card.appendChild(cardIframe)
            card.addEventListener("click", videoEnlarge)
        }
        else  {   
            const cardImage = document.createElement("img")
            cardImage.setAttribute("class", "card-img")
            const cardLink = document.createElement("a")
            cardLink.setAttribute("class", "card-link")
            cardLink.setAttribute("target", "blank")
            cardLink.setAttribute("href", listItem.apod_site)
            cardLink.append(cardTitle)
            card.appendChild(cardImage)
            cardBody.appendChild(cardLink)
        }  
        
        card.addEventListener("mouseover", mouseOver)
        card.addEventListener("mouseleave", mouseLeave)
   
     
            function mouseOver() {
                cardBody.style.visibility = "visible"

            }
            function mouseLeave() {
                cardBody.style.visibility = "hidden"
            }

           function imageEnlarge() {
                const modalImages = document.createElement("div")
                modalImages.setAttribute("class", "modal")
                modalImages.setAttribute("role", "dialog")
                modalImages.setAttribute("aria-labelledby", "modalLabel")
                modalImages.setAttribute("aria-hidden", "true")
                popUpImages.appendChild(modalImages)

                const modalDialog = document.createElement("div")
                modalDialog.setAttribute("class", "modal-dialog modal-fullscreen")
                modalDialog.setAttribute("role", "document")
                modalImages.appendChild(modalDialog)

                const modalContent = document.createElement("div")
                modalContent.setAttribute("class", "modal-content")
                modalDialog.appendChild(modalContent)

                const modalHeader = document.createElement("div")
                modalHeader.setAttribute("class", "modal-header")

                const modalTitle = document.createElement("h5")
                modalTitle.setAttribute("class", "modal-title")
                modalTitle.setAttribute("id", "modalLabel")
                modalTitle.innerHTML = cardTitle.innerHTML
                modalHeader.appendChild(modalTitle)

                const modalCloseButton = document.createElement("btn")
                modalCloseButton.setAttribute("type", "button")
                modalCloseButton.setAttribute("class", "close")
                modalHeader.appendChild(modalCloseButton)

                const modalCloseButtonSpan = document.createElement("span")
                modalCloseButtonSpan.setAttribute("aria-hidden", "true")
                modalCloseButtonSpan.setAttribute("class", "buttonSpan")
                modalCloseButtonSpan.innerHTML = "x"
                modalCloseButton.appendChild(modalCloseButtonSpan)

                const modalBody = document.createElement("div")
                modalBody.setAttribute("class", "modal-body")
                modalContent.appendChild(modalBody)
                modalBody.appendChild(modalHeader)

                modalCloseButton.addEventListener("click", closeModal)
                /*window.onclick = function(event) {
                   if (event.target != modalBody) {
                        modalImages.style.display = "none"
                    }
                }*/

                    const modalImage = document.createElement("img")
                    modalImage.setAttribute("src", listItem.url)
                    modalImage.setAttribute("class", "modal-image")
                    modalBody.appendChild(modalImage)

                function closeModal () {
                    modalImages.style.display = "none"
                }
            }

            function videoEnlarge() {
                const modalImages = document.createElement("div")
                modalImages.setAttribute("class", "modal")
                modalImages.setAttribute("role", "dialog")
                modalImages.setAttribute("aria-labelledby", "modalLabel")
                modalImages.setAttribute("aria-hidden", "true")
                popUpImages.appendChild(modalImages)

                const modalDialog = document.createElement("div")
                modalDialog.setAttribute("class", "modal-dialog modal-fullscreen")
                modalDialog.setAttribute("role", "document")
                modalImages.appendChild(modalDialog)

                const modalContent = document.createElement("div")
                modalContent.setAttribute("class", "modal-content")
                modalDialog.appendChild(modalContent)

                const modalIframeHeader = document.createElement("div")
                modalIframeHeader.setAttribute("class", "modal-header modal-iframe-header")
                modalContent.appendChild(modalIframeHeader)

                const modalIframeTitle = document.createElement("h5")
                modalIframeTitle.setAttribute("class", "modal-title modal-iframe-title")
                modalIframeTitle.setAttribute("id", "modalLabel")
                modalIframeTitle.innerHTML = cardTitle.innerHTML
                modalIframeHeader.appendChild(modalIframeTitle)

                const modalCloseButton = document.createElement("btn")
                modalCloseButton.setAttribute("type", "button")
                modalCloseButton.setAttribute("class", "close")
                modalIframeHeader.appendChild(modalCloseButton)

                const modalCloseButtonSpan = document.createElement("span")
                modalCloseButtonSpan.setAttribute("aria-hidden", "true")
                modalCloseButtonSpan.setAttribute("class", "buttonSpan")
                modalCloseButtonSpan.innerHTML = "x"
                modalCloseButton.appendChild(modalCloseButtonSpan)

                const modalBodyIframe = document.createElement("div")
                modalBodyIframe.setAttribute("class", "modal-body-iframe")
                modalContent.appendChild(modalBodyIframe)
                modalBodyIframe.appendChild(modalIframeHeader)

                modalCloseButton.addEventListener("click", closeModal)

                    const modalIframe = document.createElement("iframe")
                    modalIframe.setAttribute("src", listItem.url)
                    modalIframe.setAttribute("class", "airtable-embed")
                    modalBodyIframe.appendChild(modalIframe)
                
                function closeModal () {
                    modalImages.style.display = "none"
                }
            }  
    })
}


function warp() {
    starryBgLoop.playbackRate = 10
    ufo.classList.replace("ufo", "warp")

    function noUfo() {
        ufo.style.display = "none"
        starryBgLoop.playbackRate = 1
        particlesJs.style.display = "none"
        headerDataPage.style.display = "block"
        searchContainer.style.display = "grid"
    } 
    setTimeout(noUfo, 6000)
}

