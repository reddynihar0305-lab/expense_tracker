let trandetails=JSON.parse(localStorage.getItem("transdata"))?? [];

const transaction_btn=document.getElementById('transaction_btn');
const description=document.getElementById('description');
const amount=document.getElementById('amount');
const transactions=document.querySelector(".trnsactn");
const balance=document.getElementById('balance');
const income=document.getElementById('in_amount');
const expense=document.getElementById('out_amount');

// let exp_value=0;
// let income_value=0;
// let balance_value=0;

transaction_btn.addEventListener('click',(e)=>{
    e.preventDefault();

    // const li=document.createElement("li");
    // const li_amount=document.createElement("span");
    // const remove_btn=document.createElement("span");
    // li.textContent=description.value;
    // li_amount.textContent=amount.value;
    // li.append(li_amount);
    // li.append(remove_btn);
    
    // if(value<=0){
    //     expense.textContent=Math.abs(value)+exp_value;
    //     exp_value=-(value)+exp_value;
    //     li.classList.add('exp');
    // }
    // else{
    //     income.textContent=value+income_value;
    //     income_value=value+income_value;
    //     li.classList.add('earn');
    // }
    const value=parseFloat(amount.value);
    if(description.value.trim()=="" || isNaN(value)){
        alert("please enter description and amount");
        return;
    }
    
    //saving to localstorage
    trandetails.push({
        description: description.value,
        amount: value,
        type: value <= 0 ? "exp" : "earn"
    });
    localStorage.setItem("transdata",JSON.stringify(trandetails));
    display();
    amount.value="";
    description.value="";
    // remove_btn.addEventListener('click',()=>{
    //     li.remove();
        
    //     if(li.classList.contains("exp")){
    //         exp_value=exp_value-Math.abs(value);
    //         expense.textContent=exp_value;
    //         balance_value = income_value - exp_value;
    //         balance.textContent = balance_value;



    //     }
    //     if(li.classList.contains("earn")){
    //         income_value=income_value-value;
    //         income.textContent=income_value;
    //         balance_value = income_value - exp_value;
    //         balance.textContent = balance_value;
    //     }
    // })

});
transactions.addEventListener('click',(e)=>{
    if(e.target.classList.contains("rem_btn")!=true){
        return;
    }
    const remove_li_idx=e.target.id;
    trandetails.splice(remove_li_idx,1);
    localStorage.setItem("transdata",JSON.stringify(trandetails));

    display();
})

const display = ()=>{
    let finaldata='';
    let exp_val=0;
    let income_val=0;
    trandetails.forEach((li,idx) => {
        
        if(li.type=="earn"){
            income_val+=li.amount;
        }
        else if(li.type=="exp"){
            exp_val+=li.amount;
        }

        finaldata+=`<li class="add_in_out ${li.type}">${li.description}
                        <span>${li.amount}</span>
                        <span class="rem_btn" id="${idx}">&times;</span>
                    </li>`;
        
    })

    income.textContent=income_val;
    expense.textContent=Math.abs(exp_val);
    balance.textContent=income_val-Math.abs(exp_val);
    transactions.innerHTML=finaldata;
}

display();

