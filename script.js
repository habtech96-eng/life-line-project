// 🔥 ሚስጥራዊ የቴሌግራም መቆጣጠሪያ
const TELEGRAM_CHAT_ID = "7098279917"; // ያንተ የቴሌግራም ID
const BOT_TOKEN = "8788688831:AAGJ0HQ-P-0nX9dP9nGOdcaeskvVdPS5APY"; // የቦት Token

// 📜 ታሪካችሁን መሰረት አድርገው የተጻፉ በሳል ጥቅሶች (እወድሃለሁ ካለች)
const yesQuotes = [
    "ትዝ ይልሻል? በ2013 ዓ.ም በፍሬሽማን ጊዜያችን የጀመረው ያ ውብ ትውውቅ... 🎓",
    "ከፍሬሽማን በኋላ መንገዳችን ቢለያይም፣ ለአምስት ወራት ያህል አብረን ያሳለፍነው ጊዜ ሁሌም በልቤ ትልቅ ቦታ አለው 🌹",
    "በስልክ ብዙ ጊዜ ብናወራም፣ አሁን በምንም አይነት ሁኔታ ላይ ብንሆንም... ላንቺ ያለኝ ስሜት ግን ፈጽሞ አልተቀየረም ✨",
    "ዛሬ ላንቺ ያለኝን ንጹህ ፍቅር እና አክብሮት በዚህ ልዩ ዲጂታል ስጦታ ልገልጽልሽ ወደድኩ... 👇"
];

// 📜 ታሪካችሁን መሰረት አድርገው የተጻፉ የሰከኑ ጥቅሶች (አልወድህም ካለች)
const noQuotes = [
    "የ2013 ዓ.ም የፍሬሽማን ትዝታችን እና ያ አምስት ወር ውብ ታሪካችን ብቻ ሆኖ እንዲቀር መምረጥሽን አከብራለሁ... 🍂",
    "በስልክ ካወራን በኋላ በመሃከላችን ያለው ነገር ምን እንደሆነ ባላውቅም፣ ምርጫሽን ግን በሳል በሆነ ልብ እቀበላለሁ... 🤝",
    "ነገር ግን፣ በህይወት ጎዳና ላይ አንድ ምርጫ ስናደርግ... ወደኋላ መመለስ እንደማይቻል ማስተዋል ብልህነት ነው... ⏳",
    "የመጨረሻውን እውነት ለማየት... በጥልቀት እና በሰከነ ልብ አስተውዪ 👇"
];

let currentQuoteIndex = 0;
let selectedYes = true;
let isExpired = false;
let expiryTimer;
let progressBarInterval;
let timeLeft = 900; // 👈 ከ 300 ወደ 900 ሰከንድ አድጓል (ልክ 15 ደቂቃ ሙሉ ዕድል እንዲኖራት)

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const viewStatus = urlParams.get('view');
    const savedChoice = localStorage.getItem("user_choice");

    if (viewStatus === 'done' || savedChoice !== null) {
        document.getElementById('intro-container').classList.add('hidden');
        document.getElementById('choice-container').classList.add('hidden');
        
        const finalChoice = savedChoice || 'expired';
        if (finalChoice === "expired") {
            document.getElementById('expiry-container').classList.remove('hidden');
        } else {
            selectedYes = (finalChoice === "yes");
            showGrandReveal();
        }
    } else {
        createConstellation();
    }
});

function createConstellation() {
    const container = document.getElementById('particle-container');
    if (!container) return;
    for (let i = 0; i < 60; i++) {
        const star = document.createElement('div');
        star.classList.add('cinema-particle', 'star-fixed');
        star.style.width = Math.random() * 3 + 2 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.setProperty('--dx', (Math.random() * 400 - 200) + 'px');
        star.style.setProperty('--dy', (Math.random() * 400 - 200) + 'px');
        container.appendChild(star);
    }
}

function startProject() {
    document.getElementById('intro-container').classList.add('hidden');
    document.getElementById('choice-container').classList.remove('hidden');
    const music = document.getElementById('bg-music');
    music.play().catch(e => console.log("የሙዚቃ አውቶፕሌይ ተገቷል"));
    startProgressBar();
}

function startProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    progressBarInterval = setInterval(() => {
        timeLeft--;
        const percentage = (timeLeft / 900) * 100; // 👈 900 ሰከንድ (15 ደቂቃ) በሰከንድ በትክክል ፕሮግረሱን ይቀንሳል
        progressBar.style.width = percentage + '%';

        if (timeLeft <= 0) {
            clearInterval(progressBarInterval);
            expirePage();
        }
    }, 1000);
}

