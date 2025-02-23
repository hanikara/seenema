function searchMovie() {
    $('#movie-list').html('');
    
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'fbad0a3f',
            's': $('#search-input').val(),
            // 'apikey': 'dca61bcc',
            // 't': $('#search-input').val(),
        },
        success: function(result){
            // console.log(result)
            // if (result.Response === "True") {
            //     console.log(result);
            //     // Process the data here
            if(result.Response == "True") {
                    let movies = result.Search;
    
                    $.each(movies, function(i, data) {
                        $('#movie-list').append(`
                        <div class="col-md-4">
                         <div class="card mb-4">
                              <img src="${data.Poster}" class="card-img-top" alt="..." >
                            <div class="card-body">
                            <h5 class="card-title">`+ data.Title +`</h5>
                             <h6 class="card-subtitle text-muted mb-2">`+ data.Year +`</h6>
                                <a href="#" class="btn btn-sm btn-primary see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.imdbID}">See Detail</a>
                            </div>
                         </div>
                        </div>
                        `);
                    });
    
                    $('#search-input').val('');
                } else {
                    $('#movie-list').html(`
                    <div class="col">
                    <h1 class="text-center">`+ result.Error +`</h1>
                    </div>
                    `)
                }
        },
        error: function(error) {
            console.error('Error fetching data:', error);
        }
    });
}

$('#search-button').on('click', function() {
    searchMovie();
});

$('#search-input').on('keyup', function(e) {
    if (e.keyCode === 13) {
      searchMovie();
    }
});


$('#movie-list').on('click', '.see-detail', function() {
// console.log($(this).data('id')); // from data-id
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'GET',
        dataType: 'json',
        data: {
            'apikey': 'fbad0a3f',
            'i': $(this).data('id'),
        },
        success: function (movie){
            if(movie.Response === "True"){
                $('.modal-header').html(`
                <h4 class="modal-title fs-5" id="exampleModalLabel">`+ movie.Title +`</h4>
                `);
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ movie.Poster +`" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                            <ul class="list-group">
                            <li class="list-group-item">Released : ${movie.Released}</li>
                            <li class="list-group-item">Genre : ${movie.Genre}</li>
                            <li class="list-group-item">Director : ${movie.Director}</li>
                            <li class="list-group-item">Actors : ${movie.Actors}</li>
                            <li class="list-group-item">IMDB Rating : <i class="bi bi-star-fill"></i> ${movie.imdbRating}</li>
                            </ul>
                            </div>
                        </div>
                        <div class="row p-2">
                            <small>${movie.Plot}</small>
                        </div>
                    </div>
                `);
            }
        }
    })
});
