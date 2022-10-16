const btnTextGetir=document.getElementById('btn-text-getir');
btnTextGetir.addEventListener('click', getText);
const sonucDiv =document.getElementById('sonuc');

function getText(e){
    e.preventDefault();

   fetch('deneme1.txt')
   .then(response => response.text())
   .then(sonuc => sonucDiv.innerText=sonuc)
   .catch(hata=>console.log(hata));

  
     
}