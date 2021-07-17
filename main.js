console.log('data', data)

const createCards = () => {
    const row = document.getElementById("row")
    const popUpImages = document.getElementById("popUpImages")
    

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
            /*cardButton.setAttribute("data-toggle", "modal")
            cardButton.setAttribute("data-target", ".modal fade")*/
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
            console.log(cardImage)
            card.appendChild(cardImage)
            card.addEventListener("click", imageEnlarge)
        }
        else if (data[i].media_type == "video") {   
            const cardIframe = document.createElement("iframe")
            cardIframe.setAttribute("src", data[i].url)
            cardIframe.setAttribute("class", "embed-responsive-item position-absolute")
            console.log(cardIframe)
            card.appendChild(cardIframe)
            card.addEventListener("click", videoEnlarge)
        }
        if (data[i].media_type == "other") {   
            const cardImage = document.createElement("img")
            cardImage.setAttribute("class", "card-img")
            const cardLink = document.createElement("a")
            cardLink.setAttribute("class", "card-link text-white position-absolute")
            cardLink.setAttribute("target", "blank")
            cardLink.setAttribute("href", data[i].apod_site)
            cardLink.append(cardTitle)
            console.log(cardLink)
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
                modalHeader.setAttribute("class", "modal-header position-absolute")
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
                    /*modalImage.setAttribute("style", "overflow-x: scroll")*/
                    modalImage.setAttribute("class", "modal-image")
                    modalBody.appendChild(modalImage)

                function closeModal () {
                    modalImages.style.display = "none"
                }
        
            }

            function videoEnlarge() {
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

                    const modalIframe = document.createElement("iframe")
                    modalIframe.setAttribute("src", data[i].url)
                    modalIframe.setAttribute("allowfullscreen", "true")
                    modalIframe.setAttribute("scrolling", "false")
                    modalIframe.setAttribute("frameborder", "0")
                    modalIframe.setAttribute("framespacing", "0")
                    modalIframe.setAttribute("class", "airtable-embed embed-responsive-16by9")
                    /*modalIframe.removeAttribute("class", "ytp-cued-thumbnail-overlay")*/
                    modalBody.appendChild(modalIframe)
                
                function closeModal () {
                    modalImages.style.display = "none"
                }
        
            }
         
        
    }

}

createCards()


/*
function squareCropImage (url) {
    const outputImageAspectRatio = 1
    const inputImage = new Image()
    inputImage.src = url
    inputImage.onload = () => {
        const inputWidth = inputImage.naturalWidth
        const inputHeight = inputImage.naturalHeight
        const inputImageAspectRatio = inputWidth / inputHeight
        let outputWidth = inputWidth
        let outputHeight = inputHeight
        if (inputImageAspectRatio > outputImageAspectRatio) {
            outputWidth = inputHeight * outputImageAspectRatio
        } else if (inputImageAspectRatio < outputImageAspectRatio) {
            outputHeight = inputWidth / outputImageAspectRatio
        }
        const outputImage = document.createElement("canvas")
        outputImage.width = outputWidth
        outputImage.height = outputHeight
        const ctx = outputImage.getContext("2d")
        ctx.drawImage(inputImage, 0, 0)
        document.body.appendChild(inputImage)
        document.body.appendChild(outputImage)
    }
    
}    squareCropImage (td3[i])
*/