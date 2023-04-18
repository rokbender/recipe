const cards=document.getElementById("cards");

function render(arrObj){
    let text="";
    arrObj.forEach((card)=>{
        text+=`<div class="card">
        <img src=${card.urlimg} alt=${card.name} >
        <h3>${card.name}</h3>
        <div class="card_box">
            <div class="card_item">
                <img class="icons" src="./icons/clock.png" alt="">
                <p>${card.timeCook+" хв"}</p>
            </div>
            <div class="card_item">
                <img class="icons" src="./icons/calory.png" alt="">
                <p>${card.calorie+" кКал"}</p>
            </div>
            <div class="card_item">
                <img class="icons" src="./icons/plate.png" alt="">
                <p>${card.portions+" порції"}</p>
            </div>
            <div class="card_item">
                <img class="icons" src="./icons/star.png" alt="">
                <p>${card.difficult}</p>
            </div>
        </div>
        <a href=${card.url} class="link">Детальніше...</a>
    </div>`;
    
    });

    cards.innerHTML=text;
}

function sortCard(value,direction){
    if(value=="name"){
        arrayObj.sort((a,b)=>{
            if (a.name > b.name) {
                return 1;
              }
            if (a.name < b.name) {
                return -1;
              }
        
            return 0;
        }); 
        if(direction=="down"){
            arrayObj.reverse();   
        }
    }
    else{
        arrayObj.sort((a,b)=>direction=="up" ? a[value]-b[value] :b[value]-a[value]);
    }
    
    render(arrayObj);
    
}
document.addEventListener("DOMContentLoaded", render(arrayObj));

document.addEventListener('click', function (e) {
    if(e.target.className=="btn"){
        let str=e.target.id.split("-");
        sortCard(str[0],str[1]);
    }
});

function checkValue (arr,dificult){
  console.log(arr[3].value=="");
  let err=arr.filter((item)=>{
    item.style.border="1px solid #bdbdbd";
    if(item.value==""){
      return true;
    }


  });
console.log(err);
if(err.length>0){
  document.querySelector(".error").style.display="block";
  err.forEach(e=>e.style.border="1px solid red");
}
else{
  document.querySelector(".error").style.display="none";
  const dish = CardCreator(arr[0].value,
    arr[1].value,
    arr[2].value,
    dificult,
    arr[3].value,
    arr[4].value,
    arr[5].value);
  arrayObj.push(dish);
  render(arrayObj);
  modal.close();
}
  

  
}



const modal = document.querySelector('dialog')
const modalBox = document.getElementById('modal-box')
const showModalBtn = document.getElementById('add')
const closeModalBtn = document.getElementById('close-modal-btn')

let isModalOpen = false

showModalBtn.addEventListener('click', (e) => {
  modal.showModal();
  isModalOpen = true;
  let urlimg1 = document.getElementById("urlimg");
  urlimg1.addEventListener('change', (e) => {
    document.querySelector(".previewPhoto").style.display="inline-block";
    let img=document.querySelector(".previewPhoto img");
    img.src=urlimg1.value;
  });
  
  const send=document.getElementById("send");
  send.onclick=()=>{
    document.querySelector(".previewPhoto").style.display="none";
    let nameValue = document.getElementById("name");
    let timeCook = document.getElementById("timeCook");
    let calorie = document.getElementById("calorie");
    let portion = document.getElementById("portion");
    let dificult = document.getElementById("dificult");
    dificult=dificult.options[dificult.selectedIndex].text;
    let url = document.getElementById("url");
    let urlimg = document.getElementById("urlimg");
    checkValue([nameValue,calorie,timeCook,portion,url,urlimg],dificult);
    
  };
  e.stopPropagation();
})



closeModalBtn.addEventListener('click', () => {
  modal.close();
  isModalOpen = false;

})

document.addEventListener('click', (e) => {
  if (isModalOpen && !modalBox.contains(e.target)) {
    modal.close()
  }
})

function CardCreator(name,calorie,timeCook,difficult,portions,url,urlimg) {
 return {
    name,
    calorie,
    timeCook,
    difficult,
    portions,
    url,
    urlimg,
 }

}



   
    




