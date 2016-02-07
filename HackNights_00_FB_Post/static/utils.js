function postMultipart(accessToken, imgData, caption, userID){
    // convert the base64 string to array of bytes

    // convert base64 string in imgData to binary data
    var byteString = atob(imgData.split(',')[1]);

    // array buffer to store the resulting bytes
    var ab = new ArrayBuffer(byteString.length);

    // to access buffer as an array of uint8
    var ia = new Uint8Array(ab);

    // read binary imgData to buffer through the array
    for(var i=0; i<byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // make a blob out of the buffer
    var blob = new Blob([ab], {type: 'image/jpeg'});

    var fdata = new FormData();
    fdata.append("source", blob);

    if(caption !== undefined){
        fdata.append("caption", caption);
    }
    if(userID !== undefined){
        fdata.append("tags", "[{'x':50,'y':50,'tag_uid':"+userID+"}]");
    }

    $.ajax({
        url: 'https://graph.facebook.com/v2.5/me/photos?access_token='+accessToken,
        type: "POST",
        data: fdata,
        processData: false, contentType: false, cache: false,
        success: function(response){
            console.log("Success!");
        },
        error: function(request, ajaxStatus, response){
            console.log("Error: " + response + " Status: " + request.status);
        }
    });
}
