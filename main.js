console.log('data', data)

function createCards() {
    var row = document.getElementById("row")

    for (var i = 0; i < data.length; i++) {

        var col = document.createElement("div")
        col.setAttribute("class", "col-sm-12 col-md-6 col-lg-4")

        var card = document.createElement("div")
        card.setAttribute("class", "card embed-responsive")

        var cardBody = document.createElement("div")
        cardBody.setAttribute("class", "card-body position-absolute text-white")

        var cardTitle = document.createElement("div")
        cardTitle.innerHTML = data[i].title
        cardTitle.setAttribute("class", "card-title position-absolute top-50 start-50 translate-middle")

        var cardDate = document.createElement("div")
        cardDate.setAttribute("class", "card-subtitle position-absolute bottom-0 start-98")

        var cardCopyright = document.createElement("div")
        cardCopyright.innerHTML = data[i].date + " by:<br>" + data[i].copyright
        cardCopyright.setAttribute("class", "blockquote position-absolute bottom-0 start-98")


        if (data[i].media_type == "image") {
            var cardMedia = document.createElement("img")
            cardMedia.setAttribute("src", data[i].url)
            cardMedia.setAttribute("class", "card-img")
            console.log(cardMedia)
        } else if (data[i].media_type == "video") {
            var cardMedia = document.createElement("iframe")
            cardMedia.setAttribute("src", data[i].url)
            cardMedia.setAttribute("class", "embed-responsive-item")
            console.log(cardMedia)
        } else {
            var cardMedia = document.createElement("img")
            cardMedia.setAttribute("class", "card-img")
            var cardTitle = document.createElement("a")
            cardTitle.setAttribute("class", "card-link text-white position-absolute top-50 start-50 translate-middle")
            cardTitle.setAttribute("target", "blank")
            cardTitle.setAttribute("href", data[i].apod_site)
            cardTitle.innerHTML = data[i].title
            console.log(cardMedia)
        }

        row.appendChild(col)
        col.appendChild(card)
        card.appendChild(cardBody)
        cardBody.appendChild(cardTitle)
        cardBody.appendChild(cardDate)
        cardBody.appendChild(cardCopyright)    
        card.appendChild(cardMedia)  
    }
}

createCards()

/*function mouseOverCard(event) {
    if (event.target.class = "card-img"
}
cardBody.addEventListener("mouseover", mouseOverCard()) {
    
}





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