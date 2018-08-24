<?php
	/**
	* Adds Github Users widget.
 */
class GitHub_Users_Widget extends WP_Widget {
	
	/**
	 * Register widget with WordPress.
	 */
	function __construct() {
		parent::__construct(
			'githubusers_widget', // Base ID
			esc_html__( 'GitHub Users', 'ghu_domain' ), // Name
			array( 'description' => esc_html__( 'Widget to display GitHub user\'s repos', 'ghu_domain' ), ) // Args
		);
	}
	
	/**
	 * Front-end display of widget.
	 *
	 * @see WP_Widget::widget()
	 *
	 * @param array $args     Widget arguments.
	 * @param array $instance Saved values from database.
	 */
	public function widget( $args, $instance ) {
		echo $args['before_widget']; // What ever you want to display before widget(<div> etc..)
		if ( ! empty( $instance['title'] ) ) {
			echo $args['before_title'] . apply_filters( 'widget_title', $instance['title'] ) . $args['after_title'];
		}
		
		$response = wp_remote_get('https://api.github.com/users/rhigleyfs/repos');
		$repos = json_decode($response['body'], true);
		
		// Widget content output
		echo 'Hello from GitHub Users widget!';
		echo '<br>';
		foreach ($repos as $repo){
			echo '<br>';
			echo $repo["full_name"];
			echo $repo["html_url"];
			echo '<br>';
		}
		
		
		
		
		echo $args['after_widget']; //  What ever you want to display after the widget (</div> etc..)
	}
	
	/**
	 * Back-end widget form.
	 *
	 * @see WP_Widget::form()
	 *
	 * @param array $instance Previously saved values from database.
	 */
	public function form( $instance ) {
		$title = ! empty( $instance['title'] ) ? $instance['title'] : esc_html__( 'GitHub Users', 'ghu_domain' );
		?>
		<!--TITLE-->
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>">
				<?php esc_attr_e( 'Title:', 'ghu_domain' ); ?>
			</label>
			<input class="widefat"
			       id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"
			       name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>"
			       type="text"
			       value="<?php echo esc_attr( $title ); ?>"
			>
		</p>
		<?php
	}
	
	/**
	 * Sanitize widget form values as they are saved.
	 *
	 * @see WP_Widget::update()
	 *
	 * @param array $new_instance Values just sent to be saved.
	 * @param array $old_instance Previously saved values from database.
	 *
	 * @return array Updated safe values to be saved.
	 */
	public function update( $new_instance, $old_instance ) {
		$instance = array();
		$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? sanitize_text_field( $new_instance['title'] ) : '';
		
		return $instance;
	}
	
} // class Foo_Widget