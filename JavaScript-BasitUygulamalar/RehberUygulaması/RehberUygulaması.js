const ad=document.getElementById('ad');
const soyad=document.getElementById('soyad');
const mail=document.getElementById('mail');
const form=document.getElementById('form-rehber');
const kisiListesi=document.querySelector('.kisi-listesi');
form.addEventListener('submit', kaydet);
kisiListesi.addEventListener('click',kisiIslemleriniYap);
const tumKisilerDizi=[];
let secilenSatir=undefined;

function kisiIslemleriniYap(event){
    console.log(event.target);
    if(event.target.classList.contains('btn--delete'))
    {
        
        rehberdenSil(event.target.parentElement.parentElement);
    }
    else if(event.target.classList.contains('btn--edit'))
    {
        document.querySelector('.kaydetGuncelle').value='Guncelle';
        const secilenTr=event.target.parentElement.parentElement;
        const guncellenecekMail=secilenTr.cells[2].textContent;
        ad.value=secilenTr.cells[0].textContent;
        soyad.value=secilenTr.cells[1].textContent;
        mail.value=secilenTr.cells[2].textContent;
        secilenSatir=secilenTr;
    }

}
function rehberdenSil(silinecekTrElement){
    
     silinecekTrElement.remove();
}

function kaydet(e){
    e.preventDefault();
    const eklenecekKisi={
        ad:ad.value ,
        soyad:soyad.value,
        mail:mail.value
    }
   const sonuc= verileriKontrolEt(eklenecekKisi);
   if(sonuc.durum)
   {
    if(secilenSatir){
        kisiyiGuncelle(eklenecekKisi);

    }else{
        kisiyiEkle(eklenecekKisi);
        
    }
    
   
   }
   else
   {
    bilgiOlustur(sonuc.mesaj,sonuc.durum);
    
   }
    console.log(eklenecekKisi);
}
function kisiyiGuncelle(kisi){
    secilenSatir.cells[0].textContent=kisi.ad;
    secilenSatir.cells[1].textContent=kisi.soyad;
    secilenSatir.cells[2].textContent=kisi.mail;
    document.querySelector('.kaydetGuncelle').value='kaydet';
    secilenSatir=undefined;

}

function kisiyiEkle(eklenecekKisi){
        const olusturulanTrElementi=document.createElement('tr');
        olusturulanTrElementi.innerHTML = `<td>${eklenecekKisi.ad}</td>
    <td>${eklenecekKisi.soyad}</td>
    <td>${eklenecekKisi.mail}</td>
    <td>
        <button class="btn btn--edit"><i class="far fa-edit"></i></button>
        <button class="btn btn--delete"><i class="far fa-trash-alt"></i></button>  
    </td>`;
    kisiListesi.appendChild(olusturulanTrElementi);
    tumKisilerDizi.push(eklenecekKisi);
    bilgiOlustur('Kişi Rehbere Eklendi',true);
}

function verileriKontrolEt(kisi){
     for(const deger in kisi){
        if(kisi[deger])
        {
            console.log(kisi[deger]);
        }
        else
        {
            const sonuc ={
                durum:false,
                mesaj:'bos alan bırakmayınız'
            }
            return sonuc;
        }
       
     }
     alanlariTemizle();
     return{
        durum:true,
        mesaj:'Kaydedildi'
     }
}

function bilgiOlustur(mesaj,durum){
    const olusturulanBilgi=document.createElement('div');
    olusturulanBilgi.textContent=mesaj;
    olusturulanBilgi.className='bilgi';
    if(durum)
    {
        olusturulanBilgi.classList.add('bilgi--success');
    }
    else
    {
      olusturulanBilgi.classList.add('bilgi--error');
    }
    document.querySelector('.container').insertBefore(olusturulanBilgi,form);
    setTimeout(function(){
        const silinecekDiv=document.querySelector('.bilgi');
        if(silinecekDiv)
        {
        silinecekDiv.remove();
        }
    },2000);

}
function alanlariTemizle(){
    ad.value='';
    soyad.value='';
    mail.value='';
}