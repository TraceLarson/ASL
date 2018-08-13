$(function() {
    console.log('ready!');

    $('body').on('click', '#view-cast', function(e){
        e.preventDefault();

        //get id of filme
        var filmId = $(this).parent().find('#film-id').text();
        // console.log(filmId);
        $.ajax({
            url:'/films/'+filmId,
            method: 'GET'
        }).done(function(actorsList){
            console.log(actorsList);
            

        })


    })


});