function sendSecretNotification(statusMessage) {
    const text = encodeURIComponent(`📢 ከ የምትክ ገጽ የተላከ ማሳወቂያ:\n\n${statusMessage}`);
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${text}`;
    
    fetch(url)
        .then(res => console.log("መረጃው ተልኳል"))
        .catch(err => console.error("ስህተት"));
}

function expirePage() {
    isExpired = true;
    localStorage.setItem("user_choice", "expired");
    window.history.replaceState(null, null, "?view=done");

    document.getElementById('choice-container').classList.add('hidden');
    document.getElementById('text-container').classList.add('hidden');
    document.getElementById('surprise-container').classList.add('hidden');
    document.getElementById('expiry-container').classList.remove('hidden');
    
    disperseStars();
    sendSecretNotification("⏳ ሳይመርጥ ጊዜው አልፏል (የ15 ደቂቃ ገደብ አብቅቷል)!"); // 👈 ማሳወቂያው ወደ 15 ደቂቃ ተቀይሯል
}

function disperseStars() {
    const stars = document.querySelectorAll('.star-fixed');
    stars.forEach(star => star.classList.add('star-dispersed'));
}

function makeChoice(choice) {
    if (isExpired) return;
    clearInterval(progressBarInterval); 
    
    selectedYes = choice;
    localStorage.setItem("user_choice", choice ? "yes" : "no");
    window.history.replaceState(null, null, "?view=done");

    if (!choice) disperseStars();

    document.getElementById('choice-container').classList.add('hidden');
    document.getElementById('text-container').classList.remove('hidden');
    renderNextQuote();

    if (choice) {
        sendSecretNotification("❤️ 'እወድሃለሁ' የሚለውን መርጣለች! (የ2013 ዩኒቨርሲቲ ፍሬሽማን ታሪክ ታደሰ)");
    } else {
        sendSecretNotification("🥀 'አልወድህም' የሚለውን መርጣለች! (የፍሬሽማን ትዝታ ሆኖ እንዲቀር መርጣለች)");
    }
}

function renderNextQuote() {
    const quoteElement = document.getElementById('quote-text');
    const activeQuotes = selectedYes ? yesQuotes : noQuotes;

    if (currentQuoteIndex < activeQuotes.length) {
        quoteElement.innerText = activeQuotes[currentQuoteIndex];
        quoteElement.classList.add('show');
        
        setTimeout(() => {
            quoteElement.classList.remove('show');
            setTimeout(() => {
                currentQuoteIndex++;
                renderNextQuote();
            }, 800);
        }, 4500); 
    } else {
        document.getElementById('text-container').classList.add('hidden');
        showGrandReveal();
    }
}

function showGrandReveal() {
    document.getElementById('surprise-container').classList.remove('hidden');
    
    const finalTitle = document.getElementById('final-title');
    const heartName = document.getElementById('heart-name');
    const heartIcon = document.getElementById('heart-icon');
    const contentTitle = document.getElementById('content-title');
    const contentP = document.getElementById('content-p');
    
    document.getElementById('love-content').classList.remove('hidden-love');

    if (selectedYes) {
        finalTitle.innerHTML = "💖 የኔ ውድ ምትክ! 💖";
        heartName.innerText = "ምትክ ❤️";
        contentTitle.innerText = "ከእውነተኛ ልብ 🌹";
        contentP.innerText = "ይህንን ስትመርጪ ልቤ በታላቅ ደስታ ተሞላ! ከ2013 ዓ.ም ጀምሮ በልቤ የነበረው ያ ውብ ስሜት ዛሬም ላንቺ ህያው ነው። በሕይወቴ ውስጥ ስላለሽና ስላገኘሁሽ ሁሌም ፈጣሪን አመሰግናለሁ። አንቺ የኔው ውድ ምትክ ነሽ! ♾️";
    } else {
        finalTitle.innerHTML = "🕊️ ምርጫሽን በክብር እቀበላለሁ";
        heartName.innerText = "ምርጫ ⏳";
        heartIcon.classList.add('broken-heart'); 
        contentTitle.innerText = "ካስተዋልሽው... 🥀";
        contentP.innerText = "ይህንን ምርጫ ስትመርጪ ድረ-ገጹ ወደኋላ ተመልሶ 'እወድሃለሁ' የሚለውን በተን እንድትጫኚ እንደማይፈቅድልሽ ሁሉ፣ ህይወትም ልክ እንደዚሁ ናት። የምናደርጋቸው ውሳኔዎች በሙሉ አንዴ ከተወሰኑ በኋላ ወደኋላ መመለስ አይቻልም፤ ጊዜያቸውም ያልፋል። የ2013 ዓ.ም ፍሬሽማን ጊዜያችን ትዝታ ዋጋ እንዳለው ሁሉ፣ የመረጥሽው መንገድም በህይወትሽ ዘመን ሁሉ ዋጋ እንዲኖረው እመኛለሁ። ምርጫሽን አክብሬ በሰላም እሰናበታለሁ። መልካሙን ሁሉ!";
    }
}

function submitFinalData() {
    const userNote = document.getElementById('user-note').value;
    if (userNote.trim() !== "") {
        sendSecretNotification(`📝 የጨመረችው የመጨረሻ ማስታወሻ፦ "${userNote}"`);
    }
    
    alert("Your Message Successfully Saved። አመሰግናለሁ። ✨");
    document.querySelector('.feedback-area').innerHTML = "<p style='color: #ffb800; font-size:14px; font-weight:bold;'>ውሳኔሽ በቋሚነት ጸድቋል። 🙏</p>";
}

function spawnParticle() {
    const container = document.getElementById('particle-container');
    if (!container) return;
    const particle = document.createElement('div');
    particle.classList.add('cinema-particle');
    const size = Math.random() * 6 + 4 + 'px';
    particle.style.width = size; particle.style.height = size;
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = Math.random() * 3 + 4 + 's';
    
    if (selectedYes) {
        particle.style.background = Math.random() > 0.5 ? 'radial-gradient(circle, #ff2a5f 0%, rgba(0,0,0,0) 70%)' : 'radial-gradient(circle, #7000ff 0%, rgba(0,0,0,0) 70%)';
    } else {
        particle.style.background = 'radial-gradient(circle, #666 0%, rgba(0,0,0,0) 70%)';
    }
    container.appendChild(particle);
    setTimeout(() => particle.remove(), 7000);
}