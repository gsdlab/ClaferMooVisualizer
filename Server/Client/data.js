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
            newProducts.push(this.products[i]);
    }
    
    var newMatrix = new Array();
    
    for (var i = 0; i < this.features.length; i++)
    {
        var newMatrixRow = new Array();
        for (var j = 0; j < this.products.length; j++)
        {
            if (marked[j])
            {
                newMatrixRow.push(this.matrix[i][j]);
//                newFormalContextRow.push(this.matrix[i][j]);
            }
        }
        
        newMatrix.push(newMatrixRow);
    }
    
    result.features = this.features;
    result.products = newProducts;    
    result.matrix = newMatrix;
    result.title = this.title;
    
    result.formalContext = this.formalContext; // !!! to be changed
    
    return result;
});