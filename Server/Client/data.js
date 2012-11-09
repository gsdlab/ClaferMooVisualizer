function DataTable () 
{
    this.matrix = new Array();   // matrix
    this.products = new Array(); // product labels
    this.features = new Array(); // features
    this.formalContext = new Array(); // formal context table
    this.title = "";                 // instance super clafer

}

DataTable.method("subsetByProducts", function(arrayProducts)
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

DataTable.method("subsetByFeatures", function(arrayFeatures)
{
    var result = new DataTable();
    
    var marked = new Array();
    var newFeatures = new Array;
    var newFormalContext = new Array();
    
//    var newFormalContextRow = new Array();
    
//    newFormalContextRow.push(this.title);
    
    for (var i = 0; i < this.features.length; i++)
    {
        var found = false;
        for (var j = 0; j < arrayFeatures.length; j++)
        {
            if (arrayFeatures[j] == this.features[i])
            {
                found = true;
                break;
            }
        }
        marked.push(found);
        if (found)
        {
            newFeatures.push(this.features[i]);
        }
    }
    
    var newMatrix = new Array();
    
    for (var i = 0; i < this.features.length; i++)
    {
        if (!marked[i])
            continue;
    
        var newMatrixRow = new Array();
        var newFormalContextRow = new Array();
        var denyAddContextRow = false;
        
        if (i < this.formalContext.length)
            newFormalContextRow.push(this.formalContext[i][0]);
        
        for (var j = 0; j < this.products.length; j++)
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
        
        if (!denyAddContextRow)
            newFormalContext.push(newFormalContextRow);
        
        newMatrix.push(newMatrixRow);
    }
    
    result.features = newFeatures;
    result.products = this.products;    
    result.matrix = newMatrix;
    result.title = this.title;    
    result.formalContext = newFormalContext;
    
    return result;

});

DataTable.method("makeAggregatedFeature", function(s)
{
    return s + " (mean)";
});


DataTable.method("getCommon", function(needAggregate)
{
    var result = new DataTable();

    if (this.products.length <= 1)
        return result; // the task is not meaningful

    result.title = "Common and Aggreagate";
    var jointProductName = "(Group 1)";
    result.products.push(jointProductName);
    
    for (var i = 0; i < this.features.length; i++)
    {
        var same = true;
        var pivot = this.matrix[i][0];
        var isNumber = isNumeric(pivot) && needAggregate;
        
        
        var aggregator;
        
        if (isNumber)
        {
            aggregator = 0;
        }
        
        for (var j = 0; j < this.products.length; j++)
        {
            if (isNumber)
                aggregator += parseInt(this.matrix[i][j]);
                
            if (this.matrix[i][j] != pivot)
            {
                same = false;
                if (!isNumber)
                    break;
            }
        }
        
        if (same)
        {
            result.features.push(this.features[i]);
            var tempAr = new Array();
            tempAr.push(pivot);
            result.matrix.push(tempAr);
        }
        else
        {
            if (isNumber)
            {
                aggregator = aggregator / this.products.length;
                result.features.push(this.makeAggregatedFeature(this.features[i]));
                var tempAr = new Array();
                tempAr.push(Math.round(aggregator * 100) / 100);
                result.matrix.push(tempAr);
            }   
        }
    }

    return result;
});

DataTable.method("toSetOfFeatures", function()
{
    var result = new JS.Set(this.features);
    
    return result;
});