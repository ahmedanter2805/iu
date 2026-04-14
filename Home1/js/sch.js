const schedule = document.getElementById("schedule");
const addBtn = document.getElementById("addBtn");
const search = document.getElementById("search");

/* Add Card */
addBtn.onclick = () => addCard();

function addCard(data = {}) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h3 contenteditable="true">${data.title || "New Subject"}</h3>
    <p contenteditable="true">📅 ${data.date || "-- / -- / ----"}</p>
    <p contenteditable="true">⏰ ${data.time || "-- : --"}</p>

    <div class="actions">
      <button class="auto" onclick="autoFill(this)">Auto</button>
      <button class="view" onclick="viewCard(this)">View</button>
      <button class="delete" onclick="deleteCard(this)">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;

  schedule.appendChild(card);
}

/* Delete */
function deleteCard(btn) {
  btn.closest(".card").remove();
}

/* Auto Fill */
function autoFill(btn) {
  const card = btn.closest(".card");
  card.querySelector("h3").innerText = "AI Fundamentals";
  card.querySelectorAll("p")[0].innerText = "📅 01 Mar 2026";
  card.querySelectorAll("p")[1].innerText = "⏰ 10:00 AM – 2h";
}

/* View */
function viewSubject(btn) {
  const title = btn.closest(".schedule-card").querySelector("h3").innerText;
  alert("Viewing course: " + title);
}

/* Search */
search.oninput = () => {
  const value = search.value.toLowerCase();
  document.querySelectorAll(".card").forEach(card => {
    card.style.display =
      card.innerText.toLowerCase().includes(value) ? "block" : "none";
  });
};

/* Dark Mode */
document.getElementById("darkToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

/* Save */
function saveSchedule() {
  const data = [...document.querySelectorAll(".card")].map(card => ({
    title: card.querySelector("h3").innerText,
    date: card.querySelectorAll("p")[0].innerText,
    time: card.querySelectorAll("p")[1].innerText
  }));
  localStorage.setItem("studySchedule", JSON.stringify(data));
  alert("Schedule Saved ✅");
}

/* Load */
function loadSchedule() {
  const saved = JSON.parse(localStorage.getItem("studySchedule") || "[]");
  saved.forEach(addCard);
}

/* Print */
function printSchedule() {
  window.print();
}

/* Init */
loadSchedule();
