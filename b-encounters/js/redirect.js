$(document).ready(function(){
    if(re){
        //change URL
        if($('#breadcrumb .sel').prev().text() == 'Selected Works' || $('#breadcrumb .sel').prev().text() == 'Resources'){
            $('#breadcrumb .sel').prev().href(re);
        }
        
        if($('#browse .page-words a').text() == 'Back to previous page'){
            $('#browse .page-words a').href(re);
        }
    }
});
