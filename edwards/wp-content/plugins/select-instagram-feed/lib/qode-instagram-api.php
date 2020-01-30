<?php
if(!defined('ABSPATH')) exit;

include_once 'qode-instagram-helper.php';

/**
 * Class QodeStockholmInstagramApi
 */
class QodeStockholmInstagramApi {
    /**
     * @var string ID of Instagram application
     */
    private $clientID;
    /**
     * @var string secret code of Instagram application
     */
    private $clientSecret;
    /**
     * @var string URL to which to redirect user after he has allowed access.
     * It's the same as in Instagram application
     */
    private $redirectUri;
    /**
     * @var string type of connection that want to make
     * Can be 'code' or 'token'. We are using 'code' because it's more secure
     */
    private $responseType;
    /**
     * @var mixed|void code that was returned by Instagram.
     * Based on this code we get access token that we use for communication with API
     */
    private $code;
    /**
     * @var mixed|void access token that we send on each request to the API
     */
    private $accessToken;
    /**
     * @var mixed|void Instagram ID of authenticated user
     */
    private $userID;
    /**
     * @var string URL from which we get access token after code is received
     */
    private $tokenURL;
    /**
     * @var string URL from which we fetch data
     */
    private $apiURL;
    /**
     * @var QodeStockholmInstagramApi instance of current class
     */
    private static $instance;

    /**
     * Helper object
     * @var QodeStockholmInstagramHelper
     */
    private $helper;

    const CODE_OPTION_NAME = 'qode_instagram_code';
    const USER_ID_OPTION_NAME = 'qode_instagram_user_id';
    const ACCESS_TOKEN_OPTION_NAME = 'qode_instagram_access_token';
    const CODE_REDIRECT_URI_OPTION_NAME = 'qode_instagram_code_redirect_uri';

    /**
     * Private constructor because of singletone pattern. It sets all necessary properties
     */
    private function __construct() {
        $this->clientID = 'd08852104b6e428588736ce56df2a126';
        $this->clientSecret = '3b889d5c5d234cb6a52c1d3d65e6b63e';
        $this->redirectUri = 'http://demo.select-themes.com/instagram-app/instagram-redirect.php';
        $this->responseType = 'code';
        $this->tokenURL = 'https://api.instagram.com/oauth/access_token';
        $this->code = get_option(self::CODE_OPTION_NAME);
        $this->userID = get_option(self::USER_ID_OPTION_NAME);
        $this->accessToken = get_option(self::ACCESS_TOKEN_OPTION_NAME);
        $this->apiURL = 'https://api.instagram.com/v1';
        $this->helper = new QodeStockholmInstagramHelper();
    }


    /**
     * Must override magic method because of singletone
     */
    private function __clone() {}

    /**
     * Must override magic method because of singletone
     */
    private function __wakeup() {}

    /**
     * @return string
     */
    public function getResponseType() {
        return $this->responseType;
    }

    /**
     * @return QodeStockholmInstagramApi
     */
    public static function getInstance() {
        if(self::$instance === null) {
            return new self();
        }

        return self::$instance;
    }

    /**
     * @return string
     */
    public function getClientID() {
        return $this->clientID;
    }

    /**
     *
     * @return string
     *
     * @see QodeStockholmInstagramApi::buildCurrentPageURI()
     */
    public function getRedirectUri() {
        return $this->redirectUri.'?redirect_uri='.$this->buildCurrentPageURI();
    }

    /**
     * @return QodeStockholmInstagramHelper
     */
    public function getHelper() {
        return $this->helper;
    }

    /**
     * Builds current page url that we use to redirect user to the page from which
     * he made request to sign in to Instagram.
     * @return string
     */
    public function buildCurrentPageURI() {
        $protocol = is_ssl() ? 'https' : 'http';
        $site     = $_SERVER['SERVER_NAME'];
        $slug     = $_SERVER['REQUEST_URI'];

        return urlencode($protocol.'://'.$site.$slug);
    }

    /**
     * Saves code redirect uri to database. It will be used when requesting token
     */
    public function storeCodeRequestURI() {
        update_option(self::CODE_REDIRECT_URI_OPTION_NAME, $this->getRedirectUri());
    }

    /**
     * Saves code that will be used when requesting token
     */
    public function storeCode() {
        if(!empty($_GET['code'])) {
            update_option(self::CODE_OPTION_NAME, $_GET['code']);
           $this->code = get_option(self::CODE_OPTION_NAME);
        }
    }

    /**
     * Retrieves images data from Instagram
     * @param int $limit
     * @param string $tag from which tag to retrieve images
     * @param array $transient transient config
     * @return mixed returns either array of retrieved data if request was successful, or it returns false if it wasn't
     *
     * @see QodeStockholmInstagramApi::fetchData()
     */
    public function getImages($limit = '', $tag = '', $transient = array()) {
        $response = $this->fetchData($limit, $tag, $transient);

        if(property_exists($response, 'status') && $response->status == 'ok') {
            return $response->data;
        }

        return false;
    }

