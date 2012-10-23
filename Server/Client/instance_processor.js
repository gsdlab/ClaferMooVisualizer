function InstanceProcessor(instances)
{
	this.instances = instances;
}

InstanceProcessor.prototype.convertFromClaferMooOutputToXML = function(){
	myRegExp = /\b([^:= ]*)[ ]*\:?[ ]*([^:=]*)[ ]*\=?[ ]*([^ ]*)\b/;
	var result = "";
	list = this.instances.split("\n");
	
	result = '<?xml version="1.0"?><instances><instance>';
	var temp = "";
	var oldpos = -1;
	var pos = 0;
	var empty = true;
	
	for (var i = 0; i < list.length; i++)
	{
		var s = list[i];

		if (s == "")
			continue;
	
		empty = false;
	
		myMatch = myRegExp.exec(s);
		if (myMatch == null)
			continue;
			
		pos = myMatch.index;
		
		var indent = 0;
		
		if (oldpos != -1)
		{		
			if (pos > oldpos) // nesting level increases, only by one!!!
			{
				result += "";
			}
			
			if (pos < oldpos)
			{
				for (var j = 0; j < (oldpos - pos + 1); j++)
				{
					result += "</subclafers></clafer>";
				}
			}
			
			if (pos == oldpos) // clearly NO children
			{
				result += "</subclafers></clafer>";
			}
				
			if (pos == 0) // new instance begins
			{
				result += "</instance><instance>";
			}
			
			oldpos = pos;
		}
		else oldpos = 0;
		
		clafer = myMatch[1];
//		if (clafer == "c7_connectivity") alert("yes!");
			
		super_clafer = myMatch[2];
		value = myMatch[3];
		result += '<clafer id="' + clafer + '"><super>' + super_clafer + '</super><value>' + value + '</value><subclafers>';

	}
	
	if (empty)
	{
		return "";
	}
	
	if (0 < oldpos)
	{
		for (var j = 0; j < (oldpos + 1); j++)
		{
			result += "</subclafers></clafer>";
		}
	}	
	
	result += "</instance></instances>"
	
	return result;
}
