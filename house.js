const streetSelect = document.getElementById("choose-street");
const bedroomSelect = document.getElementById("choose-bedrooms");
const bathroomSelect = document.getElementById("choose-bathrooms");
const form = document.querySelector("form");
const resultCount = document.getElementById("result-count");
let houses;
const url= "https://mdn.github.io/shared-assets/misc/houses.json";
async function fetchHouseData()
{
  const result=await fetch(url);

  if(!result.ok)
  {
   throw new Error (`There is an ${result.status} error`);
  }
  else{
  houses=await result.json();
  }
  initializeForm(houses); 
}
function initializeForm(houses) {
   let arr=[];let maxbath=-99999,maxbed=-99999;
   for(let house of houses)
   {
    if(!(arr.includes(house.street))){
        arr.push(house.street);
        let option=document.createElement('option');
        option.value=`${house.street}`;
        option.textContent=`${house.street}`;
        streetSelect.append(option);
    }
   }
   for(let house of houses)
   {
    if(house.bedrooms>maxbed)
    {
        maxbed=house.bedrooms;
    }
        if(house.bathrooms>maxbath)
    {
        maxbath=house.bathrooms;
    }
   }
   for(let i=1;i<=maxbed;i++)
   {
        let option=document.createElement('option');
        option.value=`${i}`;
        option.textContent=`${i}`;
        bedroomSelect.append(option);
   }
   for(let i=1;i<=maxbath;i++)
   {
        let option=document.createElement('option');
        option.value=`${i}`;
        option.textContent=`${i}`;
        bathroomSelect.append(option);
   }
}
function renderHouses(e) {
  e.preventDefault();
  let street=String(streetSelect.value);
  let bedrooms=String(bedroomSelect.value);
  let bathrooms=String(bathroomSelect.value);
  let selected= houses.filter((house)=>
  {
    return ((house.street==street)||street=="") &&
    ((house.bedrooms==bedrooms)||bedrooms=="") &&
    ((house.bathrooms==bathrooms)||bathrooms=="")
  });
  resultCount.textContent=`Results returned: ${selected.length}`; 
  renderHouse(selected);
}
let Totalarea=0;
function renderHouse(selected)
{   
     let opList=document.querySelector("#output ul");
     opList.replaceChildren();
    for(let i=0;i<selected.length;i++)
    {
    let arr=Object.values(selected[i].room_sizes); 
       for( let a of arr )
    {
        Totalarea+=a;
    }
     let opStreet=document.createElement('h2');
     opStreet.textContent=`${selected[i].street}`;
     let bedroomsNum=document.createElement('li');
     bedroomsNum.textContent=`Bedrooms: ${selected[i].bedrooms}`;
     let bathroomsNum=document.createElement('li');
     bathroomsNum.textContent=`Bathrooms: ${selected[i].bathrooms}`;
     let RoomArea=document.createElement('li');
     RoomArea.textContent=`Room Area: ${Totalarea}m²`;
     let price = document.createElement('li');
     price.textContent=`Price: £${selected[i].price}`;
     opList.append(opStreet);
     opList.append(bedroomsNum);
     opList.append(bathroomsNum);
     opList.append(RoomArea);
     opList.append(price);
     output.classList.remove('hide');
     Totalarea=0;
}
}
form.addEventListener("submit", renderHouses);
fetchHouseData();