let musicStarted = false;
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const messages = [
  'Satu ketemu! Kalau nyari barang di rumah seteliti ini, pasti nggak ada yang hilang. 👀',
  'Nahhh, kelopak kedua! Jangan-jangan bakat detektifmu baru muncul sekarang. WKWK.',
  'Ciee, mulai jeli. Tapi jangan senang dulu, masih ada yang nyamar jadi dekorasi. 🌿',
  'Empat! Tinggal dua. Semangat, bocil pencari bunga. Jangan malah sibuk lihat kupu-kupu. 🦋',
  'Wih, tinggal satu! Desti sedang mengawasi dari kejauhan. Jangan curang ya. 😏',
  'SEMUA KETEMU! Taman aman, detektif lulus. Hadiahmu: boleh lanjut ke episode berikutnya. 🌻'
];
const letters = [
  ['Open when you miss me', 'Kalau kangen, jangan cuma lihat chat lama. Bilang aja. Aku mungkin balas “utuuutuu cayangg” sambil sok jual mahal. WKWK. 🤍'],
  ['Open when you are tired', 'Aigoo bocil besar, istirahat dulu. Kamu nggak harus menyelesaikan semuanya hari ini. Kalau butuh teman cerita atau bantuan, coba bilang ya. Aku juga akan berusaha ada.'],
  ['Open when you need a smile', 'Coba ingat adegan Warmindo itu. Dua orang diem-dieman, terus netesin air mata di tempat umum. Kalau ada yang lihat mungkin bingung: ini pesen makan apa syuting drama? 😭']
];
let found = new Set(); let selectedAnswer = null; let questionIndex = 0; let musicOn = false; let audioCtx = null;
const questions = [
  {q:'Kalau lagi gemas, bahasa bocil andalan kita apa?',a:['Uluhuluuh bocil','Utuuutuu cayangg','Aigoo'],correct:0,why:'ULUHULUUH BOCIL😭 Bahasa bayi eksklusif untuk dua orang dewasa ini. WKWK.'},
  {q:'Tempat yang dulu sering jadi lokasi nugas bareng?',a:['Matto Kopi','Coklat coffee','Sachi'],correct:2,why:'BETULL! Kafe Sachi. Semoga yang dikerjakan bukan cuma tugas, tapi juga membangun chemistry. 📚'},
  {q:'Kalau lagi bingung mau makan apa, salah satu jawaban aman kita adalah…',a:['Indomie','Nasi goreng','Ayam rock burger'],correct:1,why:'NASI GORENG LAGI NASI GORENG LAGI 🍳 Rapat penentuan makanan resmi ditutup.'}
];
function showModal(title,text){$('#modalTitle').textContent=title;$('#modalText').textContent=text;$('#modal').classList.add('show')}
function closeModal(){$('#modal').classList.remove('show')}
// Page navigation is initialized below.
$('#modalClose').addEventListener('click',closeModal);$('#modalOk').addEventListener('click',closeModal);$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});
$$('[data-petal]').forEach(petal=>petal.addEventListener('click',()=>{const i=Number(petal.dataset.petal);if(found.has(i))return;found.add(i);petal.classList.add('collected');petal.disabled=true;$('.petal-count').textContent=`${found.size} / 6 kelopak ditemukan`;$('#progressFill').style.width=`${found.size/6*100}%`;$('#petalMessage').innerHTML=`<span>✿</span><p>${messages[i]}</p>`;if(found.size===6){$('#petalMessage').innerHTML='<span>🌻</span><p>SEMUA KETEMU! Taman aman, detektif lulus. Desti bangga… walau tadi sempat curiga kamu bakal nyerah. WKWK. 😭</p>';setTimeout(()=>showModal('TAMAN BERHASIL DISELAMATKAN! 🌻','Enam kelopak berhasil ditemukan di antara semua dekorasi. Oke, detektif, sekarang kamu boleh lanjut!'),350)}else toast(['Nah, satu ketemu! Masih ada yang ngumpet. 👀','Ciee, mata elang. Cari lagi, bocil!','Satu lagi aman. Jangan terkecoh dekorasi ya.','Wih, sudah empat! Jangan lengah.','Tinggal satu, masa mau menyerah sekarang?'][found.size-1])}));
function renderQuestion(){const q=questions[questionIndex];$('#question').textContent=q.q;$('#quizStep').textContent=`Pertanyaan ${questionIndex+1}`;$('#answers').innerHTML='';selectedAnswer=null;$('#quizFeedback').textContent='Jawab jujur. Desti punya CCTV kenangan. 👀';$('#nextQuestion').disabled=true;q.a.forEach((a,i)=>{const b=document.createElement('button');b.className='answer';b.textContent=a;b.addEventListener('click',()=>{if(selectedAnswer!==null)return; if(i===q.correct){selectedAnswer=i;b.classList.add('selected');$('#quizFeedback').textContent=q.why;$('#nextQuestion').disabled=false;}else{b.classList.add('wrong');$('#quizFeedback').textContent=['Aigoo kamu gimana cii 😭 Coba inget lagi!','Yakin nih? Jangan bikin Desti kecewa dulu dong. WKWK 🤨','Salah bestieee. Tarik napas, buka folder kenangan di otak. 🧠'][Math.floor(Math.random()*3)];}});$('#answers').appendChild(b)})}
$('#nextQuestion').addEventListener('click',()=>{if(selectedAnswer===null)return;if(questionIndex<questions.length-1){questionIndex++;renderQuestion()}else{showModal('Quiz selesai! 🏆','LULUS! Sertifikat pasangan cukup update resmi diberikan. Hadiah: bebas pilih film komedi berikutnya. Tapi jangan pilih yang durasinya 4 jam ya. 🌻');completePage('Quiz clear! You know your story 💛');questionIndex=0;renderQuestion()}});renderQuestion();
$$('.envelope').forEach(btn=>btn.addEventListener('click',()=>{const [title,text]=letters[Number(btn.dataset.letter)];showModal(title,text)}));
$('#hugBtn').addEventListener('click',()=>{const el=$('#hugResult');el.textContent='(づ｡◕‿‿◕｡)づ  PELUKKKK!';for(let i=0;i<18;i++){const h=document.createElement('span');h.textContent=['♡','✿','♥','✦'][i%4];h.style.cssText=`position:fixed;left:${Math.random()*100}vw;top:${Math.random()*80+10}vh;font-size:${16+Math.random()*20}px;color:${['#e8b9bd','#e6a83c','#fff1dc'][i%3]};z-index:40;pointer-events:none;animation:pop 1.3s ease forwards`;document.body.appendChild(h);setTimeout(()=>h.remove(),1300)}});
function toast(text){const t=$('#toast');t.textContent=text;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1700)}
// GAME PROGRESSION: each chapter unlocks only after its mission is complete.
const pageOrder = ['home','flight-game','story','game','little-things','quiz','origin-story','memory-game','gallery','music-page','riddle-game','letters','message','finale'];
const pages = pageOrder.map(id => document.getElementById(id));
if (pages.some(page => !page)) throw new Error('Ada halaman perjalanan yang tidak ditemukan. Periksa ID section di index.html.');
// Keep the visible DOM order and unlock progression in sync.
let currentPage = 0;
const completed = new Set();
const unlocked = new Set([0]);
const nav = document.createElement('nav');
nav.className = 'page-nav';
nav.setAttribute('aria-label','Navigasi game anniversary');
nav.innerHTML = '<button class="prev" type="button">← Kembali</button><button class="next" type="button" disabled>Mulai ☀</button>';
document.body.appendChild(nav);

