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
			
			echo $args['after_widget'];

		}
	}
