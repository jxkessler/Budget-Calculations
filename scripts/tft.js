// VARIABLES //
var income, insurance, interestField;
var incomeField, insuranceField, internestField;
var expensesField, paymentField, priceField, dpField;
var expenses, paymentField, priceField, downPaymentField, priceAfterDP;
var explanation;

// MAIN CODE //
init();

// FUNCTIONS //
function init() {
    incomeField = document.getElementById("tftincome");
    insuranceField = document.getElementById("tftinsurance");
    interestField = document.getElementById("tftinterest");

    expensesField = document.getElementById("tftexpenses");
    paymentField = document.getElementById("tftpayment");
    priceField = document.getElementById("tftprice");
    dpField = document.getElementById("tftdownpayment");

    explanation = document.getElementById("explanation");
}

function tftSubmit() {
    
    if(!fieldsEmpty())
    {
        //Set variables
        income = incomeField.value;
        insurance = insuranceField.value;
        interestField = interestField.value;

        if(fieldsNumbers())
        {
            //All the maths
            expenses = income * 0.10;
            paymentField = expenses - insurance;

            //Adjust the math based on if the interest rate is 0% or higher
            if(interestField > 0)
            {
                interestField = interestField/100;
                priceAfterDP = (paymentField * (1-(Math.pow(1 + (interestField/12),-48))))/(interestField/12);
                priceField = priceAfterDP / (1 - 0.20);
                downPaymentField = priceField - priceAfterDP;
            }else
            {
                priceAfterDP = paymentField * 48;
                priceField = priceAfterDP / (1-0.20);
                downPaymentField = priceField - priceAfterDP;
            }
            

            //Format values
            expenses = expenses.toFixed(2);
            paymentField = paymentField.toFixed(2);
            priceField = priceField.toFixed(2);
            downPaymentField = downPaymentField.toFixed(2);

            //Update fields
            expensesField.value = "$" + expenses;
            paymentField.value = "$" + paymentField;
            priceField.value = "$" + priceField;
            dpField.value = "$" + downPaymentField;

            console.log(explanation);
            explanation.innerHTML = "Based on your income of $" + income + ", and with a car insurance cost of $" + insurance
                                + ", you can afford to spend $" + paymentField + " per month on a car payment. To have a car payment"
                                + " of that amount on a 4 year loan, with a " + interestField.value + "% interest rate, the car"
                                + " should cost no more than $" + priceField + " before the down payment has been applied.";
            console.log(explanation);
            explanation.style.backgroundColor = "#040a16";
        }
    }
}

//Checks if the fields are empty
function fieldsEmpty(){
    if(incomeField.value == "" && insuranceField.value == "" && interestField.value == "")
    {
        alert("Make sure you fill in the fields above.");
        return true;
    }else
    if(incomeField.value == "")
    {
        alert("Make sure you fill in the income field.");
        return true;
    }else
    if(insuranceField.value == "")
    {
        alert("Make sure you fill in the insurance field.");
        return true;
    }else
    if(interestField.value == "")
    {
        alert("Make sure you fill in the interest field.");
        return true;
    }else
    {
        return false;
    } 
    
}

//Checks if the fields have numbers
function fieldsNumbers(){
    if(!income.match(/^[0-9]\d*(\.\d+)?$/))
    {
        alert("Income needs to be a number, and greater than 0.");
        return false;
    }else
    if(!insurance.match(/^[0-9]\d*(\.\d+)?$/))
    {
        alert("Insurance needs to be a number, and greater than 0.");
        return false;
    }else
    if(!interestField.match(/^[0-9]\d*(\.\d+)?$/))
    {
        alert("Interest needs to be a number, and greater than 0.");
        return false;
    }else
    if(income == 0 && insurance == 0 && interestField == 0)
    {
        alert("They can't all be zeroes, and greater than 0.");
        return false; 
    }else
    {
        return true;
    }
}