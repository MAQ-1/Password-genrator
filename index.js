const inputSlider=document.querySelector("[data-lengthSlider]");

const lengthDisplay=document.querySelector("[data-length]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[ data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector('#uppercase');
const lowercaseCheck=document.querySelector('#lowercase');
const numberCheck=document.querySelector('#number');
const symbolCheck=document.querySelector('#symbols');
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector('.generateButton');
const allCheckbox=document.querySelectorAll("input[type=checkbox]");
const symbol='!@#$%^&*()_{}?"<>*-+/';

let passwordLength=10;
let checkCount=0;
let password="";
setIndicator("#ccc");
handleSlider();

function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%"
}

function setIndicator(color){
    indicator.style.background=color;
    indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}

function getRNdinteger(min,max){
   return Math.floor(Math.random()*(max-min))+min;
}

function generateRndnumber(){
    return getRNdinteger(0,9);
}

function generateLowercase(){
    return String.fromCharCode(getRNdinteger(97,123));
}

function generatUppercase(){
    return String.fromCharCode(getRNdinteger(65,91));
}

function generateSymbols(){
     const rndNum= getRNdinteger(0,symbol.length);
     return symbol.charAt(rndNum);
}

function calcStregth(){
    let hasupper=false;
    let haslower=false;
    let hasNum=false;
    let hasSym=false;

    if(uppercaseCheck.checked) hasupper=true;
    if(lowercaseCheck.checked) haslower=true;
    if(numberCheck.checked) hasNum=true;
    if(symbolCheck.checked) hasSym=true;

    if(hasupper && haslower && (hasNum || hasSym) && passwordLength>=8){
        setIndicator("#0f0");
    }else if((haslower||hasupper)&& (hasSym || hasNum)&& passwordLength>=6){
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}


async function copyClipboard(){
     
    // console.log("chal gya ye");
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        
        copyMsg.innerText="Copied";
    }
        catch (e){
                copyMsg.innerText="Faled";
        }

        // console.log("chal gya ye");
        // to make copy text visible
        copyMsg.classList.add("active");
        
        setTimeout(() => {
            copyMsg.classList.remove("active");
        }, 2000); 

}


 function handleCheckBoxChange(){
            checkCount=0;
            allCheckbox.forEach((checkbox)=>{
                if(checkbox.checked){
                    checkCount++;
                }
            });

            //special condition
            if(passwordLength<checkCount){
                passwordLength=checkCount;
                handleSlider();
            }
        }

   

function shufflePassword(Array){
       
    for(let i=Array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp= Array[i];
        Array[i]=Array[j];
        Array[j]=temp;
    }

    let str="";
    Array.forEach((el)=> (str+=el));
    return str;

}

 allCheckbox.forEach( (checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange);
});



 inputSlider.addEventListener("input" ,(e) =>{
    passwordLength=e.target.value;
    handleSlider();
 }
)



  copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value!=""){
        copyClipboard();
    }
  })



 generateBtn.addEventListener('click',()=>{
    //none of the checkbox
    if(checkCount<=0) return;

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

     // let stsart the journey to find new password

     //remove old password

        password="";
        //let put stuff according to checkbox
      //  if(upperCase.checked){
      //      password+=generatUppercase();
      //  }

       // if(lowerCase.checked){
       //     password+=generateLowercase();
       // }
//
       // if(numberCheck.checked){
       //     password+=generateRndnumber();
       // }

       // if(symbolCheck.checked){
       //     password+=generateSymbols();
       // }
        
       let funcArr=[];

       if(uppercase.checked){
       funcArr.push(generatUppercase);}

       if(lowercase.checked){
        funcArr.push(generateLowercase);}

        if(symbolCheck.checked){
            funcArr.push(generateSymbols);}

            if(numberCheck.checked){
                funcArr.push(generateRndnumber);}

             // compuslory addition 

             for(let i=0;i<funcArr.length;i++){
                    password+=funcArr[i]();
             }
               console.log('compuslory done');
             // remaining addition

             for(i=0;i<passwordLength-funcArr.length;i++){
                let randIndex=getRNdinteger(0,funcArr.length);
                password+=funcArr[randIndex]();

             }
             console.log('reamining done');
             // shuffle password

             password=shufflePassword(Array.from(password));
             console.log('shuffle done');
             //show in UI

             passwordDisplay.value=password;
             console.log('UI done');
             //calculate strength

             calcStregth();




  });