function UseCases(host)
{
    this.id = "mdUseCases";
    this.title = "User Stories";

    this.width = 1000;
    this.height = 130;
    this.posx = 0;
    this.posy = 545;
    
    this.host = host;
}

UseCases.method("onDataLoaded", function(data){
});

UseCases.method("onRendered", function()
{
});

UseCases.method("getContent", function()
{
    var st = "";
st = st + "As a product line engineer:<ol>";
st = st + "<li>How do I view all N optimal product configurations?</li>";
st = st + "<li>How do I see differences among all N products?</li>";
st = st + "<li>How do I choose only K products out of N cutting off the products with less significant, in my opinion, features?</li>";
st = st + "<li>How do I see the correlation between two metrics (e.g. energy significantly influences performance)?</li>";
st = st + "<li>How can I group together the products with similar features?</li></ol>";

    return st;
});

UseCases.method("getInitContent", function()
{
	return this.getContent();
});
