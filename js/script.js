// main.js

// Load data dynamically
fetch("data/data.json")
  .then((res) => res.json())
  .then((data) => {
    loadTeam(data.team);
    loadChallenges(data.challenges);
    loadChallengeDetail(data.challenges);
  })
  .catch((err) => console.error("Error loading data:", err));

/**
 * TEAM PAGE
 * Loads team members dynamically into #team-container
 */
function loadTeam(team) {
  const container = document.getElementById("team-container");
  if (!container) return;

  team.forEach((member) => {
    const div = document.createElement("div");
    div.classList.add("team-member");
    div.innerHTML = `
      <img src="${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.email}</p>
    `;
    container.appendChild(div);
  });
}

/**
 * CHALLENGES PAGE
 * Loads challenge cards into #challenges-container
 */
function loadChallenges(challenges) {
  const container = document.getElementById("challenges-container");
  if (!container) return;

  challenges.forEach((challenge) => {
    const div = document.createElement("div");
    div.classList.add("challenge-card");
    div.innerHTML = `
      <img src="${challenge.image}" alt="${challenge.title}">
      <h3>${challenge.title}</h3>
      <p>${challenge.description}</p>
    `;
    div.addEventListener("click", () => {
      window.location.href = `challenge.html?id=${challenge.id}`;
    });
    container.appendChild(div);
  });
}

/**
 * CHALLENGE DETAIL PAGE
 * Shows challenge details + expert + weekly reports
 */
function loadChallengeDetail(challenges) {
  const container = document.querySelector(".challenge-detail");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const challenge = challenges.find((c) => c.id === id);
  if (!challenge) return;

  document.getElementById("challenge-title").textContent = challenge.title;
  document.getElementById("challenge-image").src = challenge.image;
  document.getElementById("challenge-description").textContent =
    challenge.longDescription;

  // Expert
  const expertDiv = document.getElementById("expert-container");
  expertDiv.innerHTML = `
    <img src="${challenge.expert.image}" alt="${challenge.expert.name}" style="width:150px;border-radius:50%;margin-bottom:1rem;">
    <h3>${challenge.expert.name}</h3>
    <p>${challenge.expert.title}</p>
    <p>${challenge.expert.bio}</p>
  `;

  // Weekly Reports
  const weeklyContainer = document.getElementById("weekly-container");
  challenge.weeks
    .sort((a, b) => b.week - a.week) // newest first
    .forEach((week) => {
      const div = document.createElement("div");
      div.classList.add("week-card");
      div.innerHTML = `
        <h4>Week ${week.week}</h4>
        <p>${week.summary}</p>
      `;
      div.addEventListener("click", () => {
        alert(`Full Report (Week ${week.week}):\n\n${week.report}`);
      });
      weeklyContainer.appendChild(div);
    });
}

/**
 * FOOTER CONTACT FORM
 * Simple fake submission (front-end only)
 */
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("form-message").textContent =
      "Thank you for reaching out! (Form submission demo only)";
    form.reset();
  });
}

// Simple fade-in animation on scroll
document.addEventListener("scroll", () => {
  document.querySelectorAll(".fade-in").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.style.animationPlayState = "running";
    }
  });
});

// Contact form fake submission
document.querySelector(".contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for reaching out! We'll get back to you soon.");
});
