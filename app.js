(() => {
  const WA = '584267084400';
  const packs = [...document.querySelectorAll('.pack')];
  const uid = document.getElementById('uid');
  const payBtn = document.getElementById('payBtn');
  const error = document.getElementById('error');
  const selectedPack = document.getElementById('selectedPack');
  const selectedAmount = document.getElementById('selectedAmount');
  let selected = null;

  function validUID(){ return /^\d{6,12}$/.test(uid.value.trim()); }
  function updateButton(){ payBtn.disabled = !(selected && validUID()); }
  function orderId(){ return 'AR' + Date.now().toString().slice(-8) + Math.floor(10+Math.random()*90); }
  function history(){ try{return JSON.parse(localStorage.getItem('arisee_orders')||'[]')}catch{return[]} }
  function saveOrder(o){ const h=history(); h.unshift(o); localStorage.setItem('arisee_orders',JSON.stringify(h.slice(0,10))); }

  packs.forEach(p => p.addEventListener('click', () => {
    packs.forEach(x=>x.classList.remove('selected-pack'));
    p.classList.add('selected-pack');
    selected = {diamonds:p.dataset.diamonds, amount:p.dataset.amount, mrp:p.dataset.mrp, tag:p.dataset.tag};
    selectedPack.textContent = `${selected.diamonds} Diamonds`;
    selectedAmount.textContent = selected.amount;
    updateButton();
    document.getElementById('checkout').scrollIntoView({behavior:'smooth',block:'start'});
    setTimeout(()=>uid.focus(),350);
  }));

  uid.addEventListener('input',()=>{uid.value=uid.value.replace(/\D/g,'').slice(0,12); error.textContent=''; updateButton();});

  payBtn.addEventListener('click',()=>{
    if(!selected){ error.textContent='Please choose a package first.'; return; }
    if(!validUID()){ error.textContent='Please enter a valid Free Fire UID (6–12 digits).'; uid.focus(); return; }

    const o = {
      orderId: orderId(),
      uid: uid.value.trim(),
      pack: selected.diamonds,
      amount: selected.amount,
      time: new Date().toLocaleString()
    };
    saveOrder(o);

    const message = `Hi ARISEE, I want to buy diamonds.\n\nOrder ID: ${o.orderId}\nFree Fire UID: ${o.uid}\nPackage: ${o.pack} Diamonds\nAmount: ${o.amount}\nOrder Time: ${o.time}\n\nPlease send the payment QR code.`;
    const url = `https://wa.me/${WA}?text=${encodeURIComponent(message)}`;
    window.location.href = url;
  });
})();
