<?php
	// Add Scripts
	function ghu_add_scripts() {
		// Add main CSS
		wp_enqueue_style('ghu-main-style', plugins_url().'/githubusers/css/style.css');
		// Add main JS
		wp_enqueue_script('ghu-main-script', plugins_url().'/githubusers/js/main.css');
		
	}
	
	add_action('wp_enqueue_scripts', 'ghu_add_scripts');