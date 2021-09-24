var navbar=document.querySelector('#h');
var menicon=document.querySelector('.menicon');
var cross=document.querySelector('#t');
var menuLine=document.querySelectorAll('.line');
var button=document.querySelector('.b'), i=0;
var confirmBox=document.querySelector('.confirm');
var yes=document.querySelector('.yes'), val;
var no=document.querySelector('.no');
var success=document.querySelector('.success');


menicon.addEventListener('click', ()=>{
    cross.classList.toggle('two');
    navbar.classList.toggle('hide');
    menuLine[0].classList.toggle('rotate');
    menuLine[1].classList.toggle('rotate1');
});

button.addEventListener('click', ()=>{
    if(i==0){
        confirmBox.style.display='flex', i=1;
        val=button.getAttribute('value');
        val="buy?id="+val;
        yes.setAttribute('href', val);
    }
    else confirmBox.style.display='none', i=0;
});

no.addEventListener('click', ()=>{
    confirmBox.style.display='none', i=0;
});

yes.addEventListener('click', ()=>{
    confirmBox.style.display='none', i=0;
    success.style.display='flex';
    setTimeout(()=>{
        success.style.display='none';
    }, 2000);
});

