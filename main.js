console.log('data', data)

function createCards() {
    var row = document.getElementById("row")


    for (var i = 0; i < data.length; i++) {

        var col = document.createElement("div")
        col.setAttribute("class", "col-sm-12 col-md-6 col-lg-4")

        var card = document.createElement("div")
        card.setAttribute("class", "card")

        var cardBody = document.createElement("div")


        if (data[i].media_type == "image") {
            var cardMedia = document.createElement("img")
            cardMedia.setAttribute("src", data[i].url)
            // td3.setAttribute("class", "img-fluid img-thumbnail")
            console.log(cardMedia)
        } else if (data[i].media_type == "video") {
            var cardMedia = document.createElement("iframe")
            cardMedia.setAttribute("src", data[i].url)
            cardMedia.setAttribute("class", "embed-responsive-item")
            console.log(cardMedia)
        } else {
            var cardMedia = document.createElement("a")
            cardMedia.setAttribute("target", "blank")
            cardMedia.setAttribute("href", data[i].apod_site)
            cardMedia.innerHTML = data[i].apod_site
            console.log(cardMedia)
        }

        
        /*
        td1.innerHTML = data[i].title
        td2.innerHTML = data[i].date
        */
       
        
        

        col.appendChild(card)
        card.appendChild(cardMedia)
        card.appendChild(cardBody)
      
        row.appendChild(col)
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