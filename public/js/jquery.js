$(function() {
    console.log('ready!');

    $('body').on('click', '#view-cast', function(e){
        e.preventDefault();
        var actors = {}

        //get id of filme
        var filmId = $(this).parent().find('#film-id').text();
        // console.log(filmId);
        $.ajax({
            url:'/films/'+filmId,
            method: 'GET'
        }).done(function(actorsList){
            actors = actorsList;

            var actorGroup = $('.actor-info-'+filmId);

            actors.forEach(actor =>{
                actorGroup.append(`<li class="list-group-item">Actor: ${actor.name} : Character: ${actor.character}</li>`)
                actorGroup.append(`<button class="btn btn-sm btn-primary">EDIT</button>`)
            })
        })


    })


});