// GAME BACKGROUND MUSIC — loops only on game pages
const gameBackgroundMusic = document.getElementById('gameBackgroundMusic');
const gameMusicToggle = document.getElementById('gameMusicToggle');
let gameMusicMuted = false;
const gamePageIds = new Set(['flight-game', 'game', 'quiz', 'memory-game', 'riddle-game']);

function updateGameMusicForCurrentPage() {
  if (!gameBackgroundMusic) return;
  const isGamePage = gamePageIds.has(pages[currentPage]?.id);
  if (isGamePage && !gameMusicMuted) {
    gameBackgroundMusic.play().catch(() => {
      // Autoplay may wait until the visitor interacts with the page.
    });
  } else {
    gameBackgroundMusic.pause();
    gameBackgroundMusic.currentTime = 0;
  }
}

if (gameBackgroundMusic) {
  gameBackgroundMusic.loop = true;
  gameBackgroundMusic.volume = 0.32;
}

if (gameMusicToggle && gameBackgroundMusic) {
  gameMusicToggle.addEventListener('click', () => {
    gameMusicMuted = !gameMusicMuted;
    gameBackgroundMusic.muted = gameMusicMuted;
    gameMusicToggle.classList.toggle('muted', gameMusicMuted);
    gameMusicToggle.textContent = gameMusicMuted ? '♪' : '♫';
    gameMusicToggle.setAttribute('aria-pressed', String(!gameMusicMuted));
    gameMusicToggle.setAttribute('aria-label', gameMusicMuted ? 'Nyalakan musik game' : 'Matikan musik game');
    gameMusicToggle.title = gameMusicMuted ? 'Nyalakan musik game' : 'Matikan musik game';
    if (!gameMusicMuted) updateGameMusicForCurrentPage();
  });
}
function refreshNav(){
  nav.querySelector('.prev').disabled = currentPage === 0;

  const next = nav.querySelector('.next');
  const isMusicPage = pages[currentPage]?.id === 'music';

  const canContinue = completed.has(currentPage) ||
                      currentPage === 0 ||
                      (isMusicPage && musicStarted);

  next.disabled = !canContinue;

  next.textContent = currentPage === 0
    ? 'Mulai ☀'
    : currentPage === pages.length - 1
      ? 'Finish ♡'
      : canContinue
        ? 'Lanjut ☀'
        : 'Selesaikan misi';
}
function goToPage(index){
  if(pages[currentPage]?.id==='music-page' && index!==currentPage){const audioEl=document.getElementById('anniversaryAudio');const playBtn=document.getElementById('trackPlay');if(audioEl){audioEl.pause();if(playBtn)playBtn.innerHTML='▶ Putar lagu <span>♫</span>';}}
  if(!unlocked.has(index)){toast('Eits, belum bisa kabur! Misi ini diselesaikan dulu, Tuan Farel. 😤');return}
  currentPage=index;
  pages.forEach((page,i)=>{
    page.classList.toggle('page-active',i===currentPage);
    page.setAttribute('aria-hidden',i===currentPage?'false':'true');
  });
  refreshNav();
  updateGameMusicForCurrentPage();
  window.scrollTo({top:0,behavior:'smooth'});
}
function completePage(message='Chapter clear! Sunshine +1 ☀'){
  if(completed.has(currentPage))return;
  completed.add(currentPage);
  const nextIndex=currentPage+1;
  if(nextIndex<pages.length)unlocked.add(nextIndex);
  refreshNav();
  toast(message);
  burstSunshine();
}
function burstSunshine(){
  for(let i=0;i<18;i++){
    const el=document.createElement('span');
    el.textContent=['✦','🌼','☀','✿'][i%4];
    el.className='sun-confetti';
    el.style.left=(Math.random()*90+5)+'vw';
    el.style.top=(Math.random()*70+10)+'vh';
    el.style.animationDelay=(Math.random()*.3)+'s';
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),1800);
  }
}
nav.querySelector('.prev').addEventListener('click',()=>goToPage(currentPage-1));
nav.querySelector('.next').addEventListener('click',()=>{
  if(currentPage===0){$('#startBtn').click();return}
  if(currentPage===pages.length-1){showModal('Our sunshine story continues ☀','Terima kasih sudah menyelesaikan perjalanan kecil ini. Selamat anniversary kedua, Sayang. Semoga hari-hari kita selalu punya cahaya. 🌻');return}
  if(!completed.has(currentPage)){toast('Mau lanjut ke mana? Misinya aja belum kelar, bosku. WKWK 😭');return}
  goToPage(currentPage+1);
});
$('#startBtn').addEventListener('click',()=>{completePage('GASSS! Jangan cuma jago di loading screen. ☀');goToPage(1)});
document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();goToPage(0)});

