
const toduInput=document.getElementById('todu-input');
const card=document.querySelector('.card');
const tudoform=document.getElementById('tudo-form');
const btn=document.getElementById('btn');
const itemUl=document.getElementById('item-ul');
const msg=document.querySelector('.msg');


// add todu function
const addtodu=(event)=>{
    event.preventDefault();
  let value=toduInput.value;

  //unic id genaret
  let uid=new Date().getTime().toString();
  
  createtodu(uid,value);

  //add data localStorage
  let storeData=getTodu();
  storeData.push({uid,value});
  localStorage.setItem('todu',JSON.stringify(storeData));

  showSms('success');
}

const getTodu=()=>{
    return localStorage.getItem('todu')?JSON.parse(localStorage.getItem('todu')):[];
}

//add listener
tudoform.addEventListener('submit',addtodu);
window.addEventListener('DOMContentLoaded',staorageTodu);

//create todu
const createtodu=(uid,value)=>{
Lielement=document.createElement('li');
Lielement.id=uid;
Lielement.classList.add('li-style');
Lielement.innerHTML=
`<span>${value}</span>
<span><button class="deletebtn"><i class="fa-solid  fa-trash"></i></button></span>
`;
itemUl.insertBefore(Lielement,itemUl.firstChild);

let deleteBtn=Lielement.querySelector('.deletebtn');
deleteBtn.addEventListener('click',deleteTodu);
 

}

function staorageTodu(){
    let todu=getTodu();
    todu.map((res)=>{
        createtodu(res.uid,res.value);
    })
    
}

const deleteTodu=(e)=>{
    let selectTodu=e.target.parentElement.parentElement.parentElement;
    itemUl.removeChild(selectTodu);
    showSms('delete');
    
    let toduData=getTodu();
    toduData=toduData.filter((res)=>res.uid!==selectTodu.id);
    localStorage.setItem('todu',JSON.stringify(toduData));
    

}

const showSms=(type)=>{
    if(type=='success'){
        msg.textContent='Add Successfully';
        msg.classList.add('msg-success');

        setTimeout(()=>{
            msg.textContent='';
            msg.classList.remove('msg-success');
        },1000);

    }else if(type=='delete'){
        msg.textContent='delete Successfully';
        msg.classList.add('msg-delete');

        setTimeout(()=>{
            msg.textContent='';
            msg.classList.remove('msg-delete');
        },1000);
    }
}