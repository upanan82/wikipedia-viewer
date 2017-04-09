'use strict';

var inputValue = "",
    listText,
    arr = [],
    results,
    search,
    prop,
    message = "<p><img src='images/error.png' width='50'></p>We're Sorry, but you can not use wikipedia viewer now!<br>Please, try again later.";

function searchFunc() {
	search = $("input").val();
	if(search != prop && search != "") 
	{
		$("#list").html("<img src='images/load.gif' width='25'>");
		$.ajax({
			url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + search,
			type: 'GET',
			dataType: 'jsonp',
			success: function(json) {
				$("#list").html("<h2>Not found!</h2>");
				results = json.query.pages;
				arr = Object.keys(results);
				$("#list").empty();
				for(var i = 0; i < arr.length; i++) 
				{
					listText = document.createElement('a');
					listText.href = "https://en.wikipedia.org/?curid=" + arr[i];
					listText.setAttribute("target", "_blank");
					listText.innerHTML = "<li><b><h4>" + results[arr[i]].title + "</h4></b>" + results[arr[i]].extract + "</li>";
					list.appendChild(listText);
				}
			},
			error: function() { $(".block").html(message); },
		});
		prop = $("input").val();
	}
	else {}
	return false;
};

setTimeout(function() { $("input").blur(function() {
	inputValue = $("input").val();
	$("input").val("");
}); }, 1000);

setTimeout(function() { $("input").focus(function() {
	$("input").val(inputValue);
}); }, 1000);