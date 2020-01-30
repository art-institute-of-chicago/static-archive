<?php

// Block direct requests
if ( !defined('ABSPATH') )
	die('-1');
	
	
add_action( 'widgets_init', function(){
     register_widget( 'XM_WPBB_WIDGET' );
});	

class XM_WPBB_WIDGET extends WP_Widget {
    
    public $options;

	public function __construct(){
        $this->set_constants();
		parent::__construct(
			'XM_WPBB_W',
			__('WP Back Button'),
			array( 'description' => __( 'WP Back Button') )
		);
	}

    public function set_constants(){
        $this->options = get_option( 'wp_back_button_settings' );
    }
    
	public function widget( $args, $instance ) {
	
        $options = $this->options;
        ($options['textoBoton'] == "") ? $textoBoton = __( 'Back') : $textoBoton = $options['textoBoton'];
        $backbuttonurl = htmlspecialchars($_SERVER['HTTP_REFERER']);
        if($backbuttonurl == ""){$backbuttonurl = get_home_url();}
        
     	echo $args['before_widget'];
        if ( ! empty( $instance['title'] ) ) {
			echo $args['before_title'] . apply_filters( 'widget_title', $instance['title'] ). $args['after_title'];
		}
        ?>
            <div class="backbutton-widget <?php echo $instance['position']; ?>">
                 <a href="<?php echo $backbuttonurl; ?>" title="<?php echo $textoBoton; ?>">
                     <span class="simbolo"></span>
                     <span class="texto" style="color:<?php echo $options['colorLetra']; ?>"><?php echo $textoBoton; ?></span>
                </a>
            </div>
        <?php
		echo $args['after_widget'];
	}

	public function form( $instance ) {
        
        if ( isset( $instance[ 'title' ] ) ) {
			$title = $instance[ 'title' ];
		}
		?>
		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label> 
			<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>">
		</p>
        <p>
			<label for="<?php echo $this->get_field_id( 'position' ); ?>"><?php _e( 'Position:' ); ?></label> 
			<select class="widefat" id="<?php echo $this->get_field_id( 'position' ); ?>" name="<?php echo $this->get_field_name( 'position' ); ?>">
                <option value='Center' <?php selected( $instance['position'], "Center" ); ?> >Center</option> 
                <option value='Left' <?php selected( $instance['position'], "Left" ); ?> >Left</option>
                <option value='Right' <?php selected( $instance['position'], "Right" ); ?> >Right</option> 
            </select>
		</p>
		<?php 
	}

	public function update( $new_instance, $old_instance ) {
		$instance = array();
		$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';
		$instance['position'] = ( ! empty( $new_instance['position'] ) ) ? strip_tags( $new_instance['position'] ) : '';
		return $instance;
	}
} 