const btnTextGetir=document.getElementById('btn-text-getir');
const btnJSONGetir=document.getElementById('btn-json-getir');
const btnApidenJSONGetir=document.getElementById('btn-apiden-json-getir');
const btnJSONEKLE=document.getElementById('btn-json-veri-ekle');
btnJSONEKLE.addEventListener('click',jsonVeriEkle);
btnJSONGetir.addEventListener('click',getJSON);
btnTextGetir.addEventListener('click', getText);
btnApidenJSONGetir.addEventListener('click',getJSONfromAPI);
const sonucDiv =document.getElementById('sonuc');

function getJSON(e) {
    e.preventDefault();
    fetch('ogrenciler.json')
    .then(response => response.json())
    .then(sonuc =>{
        let cikti = '';
        sonuc.forEach(ogr=>{
            cikti +='ogrenci adi'+ogr.ad+'id:'+ogr.id
        })
        sonucDiv.innerText=cikti;
    })
}

function getText(e){
    e.preventDefault();

   fetch('deneme1.txt')
   .then(response => response.text())
   .then(sonuc => sonucDiv.innerText=sonuc)
   .catch(hata=>console.log(hata));

  
     
}

function getJSONfromAPI(e){
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response =>response.json())
    .then(sonuc => ekranaYazdir(sonuc))
    
}
function ekranaYazdir(data){
    let cikti ='';
    data.forEach(user=>{
        cikti += '<li>'+user.name+'</li>'
    });
    sonucDiv.innerHTML=cikti;
}

function jsonVeriEkle(e){
    e.preventDefault();

    fetch('https://jsonplaceholder.typicode.com/posts',{
        method:'POST',
        body:JSON.stringify({
            title:'deneme',
            body:'body alanı',
            userId:5
        }),
        Headers:{'Content-Type':'application/json'}

    }).then(response=>response.json())
    .then(sonuc=>console.log(sonuc));
}