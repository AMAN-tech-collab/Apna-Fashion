// Apna Fashion website settings. Replace the phone number below with the real 10-digit number.
const SHOP_PHONE = "6203262787"; // Apna Fashion contact number
const COUNTRY_CODE = "91";

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

document.getElementById("year").textContent = new Date().getFullYear();

const phoneDigits = SHOP_PHONE.replace(/\\D/g, "");
const callLink = document.getElementById("callLink");
const whatsappLink = document.getElementById("whatsappLink");
function setContactLinks() {
  if (phoneDigits.length === 10) {
    callLink.href = `tel:+${COUNTRY_CODE}${phoneDigits}`;
    callLink.textContent = `Call +${COUNTRY_CODE} ${phoneDigits}`;
    whatsappLink.href = `https://wa.me/${COUNTRY_CODE}${phoneDigits}?text=${encodeURIComponent("Hello Apna Fashion, I would like to know more about your clothing collection.")}`;
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener";
    whatsappLink.textContent = "Chat on WhatsApp ↗";
  } else {
    callLink.href = "#contact";
    callLink.textContent = "Add phone number in script.js";
    whatsappLink.href = "#contact";
    whatsappLink.textContent = "Add phone number in script.js";
  }
}
setContactLinks();

document.querySelectorAll("[data-category]").forEach(link => {
  link.addEventListener("click", () => {
    const interest = document.getElementById("interest");
    const wanted = link.dataset.category;
    const option = Array.from(interest.options).find(item => item.value === wanted);
    if (option) interest.value = wanted;
  });
});

document.getElementById("messageForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const interest = document.getElementById("interest").value;
  const message = document.getElementById("customerMessage").value.trim();
  const status = document.getElementById("formStatus");
  if (!name || !message) {
    status.textContent = "Please enter your name and message.";
    return;
  }
  if (phoneDigits.length !== 10) {
    status.textContent = "Please add the shop's full 10-digit phone number in script.js first.";
    return;
  }
  const text = `Hello Apna Fashion!%0AName: ${encodeURIComponent(name)}%0AInterested in: ${encodeURIComponent(interest)}%0AMessage: ${encodeURIComponent(message)}`;
  window.open(`https://wa.me/${COUNTRY_CODE}${phoneDigits}?text=${text}`, "_blank", "noopener,noreferrer");
  status.textContent = "WhatsApp opened. Review your message and press Send.";
});
// Simple fashion matching game for children.
const gameSymbols = ["👕", "🧥", "👟", "🧢", "👗", "🧦"];
let gameCards = [], firstCard = null, lockBoard = false, foundPairs = 0, moves = 0, hideTimer = null, gameStartedAt = 0, gameClock = null;
function startMemoryGame() {
  if (hideTimer) clearTimeout(hideTimer);
  firstCard = null; lockBoard = false; foundPairs = 0; moves = 0;
  document.getElementById("pairsFound").textContent = "0";
  document.getElementById("movesCount").textContent = "0";
  const timerLabel = document.getElementById("gameTime"); if (timerLabel) timerLabel.textContent = "0s";
  document.getElementById("gameMessage").textContent = "Cards par click karke matching pair dhoondo!";
  gameCards = [...gameSymbols, ...gameSymbols].map((symbol, index) => ({symbol, id:index, matched:false, flipped:false})).sort(() => Math.random() - 0.5);
  const grid = document.getElementById("memoryGrid"); grid.innerHTML = "";
  gameCards.forEach(card => {
    const button = document.createElement("button"); button.type = "button"; button.className = "memory-card"; button.textContent = "❔"; button.setAttribute("aria-label", "Hidden card");
    button.addEventListener("click", () => flipMemoryCard(card.id)); grid.appendChild(button); card.element = button;
  });
}
function flipMemoryCard(id) {
  const card = gameCards.find(item => item.id === id);
  if (!card || lockBoard || card.matched || card.flipped) return;
  card.flipped = true; card.element.textContent = card.symbol; card.element.classList.add("flipped"); card.element.setAttribute("aria-label", card.symbol);
  if (!firstCard) { firstCard = card; return; }
  moves++; document.getElementById("movesCount").textContent = String(moves);
  if (firstCard.symbol === card.symbol) {
    firstCard.matched = true; card.matched = true; firstCard.element.classList.add("matched"); card.element.classList.add("matched"); foundPairs++;
    document.getElementById("pairsFound").textContent = String(foundPairs); firstCard = null;
    document.getElementById("gameMessage").textContent = foundPairs === gameSymbols.length ? `Shabash! Aapne ${moves} moves mein sabhi pairs dhoondh liye! 🎉` : "Wah! Match mil gaya. Ek aur pair dhoondo!";
  } else {
    lockBoard = true; const previous = firstCard; firstCard = null; document.getElementById("gameMessage").textContent = "Koi baat nahi, dobara try karo!";
    hideTimer = setTimeout(() => { [previous, card].forEach(item => { item.flipped = false; item.element.textContent = "❔"; item.element.classList.remove("flipped"); item.element.setAttribute("aria-label", "Hidden card"); }); lockBoard = false; }, 850);
  }
}
const resetGameButton = document.getElementById("resetGame");
if (resetGameButton) resetGameButton.addEventListener("click", startMemoryGame);
if (document.getElementById("memoryGrid")) startMemoryGame();

function updateGameTime() {
  const timerLabel = document.getElementById("gameTime");
  if (timerLabel) timerLabel.textContent = `${Math.floor((Date.now() - gameStartedAt) / 1000)}s`;
}
const styleSuggestButton = document.getElementById("styleSuggest");
if (styleSuggestButton) styleSuggestButton.addEventListener("click", () => {
  const person = document.getElementById("stylePerson").value;
  const season = document.getElementById("styleSeason").value;
  const result = document.getElementById("styleResult");
  let suggestion = person;
  if (person === "Women's Wear") suggestion = season === "Winter" ? "Women's Wear + Winter & Warm Wear" : "Women's Wear";
  else if (person === "Men's Wear") suggestion = season === "Winter" ? "Men's Wear + Winter & Warm Wear" : "Men's Wear";
  else suggestion = season === "Winter" ? "Kids' Clothing + Winter & Warm Wear" : "Kids' Clothing";
  result.textContent = `Great choice! Start with: ${suggestion}. Tap “Ask about clothes” in that collection to enquire on WhatsApp.`;
  document.getElementById("interest").value = suggestion.includes("Winter") ? "Winter & Warm Wear" : person;
});
