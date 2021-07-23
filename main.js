
const url = "https://apodapi.herokuapp.com/api/?start_date=2018-10-05&end_date=2018-12-10&thumbs=true&image_thumbnail_size=480&image_thumbnail_size=240"

const starryBgLoop = document.getElementById("starryBgLoop")
console.log(starryBgLoop.playbackRate)
const searchContainer = document.getElementById("searchContainer")
const particlesJs = document.getElementById("particles-js")
const headerDataPage = document.getElementById("headerDataPage")
const row = document.getElementById("row")
const popUpImages = document.getElementById("popUpImages")
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
    createCards(dataList)
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

function createCards() {
    
    for (let i = 0; i < data.length; i++) {

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
            cardTitle.innerHTML = data[i].title
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
            cardCopyright.innerHTML = data[i].date + " by:<br>" + data[i].copyright
            cardCopyright.setAttribute("class", "blockquote position-absolute bottom-0 start-98")
            cardBody.appendChild(cardCopyright) 

        if (data[i].media_type == "image") {
            const cardImage = document.createElement("img")
            cardImage.setAttribute("src", data[i].url)
            cardImage.setAttribute("class", "card-img embed-responsive-item position-absolute")
            card.appendChild(cardImage)
            card.addEventListener("click", imageEnlarge)
        }
        else if (data[i].media_type == "video") {   
            const cardIframe = document.createElement("iframe")
            cardIframe.setAttribute("src", data[i].url)
            cardIframe.setAttribute("class", "card-iframe embed-responsive-item position-absolute")
            card.appendChild(cardIframe)
            card.addEventListener("click", videoEnlarge)
        }
        if (data[i].media_type == "other") {   
            const cardImage = document.createElement("img")
            cardImage.setAttribute("class", "card-img")
            const cardLink = document.createElement("a")
            cardLink.setAttribute("class", "card-link")
            cardLink.setAttribute("target", "blank")
            cardLink.setAttribute("href", data[i].apod_site)
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
                /*modalImages.setAttribute("tabindex", "-1") */
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
                /*modalContent.appendChild(modalHeader)*/

                const modalTitle = document.createElement("h5")
                modalTitle.setAttribute("class", "modal-title")
                modalTitle.setAttribute("id", "modalLabel")
                modalTitle.innerHTML = cardTitle.innerHTML
                modalHeader.appendChild(modalTitle)

                const modalCloseButton = document.createElement("btn")
                modalCloseButton.setAttribute("type", "button")
                modalCloseButton.setAttribute("class", "close")
                /*modalCloseButton.setAttribute("data-dismiss", "modal")
                modalCloseButton.setAttribute("aria-label", "Close")*/
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
                    modalImage.setAttribute("src", data[i].url)
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
                    modalIframe.setAttribute("src", data[i].url)
                    modalIframe.setAttribute("class", "airtable-embed")
                    modalBodyIframe.appendChild(modalIframe)
                
                function closeModal () {
                    modalImages.style.display = "none"
                }
            }  
    }
}



function warp() {
    starryBgLoop.playbackRate = 10
    ufo.classList.replace("ufo", "warp")

    function smallUfo() {
    // ufoImage.style.width = "100px"
    ufo.style.display = "none"
    ufo.classList.replace("warp", "smallUfo")
    headerDataPage.style.display = "block"
    searchContainer.style.display = "grid"
    starryBgLoop.playbackRate = 1
    particlesJs.style.display = "none"
    } 
    setTimeout(smallUfo, 6000)
}