// Chapters with a simple story mission need an explicit "I read it" action.
const storyMissions={
  'story':['Flashback KOMA–TEBAS','Satu plot twist sudah dibuka. Kalau sudah selesai nostalgia, lanjut ke misi berikutnya.','Oke, lanjut. Jangan salting! ☀'],
  'origin-story':['Sidang nama kontak','Akui saja, emoji 🌻 itu sekarang punya makna khusus.','Iya, aku inget kok! 🌻'],
  'little-things':['Sitcom kita','Setiap hubungan punya episode random. Yang ini jangan di-skip, sutradaranya Desti.','HAHA, lanjut episode berikutnya! 🤍'],
  'message':['Surat khusus buat kamu','Baca pelan-pelan. Ini bukan syarat dan ketentuan aplikasi.','Suratnya selesai dibaca ♡']
};
Object.entries(storyMissions).forEach(([id,content])=>{
  const page=document.getElementById(id);
  if(!page)return;
  const box=document.createElement('div');
  box.className='chapter-mission';
  const [title,desc,cta]=content;
  box.innerHTML=`<span>☀</span><div><b>${title}</b><small>${desc}</small></div><button type="button">${cta}</button>`;
  page.appendChild(box);
  box.querySelector('button').addEventListener('click',()=>completePage('NAHHH, satu episode beres! Boleh lanjut, Tuan Farel. 🌻'));
});

