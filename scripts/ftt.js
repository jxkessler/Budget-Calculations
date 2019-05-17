// VARIBALES // 
var income;
var needs, wants, savings;

setVariables(); //Sets variables

// FUNCTIONS //

//Sets variables
function setVariables(){
    needs = document.getElementById("fttneeds"); //Get need field
    wants = document.getElementById("fttwants"); //Get want field
    savings = document.getElementById("fttsavings"); //Get savings field
}

function fttSubmit(){
    //Check if income is empty
    income = document.getElementById("fttincome").value;

    if(income == "")
    {
        alert("You need to enter an income before you can submit.");
    }else
    if(!income.match(/^[0-9]\d*(\.\d+)?$/)) //Check if text is a number
    {
        alert("You have to enter a number, and it has to be greater than 0.");
    }
    else
    {
        var needValue = income * 0.50;
        var wantValue = income * 0.30;
        var saveValue = income * 0.20;

        needValue = needValue.toFixed(2);
        wantValue = wantValue.toFixed(2);
        saveValue = saveValue.toFixed(2);

        needs.value = "$" + needValue;
        wants.value = "$" + wantValue;
        savings.value = "$" + saveValue;
    }
}
