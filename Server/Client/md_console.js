function Console(host)
{ 
    this.id = "mdConsole";
    this.title = "Output and Compatibility";
    
    this.width = 1000;
    this.height = 130;
    this.posx = 0;
    this.posy = 510;

    this.host = host;
    this.claferXML = "";
    this.instancesXML = "";
    this.output = "";
}

Console.method("onDataLoaded", function(data){
    this.claferXML = data.claferXML;
    this.instancesXML = data.instancesXML;
    this.output = data.output;
});

Console.method("onError", function(result)
{
    $('#output').html(result);
});

Console.method("onRendered", function()
{
	$('#abstractXMLOutput').val(this.claferXML);
	$('#instancesXMLOutput').val(this.instancesXML);
    $('#output').html(this.output);
});

Console.method("getContent", function()
{
    return '<table width="100%" height="100%" cellspacing="15"><tr height="1em" style="height:1em;"><th width="50%">ClaferMoo:</th><th width="25%">Abstract Clafers:</th><th width="25%">Instances:</th></tr><td><div class="parent"><textarea id="output" class="child" style="height:100%; overflow:scroll; width:100%"></textarea></div></td><td><div class="parent"><textarea class="child" id="abstractXMLOutput" style="height:100%; overflow:scroll; width:100%;"></textarea></div></td><td><div class="parent"><textarea id="instancesXMLOutput" class="child" style="height:100%; overflow:scroll; width:100%;"></textarea></div></td></tr></table>';
});

Console.method("getInitContent", function()
{
	return this.getContent();
});