// Flower hunt: collect all six hidden petals before unlocking the next story chapter.
const originalPetalCount=found;
function checkPetalMission(){
  if(found.size===6)completePage('Enam kelopak ditemukan! Detektif taman naik pangkat. 🌻');
}
// Attach a second observer via click delegation, after the existing game handler.
$$('[data-petal]').forEach(card=>card.addEventListener('click',()=>setTimeout(checkPetalMission,20)));

// Photo museum: tap every polaroid to stamp it as viewed.
let photosViewed=new Set();
$$('.gallery-item').forEach((photo,i)=>{
  photo.style.cursor='pointer';
  photo.addEventListener('click',()=>{
    photosViewed.add(i);
    photo.classList.add('photo-stamped');
    const cap=photo.querySelector('figcaption');
    if(cap && !cap.dataset.original){cap.dataset.original=cap.textContent;cap.textContent='✓ memory saved';}
    if(photosViewed.size===4)completePage('Semua bukti sudah diperiksa. Tidak ada kenangan yang boleh di-skip! 📸');
    else toast('Bukti kenangan ditemukan. Silakan senyum-senyum sendiri. 📸');
  });
});

// Open all three secret letters to unlock the anniversary letter.
let lettersOpened=new Set();
$$('.envelope').forEach((btn,i)=>{
  btn.addEventListener('click',()=>{
    lettersOpened.add(i);
    btn.classList.add('opened');
    if(lettersOpened.size===3)completePage('Semua surat terbuka! Jangan sok cool, aku tahu kamu senyum. 💌');
  });
});
$('#hugBtn').addEventListener('click',()=>completePage('PELUK TERKIRIM! Tidak menerima komplain, wajib dibalas. ☀'));
goToPage(0);

