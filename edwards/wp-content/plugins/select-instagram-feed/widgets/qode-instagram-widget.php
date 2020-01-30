<?php
if(!defined('ABSPATH')) exit;

class Qode_Instagram_Widget extends WP_Widget {
    private $params;
    public function __construct() {
        parent::__construct(
            'qode_instagram_widget',
            'Select Instagram Widget',
            array( 'description' => esc_html__( 'Display instagram images', 'select-instagram-feed' ) )
        );

        $this->setParams();
    }

    private function setParams() {
        $this->params = array(
            array(
                'name' => 'title',
                'type' => 'textfield',
                'title' => 'Title'
            ),
            array(
                'name' => 'tag',
                'type' => 'textfield',
                'title' => 'Tag'
            ),
            array(
                'name' => 'number_of_photos',
                'type' => 'textfield',
                'title' => 'Number of photos'
            ),
            array(
                'name' => 'number_of_cols',
                'type' => 'dropdown',
                'title' => 'Number of columns',
                'options' => array(
                    '2' => 'Two',
                    '3' => 'Three',
                    '4' => 'Four',
                    '5' => 'Five',
                    '6' => 'Six',
                    '7' => 'Seven',
                    '8' => 'Eight'                )
            ),
            array(
                'name' => 'image_size',
                'type' => 'dropdown',
                'title' => 'Image Size',
                'options' => array(
                    'thumbnail' => 'Small',
                    'low_resolution' => 'Medium',
                    'standard_resolution' => 'Large'
                )
            ),
            array(
                'name' => 'transient_time',
                'type' => 'textfield',
                'title' => 'Images Cache Time'
            ),
        );
    }

    public function widget($args, $instance) {
        extract($instance);

        print $args['before_widget'];
        print $args['before_title'].$title.$args['after_title'];

        $instagram_api = QodeStockholmInstagramApi::getInstance();
        $images_array = $instagram_api->getImages($number_of_photos, $tag, array(
            'use_transients' => true,
            'transient_name' => $args['widget_id'],
            'transient_time' => $transient_time
        ));

        $number_of_cols = $number_of_cols == '' ? 3 : $number_of_cols;

        if(is_array($images_array) && count($images_array)) { ?>
            <ul class="qode_instagram_feed clearfix col_<?php echo esc_attr($number_of_cols); ?>">
            <?php
            foreach ($images_array as $image) { ?>
                <li>
                    <a href="<?php echo esc_url($instagram_api->getHelper()->getImageLink($image)); ?>" target="_blank">
                        <?php print $instagram_api->getHelper()->getImageHTML($image, $image_size); ?>
                    </a>
                </li>
            <?php } ?>
            </ul>
        <?php }

        print $args['after_widget'];
    }

    public function form($instance) {
        foreach ($this->params as $param_array) {
            $param_name = $param_array['name'];
            ${$param_name} = isset( $instance[$param_name] ) ? esc_attr( $instance[$param_name] ) : '';
        }

        //if code wasn't saved to database
        if(!get_option('qode_instagram_code')) {
            echo '<p>' . __("Please go to Select Options and reconnect with Instagram", "select-instagram-feed") . '</p>';
        }

        //user has connected with instagram. Show form
        if(get_option('qode_instagram_code')) {
            foreach ($this->params as $param) {
                switch($param['type']) {
                    case 'textfield':
                        ?>
                        <p>
                            <label for="<?php echo esc_attr($this->get_field_id( $param['name'] )); ?>"><?php echo
                                esc_html($param['title']); ?></label>
                            <input class="widefat" id="<?php echo esc_attr($this->get_field_id( $param['name'] )); ?>" name="<?php echo esc_attr($this->get_field_name( $param['name'] )); ?>" type="text" value="<?php echo esc_attr( ${$param['name']} ); ?>" />
                        </p>
                        <?php
                        break;
                    case 'dropdown':
                        ?>
                        <p>
                            <label for="<?php echo esc_attr($this->get_field_id( $param['name'] )); ?>"><?php echo
                                esc_html($param['title']); ?></label>
                            <?php if(isset($param['options']) && is_array($param['options']) && count($param['options'])) { ?>
                                <select class="widefat" name="<?php echo esc_attr($this->get_field_name( $param['name'] )); ?>" id="<?php echo esc_attr($this->get_field_id( $param['name'] )); ?>">
                                    <?php foreach ($param['options'] as $param_option_key => $param_option_val) {
                                        $option_selected = '';
                                        if(${$param['name']} == $param_option_key) {
                                            $option_selected = 'selected';
                                        }
                                        ?>
                                        <option <?php echo esc_attr($option_selected); ?> value="<?php echo esc_attr($param_option_key); ?>"><?php echo esc_attr($param_option_val); ?></option>
                                    <?php } ?>
                                </select>
                            <?php } ?>
                        </p>

                        <?php
                        break;
                }
            }
        }


    }

    public function update($new_instance, $old_instance) {
        $instance = array();
        foreach ($this->params as $param) {
            $param_name = $param['name'];

            $instance[$param_name] = sanitize_text_field($new_instance[$param_name]);
        }

        return $instance;
    }
}

function qode_instagram_widget_load(){
    register_widget('Qode_Instagram_Widget');
}

add_action('widgets_init', 'qode_instagram_widget_load');