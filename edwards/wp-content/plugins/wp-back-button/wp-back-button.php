<?php
/*
Plugin Name: WP Back Button
Plugin URI: https://wordpress.org/plugins/wp-back-button/ 
Description: The WP Back Button is a floating button to the right or left inside the pages and posts that will return the user to the previous point.
Version: 1.1.3
License: GPL2
Author: Xabier Miranda
Author URI: http://xabiermiranda.com
Text Domain: WP Back Button
*/

defined('XM_WPBB_PATH') or define('XM_WPBB_PATH', plugin_dir_path( __FILE__ ));
defined('XM_WPBB_URL') or define('XM_WPBB_URL', plugin_dir_url( __FILE__ ));

class XM_WPBB {

    public $name = 'WP Back Button';
    public $shortname = 'WPBB';
    public $slug = 'xm-wpbb';
    public $version = "1.1.3";
    public $plugin_path;
    public $plugin_url;
    public $options;

    /*Construct*/
    public function __construct(){
        $this->loadInc();
        $this->set_constants();
        add_action( 'admin_enqueue_scripts',    array($this , 'add_color_picker' ));
        add_action( 'wp_enqueue_scripts',       array($this , 'loadCSS' ));
        add_action( 'wp_head',                  array($this , 'customCSS'));
        add_action( 'wp_footer',                array($this , 'wp_back_button' ));
    }
    
    /*Load Includes*/
    public function loadInc(){
        include_once( $this->plugin_path . 'options-page.php' );
        include_once( $this->plugin_path . 'wp-back-button-widget.php' );
    }
    
    /*Set Constants*/
    public function set_constants() {
        $this->plugin_path = XM_WPBB_PATH;
        $this->plugin_url = XM_WPBB_URL;
        $this->options = get_option( 'wp_back_button_settings' );
    }

    /*Main Function*/
    public function wp_back_button(){
        $options = $this->options;
        
        (empty($options['disableBoton'])) ? $disableBoton = 0 : $disableBoton = 1;
        (empty($options['showAllPagesBoton'])) ? $showAllPagesBoton = 0 : $showAllPagesBoton = 1;
        
        if($disableBoton == 0){
            if((is_home() == false && is_front_page() == false) || $showAllPagesBoton == 1){

                if((is_home() == false || is_single() || is_page() || is_post_type_archive()) || $showAllPagesBoton == 1 ) {

                $backbuttonurl = $this->getURL();
                (empty($options['textoBoton'])) ? $textoBoton = __( 'Back') : $textoBoton = $options['textoBoton'];
                (empty($options['posicionBoton'])) ? $posicionBoton = "Right" : $posicionBoton = $options['posicionBoton'];

                 ?>
                    <div class="backButton <?php echo $posicionBoton; ?> <?php if($options['displayBoton']){echo 'forceShow';} ?> <?php if(!$options['transitionBoton']){echo 'transition';} ?>" style="display:block">
                         <a href="<?php echo $backbuttonurl; ?>" title="<?php echo $textoBoton; ?>"><div class="simbolo"></div><div class="texto"><?php echo $textoBoton; ?></div></a>
                    </div>

                <?php 
                }

            }
        }
        
     }
    
    /*Get Last URL*/
    public function getURL(){
        $backbuttonurl = htmlspecialchars($_SERVER['HTTP_REFERER']);
        if(empty($backbuttonurl))$backbuttonurl = get_home_url();
        return $backbuttonurl;
    }
    
    /*Load Custom CSS*/               
    public function customCSS(){
        $options = $this->options;
        
        $customCSS = ".backButton{";
        if(!empty($options['colorBoton']))$customCSS .= "background:".$options['colorBoton']." !important;";
        if(!empty($options['alturaBoton']))$customCSS .= "bottom:".$options['alturaBoton']."% !important;";
        if(!empty($options['colorBorder']))$customCSS .= "border-color:".$options['colorBorder']." !important;";
        $customCSS .= "}";
        
        if(!empty($options['fontSizeBoton'])){
        $customCSS .= ".backButton .simbolo , .backButton .texto{";
        $customCSS .= "font-size:".$options['fontSizeBoton']."px !important;";
        $customCSS .= "}"; 
        }    
        
        if(!empty($options['colorLetra'])){
            $customCSS .= ".backButton a{";
            $customCSS .= "color:".$options['colorLetra']." !important;";
            $customCSS .= "}";   

            $customCSS .= ".backButton .simbolo:after , .backButton .simbolo:before{";
            $customCSS .= "color:".$options['colorLetra']." !important;";
            $customCSS .= "}"; 
        }
        echo '<style type="text/css">' . $customCSS . '</style>';
    }               
    
    /*Load CSS*/
    public function loadCSS() {
         wp_enqueue_script('jquery');
         wp_register_style( 'backButtonCSS', plugins_url('css/style.css', __FILE__) );
         wp_enqueue_style( 'backButtonCSS' );
         wp_register_script( 'backButtonJS', plugins_url( 'js/wp-backbutton.js', __FILE__ ) );
         wp_enqueue_script( 'backButtonJS' );

         wp_register_style( 'googleFonts1', 'http://fonts.googleapis.com/css?family=Cabin:400,500,600,bold');
         wp_enqueue_style( 'googleFonts1' );
         wp_register_style( 'googleFonts2', 'http://fonts.googleapis.com/css?family=PT+Sans+Narrow:regular,bold');
         wp_enqueue_style( 'googleFonts2' );
    }
    
    /*Add Color Picker*/
    public function add_color_picker() {
        if( is_admin() ) { 
            wp_enqueue_style( 'wp-color-picker' ); 
            wp_enqueue_script( 'colo-picker', plugins_url( 'js/color-picker.js', __FILE__ ), array( 'wp-color-picker' ), false, true ); 
        }
    }
    
    
}//End XM_WPBB

$xm_wpbb = new XM_WPBB();