$('document').ready(function(){
	$('input[type="info"], input[type="info"], textarea').focus(function(){
		var background = $(this).attr('id');
		$('#' + background + '-form').addClass('formgroup-active');
		$('#' + background + '-form').removeClass('formgroup-error');
	});
	$('input[type="info"], input[type="info"], textarea').blur(function(){
		var background = $(this).attr('id');
		$('#' + background + '-form').removeClass('formgroup-active');
	});

function errorfield(field){
	$(field).addClass('formgroup-error');
	console.log(field);	
}

$("#waterform").submit(function() {
	var stopsubmit = false;

if($('#firstName').val() == "") {
	errorfield('#name-form');
	stopsubmit=true;
}
if($('#lastName').val() == "") {
	errorfield('#email-form');
	stopsubmit=true;
}
if($('#class').val() == "") {
	errorfield('#email-form');
	stopsubmit=true;
}
if($('#schoolName').val() == "") {
	errorfield('#email-form');
	stopsubmit=true;
}
  if(stopsubmit) return false;
});
		
});