// VARIBALES //
var priceField, taxFeesField, downPaymentField, tradeInField, owedField, interestField, termField;
var amountField, interestPaidField, totalCostField, paymentField;
var price, taxFees, downPayment, tradeIn, owed, interst, term, interestPaid, totalCost, payment;
var principle, monthlyInterest;

// INIT //
init();

// FUNCTIONS //
function init(){
    priceField = document.getElementById("price");
    taxFeesField = document.getElementById("tax-fees");
    downPaymentField = document.getElementById("down-payment");
    tradeInField = document.getElementById("trade-in");
    owedField = document.getElementById("owed");
    interestField = document.getElementById("interest");
    termField = document.getElementById("term");

    amountField = document.getElementById("amount");
    interestPaidField = document.getElementById("interest-paid");
    totalCostField = document.getElementById("total-cost");
    paymentField = document.getElementById("payment");
}

//Runs when the submit button is pressed
function alSubmit(){
    //Only continue if the fields are good
    if(checkFields())
    {
        //Gets the variables ready
        setValues();
        //Does the math
        doMaths();
        //Updates the fields on the paeg
        setFields();
    }
}

//Checks all the fields and returns false if they aren't ready to go
function checkFields(){
    if(priceField.value == "" || !priceField.value.match(/^[1-9]\d*(\.\d+)?$/)) 
    {
        alert("You need to enter a price that is greater than $0.");
        return false;
    }else
    if(taxFeesField.value != "" && !taxFeesField.value.match(/^[0-9]\d*(\.\d+)?$/)){
        alert("For the Tax & Fees, you need to enter a number or nothing at all.");
        return false;
    }else
    if(downPaymentField.value != "" && !downPaymentField.value.match(/^[0-9]\d*(\.\d+)?$/)){
        alert("For the Down Payment, you need to enter a number or nothing at all.");
        return false;
    }else
    if(tradeInField.value != "" && !tradeInField.value.match(/^[0-9]\d*(\.\d+)?$/)){
        alert("For the Trade In, you need to enter a number or nothing at all.");
        return false;
    }else
    if(owedField.value != "" && !owedField.value.match(/^[0-9]\d*(\.\d+)?$/)){
        alert("For the Negative Equity, you need to enter a number or nothing at all.");
        return false;
    }else
    if(interestField.value == "" || !interestField.value.match(/^[0-9]\d*(\.\d+)?$/)){
        console.log("interest field");
        alert("You need to enter an interest rate that is greater than or equal to 0%.");
        return false;
    }else
    if(termField.value == "" || !termField.value.match(/^[1-9]\d*(\.\d+)?$/))
    {
        console.log("term field");
        alert("You need to enter a term that is greater than 0 months.");
        return false;
    }else
    {
        //Sets these values to zero if they're empty
        if(taxFeesField.value == "")
        {
            taxFeesField.value = 0;
            taxFees = 0;
        }else
        {
            taxFees = Number(taxFeesField.value);
        }
        if(downPaymentField.value == "")
        {
            downPaymentField.value = 0;
            downPayment = 0;
        }else
        {
            downPayment = Number(downPaymentField.value);
        }
        if(tradeInField.value == "")
        {
            tradeInField.value = 0;
            tradeIn = 0;
        }else
        {
            tradeIn = Number(tradeInField.value);
        }
        if(owedField.value == "")
        {
            owedField.value = 0;
            owed = 0;
        }else
        {
            owed = Number(owedField.value);
        }

        //Ready to do some maths
        return true;
    }
}

//Sets up the variables
function setValues(){
    price = Number(priceField.value) + taxFees + owed - downPayment - tradeIn;
    console.log(Number(priceField.value) + taxFees + owed);
    principle = price;
    interest = Number(interestField.value)/100;
    monthlyInterest = interest/12;
    term = Number(termField.value);
}

//Does all the math
function doMaths(){
    if(interest > 0)
    {
       payment = (monthlyInterest*price)/(1-Math.pow(1+monthlyInterest, -term));

        var paymentInterest, newPayment;
        interestPaid = 0;

        //Finds total amount of interest
        for(var x=0; x < term; x++)
        {
            //Find out how much of your payment is interest
            paymentInterest = principle * monthlyInterest;
            //Find out the new payment after the interest has been deducted
            newPayment = payment - paymentInterest;
            //Take the payment out of the principle to get the new principle
            principle = principle - newPayment;
            //Count up how much interest has been paid
            interestPaid = interestPaid + paymentInterest;
        } 
    }else
    {
        payment = price / term;
        interestPaid = 0;
    }

    totalCost = price + interestPaid;
}

//Sets the fields on the site
function setFields(){
    price = price.toFixed(2);
    amountField.value = "$" + price;

    totalCost = totalCost.toFixed(2);
    totalCostField.value = "$" + totalCost;

    interestPaid = interestPaid.toFixed(2);
    interestPaidField.value = "$" + interestPaid;

    payment = payment.toFixed(2);
    paymentField.value = "$" + payment;
}