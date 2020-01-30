<?php
add_action( 'admin_menu', 'wp_back_button_add_admin_menu' );
add_action( 'admin_init', 'wp_back_button_settings_init' );


function wp_back_button_add_admin_menu(  ) { 

	add_options_page( 'WP Back Button', 'WP Back Button', 'manage_options', 'wp_back_button', 'wp_back_button_options_page' );

}


function wp_back_button_settings_init(  ) { 

	register_setting( 'pluginPage', 'wp_back_button_settings' );

    
	add_settings_section(
		'wp_back_button_pluginPage_section', 
		__( 'Settings', 'wp_back_button' ), 
		'wp_back_button_settings_section_callback', 
		'pluginPage'
	);

    add_settings_field( 
		'disableBoton', 
		__( 'Disable floating Back Button', 'wp_back_button' ), 
		'disableBoton_render', 
		'pluginPage', 
		'wp_back_button_pluginPage_section' 
	);
    
	add_settings_field( 
		'textoBoton', 
		__( 'Text Button', 'wp_back_button' ), 
		'textoBoton_render', 
		'pluginPage', 
		'wp_back_button_pluginPage_section' 
	);
    
    add_settings_field( 
		'fontSizeBoton', 
		__( 'Font Size', 'wp_back_button' ), 
		'fontSizeBoton_render', 
		'pluginPage', 
		'wp_back_button_pluginPage_section' 
	);
    
    add_settings_field( 
		'colorLetra', 
		__( 'Text Color', 'wp_back_button' ), 
		'colorLetra_render', 
		'pluginPage', 
		'wp_back_button_pluginPage_section' 
	);
    
    add_settings_field( 
		'colorBoton', 
		__( 'Background Color', 'wp_back_button' ), 
		'colorBoton_render', 
		'pluginPage', 
		'wp_back_button_pluginPage_section' 
	);
    
    add_settings_field( 
		'colorBorder', 
		__( 'Border Color', 'wp_back_button' ), 
		'colorBorder_render', 
		'pluginPage', 
		'wp_back_button_pluginPage_section' 
	);

	add_settings_field( 
		'posicionBoton', 
		__( 'Position', 'wp_back_button' ), 
		'posicionBoton_render', 
		'pluginPage', 
		'wp_back_button_pluginPage_section' 
	);
    
    add_settings_field( 
		'alturaBoton', 
		__( 'Height', 'wp_back_button' ), 
		'alturaBoton_render', 
		'pluginPage', 
		'wp_back_button_pluginPage_section' 
	);

    add_settings_field( 
		'displayBoton', 
		__( 'Always show with scroll', 'wp_back_button' ), 
		'displayBoton_render', 
		'pluginPage', 
		'wp_back_button_pluginPage_section' 
	);
    
    add_settings_field( 
		'transitionBoton', 
		__( 'Without transition', 'wp_back_button' ), 
		'transitionBoton_render', 
		'pluginPage', 
		'wp_back_button_pluginPage_section' 
	);
    
    add_settings_field( 
		'showAllPagesBoton', 
		__( 'Show On All Pages', 'wp_back_button' ), 
		'showAllPagesBoton_render', 
		'pluginPage', 
		'wp_back_button_pluginPage_section' 
	);

}

function disableBoton_render(  ) { 

	$options = get_option( 'wp_back_button_settings' );
    
    (empty($options['disableBoton'])) ? $disableBoton = 0 : $disableBoton = 1;
    
	?>
	<input type='checkbox' name='wp_back_button_settings[disableBoton]' <?php checked( $disableBoton, 1 ); ?> value='1'>
	<?php

}

function textoBoton_render(  ) { 

	$options = get_option( 'wp_back_button_settings' );
	?>
	<input type='text' placeholder="<?php echo __( 'Back'); ?>" name='wp_back_button_settings[textoBoton]' value='<?php echo $options['textoBoton']; ?>'>
	<?php

}

function colorLetra_render(  ) { 

	$options = get_option( 'wp_back_button_settings' );
	?>
	<input class="color-picker" type='text' name='wp_back_button_settings[colorLetra]' value='<?php echo $options['colorLetra']; ?>'>
	<?php

}

function colorBoton_render(  ) { 

	$options = get_option( 'wp_back_button_settings' );
	?>
	<input class="color-picker" type='text' name='wp_back_button_settings[colorBoton]' value='<?php echo $options['colorBoton']; ?>'>
	<?php

}

function colorBorder_render(  ) { 

	$options = get_option( 'wp_back_button_settings' );
	?>
	<input class="color-picker" type='text' name='wp_back_button_settings[colorBorder]' value='<?php echo $options['colorBorder']; ?>'>
	<?php

}

function posicionBoton_render(  ) { 

	$options = get_option( 'wp_back_button_settings' );
	?>
	<select name='wp_back_button_settings[posicionBoton]'>
        <option value='Right' <?php selected( $options['posicionBoton'], "Right" ); ?>>Right</option>
		<option value='Left' <?php selected( $options['posicionBoton'], "Left" ); ?>>Left</option>
	</select>

<?php

}

function alturaBoton_render(  ) { 

	$options = get_option( 'wp_back_button_settings' );
	?>
	<input type='number' placeholder="50" min="0" max="90" name='wp_back_button_settings[alturaBoton]' value='<?php echo $options['alturaBoton']; ?>'>
    <span>%</span>
	<?php

}

function displayBoton_render(  ) { 

	$options = get_option( 'wp_back_button_settings' );
	?>
	<input type='checkbox' name='wp_back_button_settings[displayBoton]' <?php checked( $options['displayBoton'], 1 ); ?> value='1'>
	<?php

}

function transitionBoton_render(  ) { 

	$options = get_option( 'wp_back_button_settings' );
	?>
	<input type='checkbox' name='wp_back_button_settings[transitionBoton]' <?php checked( $options['transitionBoton'], 1 ); ?> value='1'>
	<?php

}

function showAllPagesBoton_render(  ) { 

	$options = get_option( 'wp_back_button_settings' );
	?>
	<input type='checkbox' name='wp_back_button_settings[showAllPagesBoton]' <?php checked( $options['showAllPagesBoton'], 1 ); ?> value='1'>
	<?php

}

function fontSizeBoton_render(  ) { 

	$options = get_option( 'wp_back_button_settings' );
	?>
	<input type='number' placeholder="" min="0" max="90" name='wp_back_button_settings[fontSizeBoton]' value='<?php echo $options['fontSizeBoton']; ?>'>
    <span>px</span>
	<?php

}




function wp_back_button_settings_section_callback(  ) { 
	echo __( '', 'wp_back_button' );
}


function wp_back_button_options_page(  ) { 

	?>
	<form action='options.php' method='post'>
		
		<h2>WP Back Button</h2>
		
		<?php
		settings_fields( 'pluginPage' );
		do_settings_sections( 'pluginPage' );
		submit_button();
		?>
		
	</form>
	<?php

}

?>