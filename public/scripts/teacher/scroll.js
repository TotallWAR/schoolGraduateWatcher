$('document').ready(function(){
$("#profile").on ( "click" , function() {
    $('html, body').animate({
        scrollTop: $("#attendancePresent").offset().top
    }, 300);
});
    
$("#statistics").click(function() {
    $('html, body').animate({
        scrollTop: $("#homeworkPresent").offset().top
    }, 300);
});
    
$("#upDownloadMenu").click(function() {
    $('html, body').animate({
        scrollTop: $("#upDownload").offset().top
    }, 300);
});
    
$("#chatMenu").click(function() {
    $('html, body').animate({
        scrollTop: $("#tutorChat").offset().top
    }, 300);
});
    
$("#marks").click(function() {
    $('html, body').animate({
        scrollTop: $("#marksPresentation").offset().top
    }, 300);
});

});