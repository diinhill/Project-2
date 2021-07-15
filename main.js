console.log('data', data)

const createCards = () => {
    const row = document.getElementById("row")
    const rowContainer = document.getElementById("row-container")
    

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

        const cardDate = document.createElement("div")
            cardDate.setAttribute("class", "card-subtitle position-absolute bottom-0 start-98")
            cardBody.appendChild(cardDate)

        const cardCopyright = document.createElement("div")
            cardCopyright.innerHTML = data[i].date + " by:<br>" + data[i].copyright
            cardCopyright.setAttribute("class", "blockquote position-absolute bottom-0 start-98")
            cardBody.appendChild(cardCopyright)   

        const modalImages = document.createElement("div")
        modalImages.setAttribute("class", "modal") 
        modalImages.removeAttribute("class", "card embed-responsive position-relative")
       

        if (data[i].media_type == "image") {
            const cardImage = document.createElement("img")
            cardImage.setAttribute("src", data[i].url)
            cardImage.setAttribute("class", "card-img embed-responsive-item position-absolute")
            console.log(cardImage)
            card.appendChild(cardImage)

      
            card.addEventListener("click", imageEnlarge)
            function imageEnlarge() {
                const cloneImage = document.createElement("img")
                cloneImage.setAttribute("src", data[i].url)
                cloneImage.setAttribute("style", "overflow-x: scroll")
                cloneImage.setAttribute("class", "modal-content")
                cloneImage.style.visibility = "visible"
                row.append(cloneImage)
            }
        }
        if (data[i].media_type == "video") {   
            const cardIframe = document.createElement("iframe")
            cardIframe.setAttribute("src", data[i].url)
            cardIframe.setAttribute("class", "embed-responsive-item position-absolute")
            console.log(cardIframe)
            card.appendChild(cardIframe)
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