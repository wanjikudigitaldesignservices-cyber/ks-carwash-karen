document.addEventListener('DOMContentLoaded',()=>{
    const navbar=document.getElementById('navbar');
    window.addEventListener('scroll',()=>navbar.classList.toggle('scrolled',window.scrollY>50));
    const ham=document.getElementById('hamburger'),links=document.getElementById('navLinks');
    ham.addEventListener('click',()=>{ham.classList.toggle('active');links.classList.toggle('active')});
    links.querySelectorAll('.nav-link').forEach(l=>l.addEventListener('click',()=>{ham.classList.remove('active');links.classList.remove('active')}));
    const obs=new IntersectionObserver(e=>e.forEach(en=>{if(en.isIntersecting)en.target.classList.add('visible')}),{threshold:0.1});
    document.querySelectorAll('.svc-card,.bat-card,.menu-card,.combo-card,.c-card,.pillar').forEach(el=>{el.classList.add('fade-in');obs.observe(el)});
    document.getElementById('washForm').addEventListener('submit',e=>{
        e.preventDefault();const d=Object.fromEntries(new FormData(e.target));d.id=Date.now();d.submittedAt=new Date().toISOString();d.status='New';d.type='carwash';
        const all=JSON.parse(localStorage.getItem('ks_cw_bookings')||'[]');all.push(d);localStorage.setItem('ks_cw_bookings',JSON.stringify(all));
        e.target.reset();document.getElementById('carwashBooking').style.display='none';showToast('✅ Carwash booked! See you soon.');
    });
});
function bookWash(service){document.getElementById('washService').value=service;document.getElementById('carwashBooking').style.display='block';document.getElementById('carwashBooking').scrollIntoView({behavior:'smooth'})}
function showToast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),4000)}
window.bookWash=bookWash;
