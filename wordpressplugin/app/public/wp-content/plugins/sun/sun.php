<?php
	/**
	 * Plugin Name: Sun
	 * Plugin URI: http://rachelhigley.com
	 * Description: Display the Sunset and Sunrise of your location
	 * Version: 1.0.0
	 * Author: Rachel Higley
	 * Author URI: http://rachelhigley.com
	 * License: GPL2
	 */


//	Create the function
//	This runs with the hook and registers our widget class.
	function wpb_load_widget() {
		register_widget('sun_widget');
	}


//	 Link into the Wordpress framework
//	 Using this hook we can run a function when widgets are intialized so that is plugin is included.
	add_action('widgets_init', 'wpb_load_widget');

//	Create our widget class
//	This extends the base widget properties defined by Wordpress
	class sun_widget extends WP_Widget {
		//	Setup the constructor
		//	This calls the WP_Widget constructor with the params of our widget.
		function __construct() {
			parent::__construct(
			// Base ID of your Widget
				'sun_widget',
				// Widget name will appear in UI
				__('Sun Widget', 'sun_widget'),
				// Widget description
				['description' => __('Display the Sunset and Sunrise of your location', 'sun_widget')]
			);
		}
		
		//	Setup the widget function
		//	This is the function that displays the widget in the front end.
		public function widget($args, $instance) {
			// Add the html that goes before and after a widget
			// This is defined by the theme to create separation and set the default html containers.
			echo $args['before_widget'];
			
			// Add the title
			// Display the title of the widget with the html wrapped around it.
			echo $args['before_title'] . 'Sunrise/Sunset' . $args['after_title'];
			
			// Get the sun info
			// Make a GET call to get the information about the sunset/sunrise for the location that the user will provide.
			$response = wp_remote_get('https://api.sunrise-sunset.org/json?lat='.$instance['lat'].'&lng='.$instance['lng']);
			
			// Get the right information
			// Decode and navigate the response to get the information.
			$info = json_decode($response['body'], true)['results'];
			
			// Write the html to display the info
			// Close the php and write the html of the sunrise and sunset.
			?>
			<p><strong>Sunrise:</strong><?=$info['sunrise']?></p>
			<p><strong>Sunset:</strong><?=$info['sunset']?></p>
			<?php
			
			echo $args['after_widget'];

		}
		
		// Function for the form
		// This is used to display the form in the backend when setting up the widget
		public function form($instance) {
			// Setup the Lat and Long
			// If they are already defined use that value otherwise use a blank string.
			$lat = isset($instance['lat']) ? $instance['lat'] : '';
			$lng = isset($instance['lng']) ? $instance['lng'] : '';
			
			// Setup the labels for the two inputs
			// Add the html with the ids and language labels
			// Add the inputs
			// Add the html for the inputs using the wordpress functions to get the id, name and escape the value.
			?>
			<p>
				<label for="<?php echo $this->get_field_id( 'lat' ); ?>"><?php _e( 'Latitude:' ); ?></label>
				<input class="widefat" id="<?php echo $this->get_field_id( 'lat' ); ?>" name="<?php echo $this->get_field_name( 'lat' ); ?>" type="text" value="<?php echo esc_attr( $lat ); ?>" />
			</p>
			<p>
				<label for="<?php echo $this->get_field_id( 'lng' ); ?>"><?php _e( 'Longitude:' ); ?></label>
				<input class="widefat" id="<?php echo $this->get_field_id( 'lng' ); ?>" name="<?php echo $this->get_field_name( 'lng' ); ?>" type="text" value="<?php echo esc_attr( $lng ); ?>" />
			</p>
			<?php
			
		}
	}
