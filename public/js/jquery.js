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
            var actors = actorsList;
            var actorGroup = $('.actor-info-'+filmId);

            actors.forEach(actor =>{
                actorGroup.append(
                    `<li class="list-group-item actor-group-${actor.id}"><span id="actor-id" class="d-none">${actor._id}</span> Actor: <span id="actor-name">${actor.name}</span> <br> Character: <span id="actor-character">${actor.character}</span> <br> Role: <span id="actor-role">${actor.role}</span> <br><button class="btn btn-sm btn-info" id="edit-btn" >EDIT</button></li>`
                );
            })
        })
    })

    $('body').on('click', '#edit-btn', function(e){
        e.preventDefault();

        var actorId = $(this).parent().find('#actor-id').text();
        console.log(actorId);

        var actorGroup = $(this).parent();
        var actorName = actorGroup.find('#actor-name').text();
        var actorCharacter = actorGroup.find('#actor-character').text();
        var actorRole = actorGroup.find('#actor-role').text();
        actorGroup.empty();
        actorGroup.append(
            `<label>Update Person:</label></label><form><input name="name" placeholder="${actorName}"><br><input name="character" placeholder="${actorCharacter}"><br><select name="role" value="${actorRole}"> <option value="Cast">Cast</option>  <option value="Director">Director</option>  <option value="Writer">Writer</option>  <option value="Producer">Producer</option>  <option value="Other">Other</option> </select><br><button class="btn btn-sm btn-alert">SAVE</button></form>`
        );
        actorGroup.append(
            '<button id="delete-btn" class="btn btn-danger btn-sm mt-5">DELETE</button>'
        );

        // $.ajax({
        //     url:'/people/'+actorId,
        //     method: 'PUT'
        // }).done()
    })


});