    /**
     * Gets requested data from Instagram API
     *
     * @param int $limit how much images to retrieve
     * @param string $tag from which tag to retrieve images
     * @param array $transient transient config
     * @return stdClass
     *
     * @see QodeStockholmInstagramApi::getAccessToken()
     */
    private function fetchData($limit = '', $tag = '', $transient = array('use_transient' => false)) {
        $returnObject = new stdClass();

        //if access_token isn't stored in db
        if(!get_option(self::ACCESS_TOKEN_OPTION_NAME)) {
            //get token
            $tokenObject = $this->getAccessToken();
            //if token wasn't retrieved for any reason
            if($tokenObject->status !== 'ok') {
                $returnObject->status = $tokenObject->status;
                $returnObject->message = $tokenObject->message;

                //return object that contains error code and message
                return $returnObject;
            }
        }

        //do we use transient and does it exists in the database?
        if($this->useTransients($transient) && get_transient($transient['transient_name'])) {
            //get transient value
            $data = get_transient($transient['transient_name']);
        } else {
            if($tag !== '') {
                //request data from API
                $httpResponse = wp_remote_get($this->apiURL.'/tags/'.$tag.'/media/recent/?access_token='.$this->accessToken.'&count='.$limit);
            } else {
                //request data from API
                $httpResponse = wp_remote_get($this->apiURL.'/users/'.$this->userID.'/media/recent/?access_token='.$this->accessToken.'&count='.$limit);
            }


            //parse returned JSON response to assoc array
            $httpBody = json_decode($httpResponse['body'], true);

            //is response an error or if response code is somethinf different than ok?
            if(is_wp_error($httpResponse) || (isset($httpBody['meta']['code']) && $httpBody['meta']['code'] !== 200)) {
                $returnObject->status = 'error';
                $returnObject->message = 'Can\'t connect with Instagram';

                return $returnObject;
            }

            $data = $httpBody['data'];

            //do we use transients?
            if($this->useTransients($transient)) {
                //store transient so we can use it later
                set_transient($transient['transient_name'], $data, $transient['transient_time']);
            }
        }

        if((count($data) > $limit) && $limit !== '') {
            $data = array_slice($data, 0, $limit);
        }

        //prepare return object and return it
        $returnObject->status = 'ok';
        $returnObject->message = 'Success';
        $returnObject->data = $data;

        return $returnObject;
    }

    /**
     * Gets access token from Instagram auth based on code that we retrieved when user allowed us access
     * @return stdClass return object. Contains status attribute and message attribute
     */
    public function getAccessToken() {
        $returnObject = new stdClass();

        //if code property is empty, user hasn't allowed us access
        if(empty( $this->code)) {
            $returnObject->status = 'error';
            $returnObject->message = 'User has\'nt connected with Instagram';
            return $returnObject;
        } else {
            $getTokenArgs = array(
                'body' => array(
                    'client_id' => $this->clientID,
                    'client_secret' => $this->clientSecret,
                    'grant_type' => 'authorization_code',
                    'redirect_uri' => urldecode(get_option(self::CODE_REDIRECT_URI_OPTION_NAME)),
                    'code' => $this->code
                )
            );
            //request access token from Instagram
            $httpResponse = wp_remote_post($this->tokenURL, $getTokenArgs);

            //check if response wasn't successful
            if(is_wp_error($httpResponse) || (isset($httpResponse['response']['code']) && $httpResponse['response']['code'] !== 200)) {
                $returnObject->status = 'error';
                $returnObject->message = 'Can\t connect with Instagram API';
                return $returnObject;
            }

            //parse json response from API to assoc array
            $responseBody = json_decode($httpResponse['body'], true);

            //if access token was returned store it to database. Also store user id
            if(isset($responseBody['access_token']) && isset($responseBody['user']['id'])) {
                update_option(self::ACCESS_TOKEN_OPTION_NAME, $responseBody['access_token']);
                update_option(self::USER_ID_OPTION_NAME, $responseBody['user']['id']);
                $this->accessToken = $responseBody['access_token'];
                $this->userID = $responseBody['user']['id'];
            } else {
                $returnObject->status = 'error';
                $returnObject->message = 'Can\t get Instagram access token';
                return $returnObject;
            }
        }

        //prepare return object and return it
        $returnObject->status = 'ok';
        $returnObject->message = 'Stored access token';

        return $returnObject;
    }

    /**
     * Check if user has authorized our application
     * @return bool
     */
    public function hasUserConnected() {
        $accessToken = get_option(self::ACCESS_TOKEN_OPTION_NAME);

        return !empty($accessToken);
    }


    /**
     * Checks whether transient config array is set to use transients or not
     * @param $transientConfig associative array of transient configuration
     * @return bool
     */
    private function useTransients($transientConfig) {
        return (isset($transientConfig['use_transients']) && $transientConfig['use_transients']) && (!empty($transientConfig['transient_time']));
    }

    /**
     * Generates authorize URL which is used to allow access to our application and get instagram code
     * @return string
     */
    public function getAuthorizeUrl() {
        return 'https://api.instagram.com/oauth/authorize?client_id='.$this->getClientID().'&redirect_uri='.$this->getRedirectUri().'&response_type='.$this->getResponseType();
    }

    public function disconnectUser() {
       if($this->hasUserConnected()) {
           $responseObj = new stdClass();
           $currentPageUrl = !empty($_POST['currentPageUrl']) ? $_POST['currentPageUrl'] : $this->buildCurrentPageURI();
           $response = delete_option(self::USER_ID_OPTION_NAME) && delete_option(self::ACCESS_TOKEN_OPTION_NAME) && delete_option(self::CODE_OPTION_NAME) && delete_option(self::CODE_REDIRECT_URI_OPTION_NAME);
           if ($response) {
               $responseObj->status = true;
               $responseObj->message = 'Ok';
               $varname = 'code';
               $urlWithoutGetParam = preg_replace('/([?&])'.$varname.'=[^&]+(&|$)/','$1',$currentPageUrl);
               $responseObj->redirectURL = $urlWithoutGetParam;
           } else {
               $responseObj->status = false;
               $responseObj->message = __('Couldn\'t disconnect from Instagram', 'select-instagram-feed');
           }

           echo json_encode($responseObj);

       }
        wp_die();
    }
}