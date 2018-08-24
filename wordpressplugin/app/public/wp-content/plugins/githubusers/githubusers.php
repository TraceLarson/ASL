<?php
	/**
	 * Plugin Name: Github Users
	 * Plugin URI: http://larson.media
	 * Description: Display github repos by username
	 * Version: 1.0.0
	 * Author: Trace Larson
	 * Author URI: http://larson.media
	 * License: GPL2
	 */
	
	// Exit if accessed directly
	if (!defined('ABSPATH')) {
		exit;
	}
	
	// Load scripts
	require_once(plugin_dir_path(__FILE__).'/includes/githubusers-scripts.php');
	
	// Load Class
	require_once(plugin_dir_path(__FILE__).'/includes/githubusers-class.php');
	
	// Register Widget
	function register_githubusers() {
		register_widget('GitHub_Users_Widget');
	}
	
	// Hook in function
	add_action('widgets_init', 'register_githubusers');