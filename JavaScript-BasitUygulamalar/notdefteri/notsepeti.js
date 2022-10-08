const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');

yeniGorevEkleBtn.addEventListener('click',gorevEkle);
gorevListesi.addEventListener('click',gorevSilTamamla);
function gorevSilTamamla(e){
const tiklanilanElaman=e.target;
if(tiklanilanElaman.classList.contains('gorev-tamamlandi')){
    console.log('check tıklandi');
    tiklanilanElaman.parentElement.classList.toggle('gorev-tamamlandi');
}
if(tiklanilanElaman.classList.contains('gorev-sil')){
    console.log('sil tıklandı');
    tiklanilanElaman.parentElement.classList.toggle('kaybol');
    tiklanilanElaman.parentElementaddEventListener('transition',function(){
        tiklanilanElaman.parentElement.remove();
    });
   
}
}

function gorevEkle(e){
    e.preventDefault();
    //div oluşturma
    const gorevDiv= document.createElement('div');
    gorevDiv.classList.add('gorev-item');
    //li oluşturma
    const gorevLi= document.createElement('li');
    gorevLi.classList.add('gorev-tanim');
    gorevLi.innerText=yeniGorev.value;
    gorevDiv.appendChild(gorevLi);
    //tamamlandı butonu ekle
    const gorevTamamlandi = document.createElement('button');
    gorevTamamlandi.classList.add('gorev-btn');
    gorevTamamlandi.classList.add('gorev-tamamlandi');
    gorevTamamlandi.innerHTML='<i class="far fa-check-square" ></i>';
    gorevDiv.appendChild(gorevTamamlandi);

    const gorevSil = document.createElement('button');
    gorevSil.classList.add('gorev-btn');
    gorevSil.classList.add('gorev-sil');
    gorevSil.innerHTML='<i class="far fa-trash-alt" ></i>';
    gorevDiv.appendChild(gorevSil);
    yeniGorev.value = '';
    //ul'e oluşturduğumuz divi ekleyelim
    gorevListesi.appendChild(gorevDiv);
}