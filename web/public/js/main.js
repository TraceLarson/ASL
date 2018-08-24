$(function(){
	console.log('ready!');

	// Delete function
	$('body').on('click', '#delete-btn', function (e) {
		e.preventDefault();

		//get parent container
		var post = $(this).closest('ul');

		// get post id
		var postId = post.find('#post-id').text();

		$.ajax({
			url: '/post/'+postId,
			method: 'DELETE'
		}).done(function(response){
			post.empty();
			post.append(
				`<span class="text-danger">${response}</span>`
			);
		})

	})

})