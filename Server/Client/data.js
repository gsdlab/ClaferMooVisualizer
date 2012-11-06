function DataTable () 
{
    this.matrix = new Array();   // matrix
    this.products = new Array(); // product labels
    this.features = new Array(); // features
    this.formalContext = new Array(); // formal context table
    this.title = "";                 // instance super clafer

}

DataTable.method("subset", function(arrayProducts)
{
    var result = new DataTable();
    
    var marked = new Array();
    var newProducts = new Array;
    var newFormalContext = new Array();
    
    var newFormalContextRow = new Array();
    
    newFormalContextRow.push(this.title);
    
    for (var i = 0; i < this.products.length; i++)
    {
        var found = false;
        for (var j = 0; j < arrayProducts.length; j++)
        {
            if (arrayProducts[j] == this.products[i])
            {
                found = true;
                break;
            }
        }
        marked.push(found);
        if (found)
        {
            newProducts.push(this.products[i]);
            newFormalContextRow.push(this.products[i]);
        }
    }
    
    newFormalContext.push(newFormalContextRow);
    
    var newMatrix = new Array();
    
    for (var i = 0; i < this.features.length; i++)
    {
        var newMatrixRow = new Array();
        var newFormalContextRow = new Array();
        var denyAddContextRow = false;
        
        if (i < this.formalContext.length)
            newFormalContextRow.push(this.formalContext[i][0]);
        
        for (var j = 0; j < this.products.length; j++)
        {
            if (marked[j])
            {
                var sVal = this.matrix[i][j];
                newMatrixRow.push(sVal);
                
                if (sVal == "yes")
                    newFormalContextRow.push("X");
                else if (sVal == "-")
                    newFormalContextRow.push("");
                else
                    denyAddContextRow = true;
            }
        }
        
        if (!denyAddContextRow)
            newFormalContext.push(newFormalContextRow);
        
        newMatrix.push(newMatrixRow);
    }
    
    result.features = this.features;
    result.products = newProducts;    
    result.matrix = newMatrix;
    result.title = this.title;
    
    result.formalContext = newFormalContext;
    
    return result;
});

DataTable.method("toArrayOfSetJS", function()
{
    var result = new Array();

    for (var j = 0; j < this.products.length; j++)
    {
        var currentSet = new JS.Set([]);
        
        for (var i = 1; i < this.formalContext.length; i++)
        {
//            alert(this.formalContext[i][j]);
            if (this.formalContext[i][j + 1] == "X")
            {
                currentSet.add(this.features[i - 1]);
            }
        }
        
        result.push(currentSet);
    }

    return result;
});