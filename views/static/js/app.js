var navbar=document.querySelector('#h');
var menicon=document.querySelector('.menicon');
var cross=document.querySelector('#t');
var menuLine=document.querySelectorAll('.line');


menicon.addEventListener('click', ()=>{
    cross.classList.toggle('two');
    navbar.classList.toggle('hide');
    menuLine[0].classList.toggle('rotate');
    menuLine[1].classList.toggle('rotate1');
});
