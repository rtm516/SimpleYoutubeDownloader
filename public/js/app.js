var resultTemplate = "<table><tr><td><img id='resultImage' src='{THUMBNAIL}'></td><td id='resultInfo'><u>{TITLE}</u><br><a href='https://www.youtube.com/watch?v={ID}'>https://www.youtube.com/watch?v={ID}</a><br><br><a id='dlButton' href='{DL_URL}'>Download</a></td></tr></table>";

$("#youtubeForm").on('submit', function(e){
    e.preventDefault();

    $("#result").html("<img src='/img/load.gif'>");

    $.get("/api/getInfo", {url: $("#url").val()}, function(data) {
        var formattedHTML = resultTemplate;

        formattedHTML = formattedHTML.replace(/{THUMBNAIL}/g, data.thumbnail)
        formattedHTML = formattedHTML.replace(/{TITLE}/g, data.title)
        formattedHTML = formattedHTML.replace(/{ID}/g, data.id)
        formattedHTML = formattedHTML.replace(/{DL_URL}/g, "/api/download?mp3=true&url=" + encodeURI("https://www.youtube.com/watch?v=" + data.id))

        $("#result").html(formattedHTML);
    });
});

function resizeElements() {
    var height = ($("main > h1").outerHeight() + $("#youtubeForm").outerHeight());
    $("main").css("height", height + "px");
    $("main").css("margin-top", "-" + (height / 2) + "px");
}
$(window).resize(resizeElements);
resizeElements();