$(function() {
    let imagenUrl = '';
    // Configure Cloudinary
    // with credentials available on
    // your Cloudinary account dashboard
    $.cloudinary.config({ cloud_name: 'mariela-cenfo', api_key: '194325784922139'});

    // Upload button
    let uploadButton = $('#boton_foto');

    // Upload button event
    uploadButton.on('click', function(e){
        // Initiate upload
        cloudinary.openUploadWidget({ cloud_name: 'mariela-cenfo', upload_preset: 'mariela_cenfo', tags: ['cgal']},
        function(error, result) {
            if(error) console.log(error);
            // If NO error, log image data to console
            let id = result[0].public_id;
             console.log(id);
            imagenUrl = 'https://res.cloudinary.com/mariela-cenfo/image/upload/' + id ;
            document.querySelector('#foto').src = imagenUrl;
          console.log(imagenUrl);
        });
    });
});



function processImage(id) {
    let options = {
        client_hints: true,
    };
    return  $.cloudinary.url(id, options);
}


