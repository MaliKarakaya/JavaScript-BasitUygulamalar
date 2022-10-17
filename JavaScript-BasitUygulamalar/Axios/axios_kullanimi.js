const getBtn = document.getElementById('get');
const postBtn = document.getElementById('post');
const putPatchBtn = document.getElementById('put-patch');
const deleteBtn = document.getElementById('delete');
const ayniAndaIstekBtn = document.getElementById('ayni-anda-istek');
const headersBtn = document.getElementById('headers');
const hataBtn = document.getElementById('hata');

getBtn.addEventListener('click',getdata);
postBtn.addEventListener('click',postData);
putPatchBtn.addEventListener('click',putPatchData);
deleteBtn.addEventListener('click',deleteItem)
ayniAndaIstekBtn.addEventListener('click',ayniAndaIstekData);
headersBtn.addEventListener('click',customHeader);
hataBtn.addEventListener('click',hataIslemleri);

function getdata(){
    axios({
        method:'GET',
        url:'https://jsonplaceholder.typicode.com/users'
    }).then(response=> sonucuEkranaYazdir(response))
    .catch(hata=> console.log(hata))
    .then(()=>console.log("get isteği tamamlandı"));
    
}

function postData(){
    axios.post('https://jsonplaceholder.typicode.com/users', {
        name: 'Muhammet Ali Karakaya',
        username: 'MaliKarakaya',
        email : 'eada@asdasd.com'
    }).then(response => sonucuEkranaYazdir(response))
        .catch(hata => console.log(hata));
}

function putPatchData(){
    axios.patch('https://jsonplaceholder.typicode.com/users/1', {
       
        email : 'eada@asdasd.com'
    }).then(response => sonucuEkranaYazdir(response))
    .catch(hata => console.log(hata));
}

function deleteItem(){
    axios.delete('https://jsonplaceholder.typicode.com/users/1')
    .then(response => sonucuEkranaYazdir(response))
    .catch(hata => console.log(hata));
}

function ayniAndaIstekData(){
    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/users?_limit=1'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=1'),
    ]).then(axios.spread((kullanicilar, postlar) => {
        console.log(kullanicilar.data);
        console.log(postlar.data);
        sonucuEkranaYazdir(kullanicilar);
    }))
}

function customHeader(){
    axiosNesnesi.get('/users').then(response => console.log(response));

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'sizintokendegeriniz'
        }
    }
    axios.post('https://jsonplaceholder.typicode.com/users', {
        name: 'Muhammet Ali Karakaya',
        username: 'MaliKarakaya',
        email : 'eada@asdasd.com'
    }, config).then(response => sonucuEkranaYazdir(response))
        .catch(hata => console.log(hata));
}

function hataIslemleri(){
    axios('https://jsonplaceholder.typicode.com/userssss?_limit=1')
    .then(response => sonucuEkranaYazdir(response))
    .catch(hata => hatayiYazdir(hata))
    .then(() => console.log('get isteği tamamlandı'))
}

function hataYazdir(error){
    console.log(error);
    document.querySelector(".sonuc").innerHTML='<div class="notification is-info"> <div class="columns is-mobile is-vcentered"><div class="column"><h1 class="subtitle">Sonuc</h1></div><div class="column"><h1 class="title">'+error+'</h1></div></div></div>';
}
function sonucuEkranaYazdir(response) {
    document.querySelector('.sonuc').innerHTML = `
    <div class="notification is-info">
    <div class="columns is-mobile is-vcentered">
        <div class="column"><h1 class="subtitle">Sonuc</h1></div>
        <div class="column"><h1 class="title">${response.status}</h1></div>
    </div>
    </div>



    <div class="section">
        <article class="message is-success">
            <div class="message-header">
                <p>Header</p>
            </div>
            <div class="message-body has-background-white has-text-dark">
            <pre>${JSON.stringify(response.headers, null, 4)}</pre>
            </div>
        </article>
    </div>


    <div class="section">
        <article class="message is-warning">
            <div class="message-header">
                <p>Data</p>
            </div>
            <div class="message-body has-background-white has-text-dark">
            <pre>${JSON.stringify(response.data, null, 4)}</pre>
            </div>
        </article>
    </div>


    <div class="section">
        <article class="message is-primary">
            <div class="message-header">
                <p>Config</p>

            </div>
            <div class="message-body has-background-white has-text-dark">
            <pre>${JSON.stringify(response.config, null, 4)}</pre>
            </div>
        </article>
    </div>`;
}