// MUSIC PLAYER: local MP3 file, starts only after the visitor presses the music button.
// Dedicated soundtrack page: audio is only playable from this page.
const anniversaryAudio=$('#anniversaryAudio');
const trackPlay=$('#trackPlay');
const musicSeek=$('#musicSeek');
const musicVolume=$('#musicVolume');
const musicCurrent=$('#musicCurrent');
const musicDuration=$('#musicDuration');
const musicStatus=$('#musicStatus');
function formatMusicTime(value) {
  if (!Number.isFinite(value)) return '0:00';
  const m = Math.floor(value / 60);
  const s = Math.floor(value % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

if (anniversaryAudio && trackPlay) {
  anniversaryAudio.volume = Number(musicVolume?.value || 0.75);

  trackPlay.addEventListener('click', async () => {
    if (anniversaryAudio.paused) {
      try {
        await anniversaryAudio.play();
      
        musicStarted = true;
        completed.add(currentPage);
        unlocked.add(currentPage + 1);
      
        refreshNav();
      
        trackPlay.innerHTML = 'Ⅱ Jeda lagu <span>♫</span>';
        musicStatus.textContent = 'Yeay, soundtrack kita mulai diputar. ♡';
      
      } catch (err) {
        musicStatus.textContent = 'File lagu belum tersedia. Tambahkan assets/audio/1000x.mp3 dulu ya.';
        showModal(
          'Lagunya belum dipasang 🎵',
          'Masukkan file MP3 1000X yang kamu punya izin untuk gunakan ke folder assets/audio/ dengan nama 1000x.mp3.'
        );
      }
    } else {
      anniversaryAudio.pause();
      trackPlay.innerHTML = '▶ Putar lagu <span>♫</span>';
      musicStatus.textContent = 'Lagu dijeda. Lanjut kapan saja, sayang.';
    }
  });

  anniversaryAudio.addEventListener('loadedmetadata', () => {
    musicDuration.textContent = formatMusicTime(anniversaryAudio.duration);
  });

  anniversaryAudio.addEventListener('timeupdate', () => {
    musicCurrent.textContent = formatMusicTime(anniversaryAudio.currentTime);

    if (Number.isFinite(anniversaryAudio.duration) && anniversaryAudio.duration > 0) {
      musicSeek.value = (anniversaryAudio.currentTime / anniversaryAudio.duration) * 100;
    }
  });

  anniversaryAudio.addEventListener('ended', () => {
    trackPlay.innerHTML = '▶ Putar lagi <span>♫</span>';
  });

  musicSeek?.addEventListener('input', () => {
    if (Number.isFinite(anniversaryAudio.duration)) {
      anniversaryAudio.currentTime = (Number(musicSeek.value) / 100) * anniversaryAudio.duration;
    }
  });

  musicVolume?.addEventListener('input', () => {
    anniversaryAudio.volume = Number(musicVolume.value);
  });
}

// SUNFLOWER MEMORY MATCH: six pairs.
const matchSymbols=['♟️','🍜','🤍','🍨','🌻','🎮','♟️','🍜','🤍','🍨','🌻','🎮'];
let matchDeck=[],openedCards=[],matchedCards=new Set(),moves=0,matchLocked=false;
function shuffleMatch(){
  matchDeck=[...matchSymbols].sort(()=>Math.random()-.5);
  openedCards=[];matchedCards=new Set();moves=0;matchLocked=false;
  $('#matchMoves').textContent='Moves: 0';$('#matchPairs').textContent='Pairs: 0 / 6';
  $('#matchStatus').textContent='Ayo, Farel. Masa kalah sama kartu yang diem? 😭';
  $$('.memory-tile').forEach((tile,i)=>{tile.textContent='?';tile.classList.remove('revealed','matched');tile.disabled=false;tile.dataset.value=matchDeck[i]});
}
function chooseTile(tile){
  const i=Number(tile.dataset.card);
  if(matchLocked||matchedCards.has(i)||openedCards.includes(i))return;
  tile.textContent=tile.dataset.value;tile.classList.add('revealed');openedCards.push(i);
  if(openedCards.length===2){
    moves++;$('#matchMoves').textContent='Moves: '+moves;
    const [a,b]=openedCards;
    if(matchDeck[a]===matchDeck[b]){
      matchedCards.add(a);matchedCards.add(b);
      [a,b].forEach(n=>$$('.memory-tile')[n].classList.add('matched'));
      openedCards=[];$('#matchPairs').textContent='Pairs: '+(matchedCards.size/2)+' / 6';
      if(matchedCards.size===12){$('#matchStatus').textContent='PERFECT MATCH! Kayak kita. Eaaa. 🌻';completePage('Memory match cleared! +1 sunshine');}
      else $('#matchStatus').textContent=['Nahh, satu pasangan ketemu! Otak masih berfungsi. 😌','Wih, kompak juga kartunya. Lanjut! ✨','Ciee, mulai hafal. Jangan sombong dulu. 😏'][Math.floor(Math.random()*3)];
    }else{
      matchLocked=true;$('#matchStatus').textContent=['Aigoo, bukan jodohnya itu 😭 Coba lagi!','Duh, mereka nggak cocok. Jangan dipaksa, ya. WKWK','Salah pasangan! Move on ke kartu lain. 😭'][Math.floor(Math.random()*3)];
      setTimeout(()=>{[a,b].forEach(n=>{const t=$$('.memory-tile')[n];t.textContent='?';t.classList.remove('revealed')});openedCards=[];matchLocked=false},650);
    }
  }
}
$$('.memory-tile').forEach(tile=>tile.addEventListener('click',()=>chooseTile(tile)));
$('#matchReset').addEventListener('click',shuffleMatch);
shuffleMatch();

// OUR LITTLE MEMORY CODE: answers are details from Desti & Farel's story.
const riddles=[
  {emoji:'🎮',q:'Game apa yang paling sering kita mainkan bareng?',a:['Monopoli','UNO','Kartu Remi'],correct:1,good:'YASSS! Magic Chess saksi strategi kita. Semoga ingatanmu nggak kena nerf. WKWK.',bad:'AIGOOO, bukan itu cii 😭 Coba buka lagi arsip mabar di kepala!'},
  {emoji:'🎬',q:'Film komedi yang sama-sama kita suka?',a:['Agak Laen','Gosh in the cell','Kang Mak'],correct:1,good:'Gosh in the cell! Akhirnya satu selera komedi yang nggak perlu debat panjang. 🤣',bad:'Lhooo, ini kan tontonan yang bikin kita sama-sama ketawa. Coba lagi!'},
  {emoji:'🤍',q:'Waktu kamu menyatakan cinta, aku pakai baju warna apa?',a:['Hitam','Pink','Putih'],correct:2,good:'PUTIHHH! Detail hari itu jangan sampai tertukar ya, Pak Farel. 🤍',bad:'Aigoo kamu gimana cii 😭 Putar ulang memorinya pelan-pelan!'},
  {emoji:'🍨',q:'Di mana lokasi kamu menyatakan cinta?',a:['Tempo Gelato — Prawirotaman','Tempo Gelato — Taman Siswa','Alun-alun Kidul'],correct:1,good:'TEMPO GELATO TAMAN SISWA! Tempat es krim, tempat plot twist. 🍨',bad:'SALAHH! Jangan sampai salah alamat di kenangan sendiri. 😭'}
];
let riddleIndex=0,riddleSolved=0;
function renderRiddle(){
  const r=riddles[riddleIndex];
  $('#riddleNumber').textContent='MEMORY CLUE '+String(riddleIndex+1).padStart(2,'0');
  $('#riddleScore').textContent=riddleSolved+' solved';
  $('#riddleEmoji').textContent=r.emoji;
  $('#riddleQuestion').textContent=r.q;
  $('#riddleAnswers').innerHTML='';
  // Reset the lock for each newly rendered riddle; otherwise later answers stay unclickable.
  $('#riddleAnswers').dataset.done='no';
  $('#riddleFeedback').textContent='Pakai insting, jangan pakai feeling lapar. 👀';
  r.a.forEach((answer,i)=>{
    const b=document.createElement('button');
    b.type='button'; b.className='riddle-answer'; b.dataset.answer=String(i); b.textContent=answer;
    $('#riddleAnswers').appendChild(b);
  });
}
// Delegated click handling is more robust when the answer buttons are re-rendered.
$('#riddleAnswers').addEventListener('click',e=>{
  const button=e.target.closest('button');
  if(!button || !$('#riddleAnswers').contains(button))return;
  if(button.classList.contains('riddle-next')){
    riddleIndex++; renderRiddle(); return;
  }
  if(!button.classList.contains('riddle-answer') || $('#riddleAnswers').dataset.done==='yes')return;
  const r=riddles[riddleIndex];
  if(Number(button.dataset.answer)===r.correct){
    $('#riddleAnswers').dataset.done='yes';
    button.classList.add('correct'); riddleSolved++;
    $('#riddleScore').textContent=riddleSolved+' solved';
    $('#riddleFeedback').textContent=r.good || 'NAHHH BENAR! Memori kamu belum penuh ternyata. ☀';
    if(riddleIndex<riddles.length-1){
      const next=document.createElement('button'); next.type='button'; next.className='riddle-next'; next.textContent='Oke, lanjut! Aku masih ingat kok →';
      $('#riddleAnswers').appendChild(next);
    }else{
      $('#riddleFeedback').textContent='Wih, ternyata kamu masih nyimpen detail-detail ini. Desti kasih nilai A plus, sini tos dulu! ✋🌻';
      completePage('Sun code cracked! Puzzle master 🏆');
    }
  }else{
    button.classList.add('wrong');
    $('#riddleFeedback').textContent=r.bad || ['Aigoo kamu gimana cii 😭','Salahh! Desti mulai pasang muka manyun nih.','Coba lagi, jangan asal pencet. Ini ujian kenangan! 🤨'][Math.floor(Math.random()*3)];
  }
});
renderRiddle();


// FAREL'S SUNSHINE FLIGHT: fly through cloud gates and reach Desti.
(()=>{
  const canvas=$('#flightCanvas'); if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const W=canvas.width,H=canvas.height,worldEnd=2260;
  const gates=[{x:330,gapY:115},{x:650,gapY:245},{x:970,gapY:130},{x:1290,gapY:235},{x:1600,gapY:125},{x:1900,gapY:230}];
  const flowers=[{x:470,y:175},{x:1110,y:190},{x:1740,y:175}];
  let y=180,vy=0,world=0,playing=false,won=false,raf=0,collected=new Set(),last=0;
  const overlay=$('#flightOverlay');
  function reset(){y=180;vy=0;world=0;playing=false;won=false;collected=new Set();$('#flightDistance').textContent='READY TO FLY ✈';$('#flightStars').textContent='🌼 0 / 3';$('#flightStatus').textContent='Tiket sekali jalan menuju Desti. Pilot dilarang menyerah di tengah jalan. 🌻';overlay.classList.remove('hidden');overlay.querySelector('b').textContent='Pilot Farel, siap bertugas?';overlay.querySelector('small').textContent='Misi rahasia: lewati awan, ambil 3 bunga, lalu temui penumpang paling cerewet di garis akhir. Petunjuk: namanya Desti. 😌';$('#flightStart').textContent='Mulai terbang ↗';draw();}
  function start(){if(won)won=false;cancelAnimationFrame(raf);resetState();playing=true;last=performance.now();overlay.classList.add('hidden');raf=requestAnimationFrame(loop);}
  function resetState(){y=180;vy=0;world=0;collected=new Set();$('#flightStars').textContent='🌼 0 / 3';}
  function flap(){if(!playing)return;vy=-4.6;}
  function roundRect(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}
  function draw(){
    const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#fff9dc');g.addColorStop(1,'#ffe8a1');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(255,255,255,.68)';for(let i=0;i<8;i++){let x=((i*137-world*.22)%(W+100)+W+100)%(W+100)-40;let cy=55+(i%3)*92;ctx.beginPath();ctx.arc(x,cy,20,0,Math.PI*2);ctx.arc(x+22,cy-9,25,0,Math.PI*2);ctx.arc(x+48,cy,18,0,Math.PI*2);ctx.fill();}
    ctx.fillStyle='#e9c66d';ctx.beginPath();ctx.moveTo(0,H-28);for(let x=0;x<=W;x+=30)ctx.lineTo(x,H-30-Math.sin((x+world)*.012)*12);ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.fill();
    gates.forEach(gate=>{let x=gate.x-world+100;if(x<-80||x>W+80)return;ctx.fillStyle='#d4b46b';roundRect(x,0,54,gate.gapY-68,18);roundRect(x,gate.gapY+68,54,H-gate.gapY-68,18);ctx.fillStyle='#c49b49';ctx.fillRect(x+8,gate.gapY-76,38,8);ctx.fillRect(x+8,gate.gapY+68,38,8);});
    flowers.forEach((f,i)=>{if(collected.has(i))return;let x=f.x-world+100;if(x>-30&&x<W+30){ctx.font='27px serif';ctx.textAlign='center';ctx.fillText('🌻',x,f.y);}});
    ctx.save();ctx.translate(112,y);ctx.rotate(Math.max(-.45,Math.min(.45,vy*.07)));ctx.font='36px serif';ctx.textAlign='center';ctx.fillText('✈️',0,12);ctx.restore();
    const finishX=worldEnd-world+100;if(finishX<W+120){ctx.textAlign='center';ctx.font='44px serif';ctx.fillText('🌻',finishX,190);ctx.font='bold 13px sans-serif';ctx.fillStyle='#80540c';ctx.fillText('DESTI',finishX,220);}
    ctx.textAlign='left';ctx.fillStyle='rgba(116,83,20,.7)';ctx.font='11px sans-serif';ctx.fillText('FAREL → DESTI',18,24);
  }
  function crash(){playing=false;overlay.classList.remove('hidden');overlay.querySelector('b').textContent='LAH, NUBRUK 😭';overlay.querySelector('small').textContent='Aigoo Farel, awannya nggak salah apa-apa 😭 Coba lagi! Aku masih di ujung sana, nggak pindah alamat kok.';$('#flightStart').textContent='Coba lagi ↻';$('#flightStatus').textContent='Yahh, gagal mendarat dengan elegan. Tarik napas, pilot. Ulangi! ✈️';}
  function finish(){playing=false;won=true;overlay.classList.remove('hidden');overlay.querySelector('b').textContent='AKHIRNYA KETEMU JUGAAA! 🤍';overlay.querySelector('small').textContent='Penerbangan sukses! Hadiah sampai di tujuan: satu Desti, bonus peluk unlimited. Selamat datang, pilot kesayangan. WKWK.';$('#flightStart').textContent='Terbang lagi ☀';$('#flightStatus').textContent='MISSION COMPLETE — Farel berhasil menemukan Desti! 🌻';completePage('PILOT BERHASIL! Desti sudah ditemukan. Sekarang minta peluknya. ☀');}
  function loop(now){if(!playing)return;const dt=Math.min(2,(now-last)/16.67);last=now;vy+=.22*dt;y+=vy*dt;world+=2.05*dt;
    const px=112,py=y;if(py<18||py>H-18){crash();draw();return;}
    for(const gate of gates){const gx=gate.x-world+100;if(px+14>gx&&px-14<gx+54&&(py<gate.gapY-68+10||py>gate.gapY+68-10)){crash();draw();return;}}
    flowers.forEach((f,i)=>{const fx=f.x-world+100;if(!collected.has(i)&&Math.abs(fx-px)<27&&Math.abs(f.y-py)<34){collected.add(i);$('#flightStars').textContent=`🌼 ${collected.size} / 3`;toast('Satu bunga buat Desti! Jangan dimakan, simpan buat aku. 🌻');}});
    $('#flightDistance').textContent=`${Math.min(100,Math.floor(world/worldEnd*100))}% TO DESTI`;draw();if(world>=worldEnd-40){finish();draw();return;}raf=requestAnimationFrame(loop);
  }
  $('#flightStart').addEventListener('click',start);$('#flightRestart').addEventListener('click',reset);$('#flightUp').addEventListener('pointerdown',e=>{e.preventDefault();flap()});canvas.addEventListener('pointerdown',e=>{e.preventDefault();if(playing)flap()});window.addEventListener('keydown',e=>{if(e.code==='Space'&&currentPage===1){e.preventDefault();flap();}});reset();
})();