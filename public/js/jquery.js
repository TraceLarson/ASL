$(function() {
    console.log('ready!');

    var actors = {};

    // Display cast
    $('body').on('click', '#view-cast', function(e){
        e.preventDefault();
        $(this).attr('disabled', 'disabled');

        //get id of film
        var filmId = $(this).parent().find('#film-id').text();

        $.ajax({
            url:'/films/'+filmId,
            method: 'GET'
        }).done(function(actorsList){
            actors = actorsList;
            var actorGroup = $('.actor-info-'+filmId);

            actors.forEach(actor =>{
                actorGroup.append(
                    `<li class="list-group-item actor-group-${actor.id}"><span id="actor-id" class="d-none">${actor._id}</span> Actor: <span id="actor-name">${actor.name}</span> <br> Character: <span id="actor-character">${actor.character}</span> <br> Role: <span id="actor-role">${actor.role}</span> <br><button class="btn btn-sm btn-info" id="edit-btn" >EDIT</button></li>`
                );
            })
        })
    })

    // Display edit form
    $('body').on('click', '#edit-btn', function(e){
        e.preventDefault();

        var actorId = $(this).parent().find('#actor-id').text();

        // set vars for the container and the contents of each list item
        var actorGroup = $(this).parent();
        var actorName = actorGroup.find('#actor-name').text();
        var actorCharacter = actorGroup.find('#actor-character').text();
        var actorRole = actorGroup.find('#actor-role').text();

        // Create form for editing person
        var form = `<label>Update Person:</label><form><span id="actor-id" class="d-none">${actorId}</span><input name="name" value="${actorName}"><br><input name="character" value="${actorCharacter}"><br><select name="role" value="${actorRole}"> <option value="Cast">Cast</option>  <option value="Director">Director</option>  <option value="Writer">Writer</option>  <option value="Producer">Producer</option>  <option value="Other">Other</option> </select><br><button type="submit" class="btn btn-sm btn-alert">SAVE</button></form>`

        // Empty the container and display the form + the delete button
        actorGroup.empty();
        actorGroup.append(form);
        actorGroup.append(
            '<button id="delete-btn" class="btn btn-danger btn-sm mt-5">DELETE</button>'
        );

        form = actorGroup;

        // Edit form is submitted
        form.on('submit', function(e){
            e.preventDefault();

            // set the form variable to the current form
            form = form.find('form');

            $.ajax({
                url:'/people/'+actorId,
                method: 'PUT',
                data: form.serialize()
            }).done(function(actor){
                actorGroup.empty();
                actorGroup.prepend(`<span class="text-success">UPDATED</span><br>`).append(
                    `<span id="actor-id" class="d-none">${actor._id}</span> Actor: <span id="actor-name">${actor.name}</span> <br> Character: <span id="actor-character">${actor.character}</span> <br> Role: <span id="actor-role">${actor.role}</span> <br><button class="btn btn-sm btn-info" id="edit-btn" >EDIT</button>`
                );
            })
        })

    })

    // When Delete button is pressed
    $('body').on('click', '#delete-btn', function(e){
        e.preventDefault();

        var actorGroup = $(this).parent();

        // Get actor id from hidden span on form
        var actorId = $(this).parent().find('#actor-id').text();

        $.ajax({
            url: '/people/'+actorId,
            method: 'DELETE'
        }).done(function(response){
            actorGroup.empty();
            actorGroup.append(
                `<span class="text-danger">${response}</span>`
            );
        })


    })


});