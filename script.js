const jobs = [
  {
    id: 1,
    companyName: "Mobile First Corp",
    position: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
    status: "not_applied"
  },
  {
    id: 2,
    companyName: "WebFlow Agency",
    position: "Web Designer & Developer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80,000 - $120,000",
    description: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.",
    status: "not_applied"
  },
  {
    id: 3,
    companyName: "DataViz Solutions",
    position: "Data Visualization Specialist",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 - $165,000",
    description: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
    status: "not_applied"
  },
  {
    id: 4,
    companyName: "CloudFirst Inc",
    position: "Backend Developer",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140,000 - $190,000",
    description: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.",
    status: "not_applied"
  },
  {
    id: 5,
    companyName: "Innovation Labs",
    position: "UI/UX Engineer",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $150,000",
    description: "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.",
    status: "not_applied"
  },
  {
    id: 6,
    companyName: "MegaCorp Solutions",
    position: "JavaScript Developer",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130,000 - $170,000",
    description: "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.",
    status: "not_applied"
  },
  {
    id: 7,
    companyName: "StartupXYZ",
    position: "Full Stack Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    description: "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.",
    status: "not_applied"
  },
  {
    id: 8,
    companyName: "TechCorp Industries",
    position: "Senior Frontend Developer",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description: "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.",
    status: "not_applied"
  }
];

let activeTab = "all";

const totalCountEl = document.getElementById("totalCount");
const interviewCountEl = document.getElementById("interviewCount");
const rejectedCountEl = document.getElementById("rejectedCount");
const tabJobCountEl = document.getElementById("tabJobCount");
const jobListEl = document.getElementById("jobList");
const tabButtons = document.querySelectorAll(".tab-btn");

function getCounts() {
  return {
    total: jobs.length,
    interview: jobs.filter(job => job.status === "interview").length,
    rejected: jobs.filter(job => job.status === "rejected").length
  };
}

function getVisibleJobs() {
  if (activeTab === "all") return jobs;
  return jobs.filter(job => job.status === activeTab);
}

function updateDashboard() {
  const counts = getCounts();
  totalCountEl.textContent = counts.total;
  interviewCountEl.textContent = counts.interview;
  rejectedCountEl.textContent = counts.rejected;

  if (activeTab === "all") tabJobCountEl.textContent = counts.total;
  if (activeTab === "interview") tabJobCountEl.textContent = counts.interview;
  if (activeTab === "rejected") tabJobCountEl.textContent = counts.rejected;
}

function updateTabs() {
  tabButtons.forEach(button => {
    if (button.dataset.tab === activeTab) {
      button.className = "tab-btn rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white";
    } else {
      button.className = "tab-btn rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-600";
    }
  });
}

function getStatusBadge(job) {
  if (job.status === "interview") {
    return `
      <span class="inline-flex rounded-md bg-green-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-600">
        Interview
      </span>
    `;
  }

  if (job.status === "rejected") {
    return `
      <span class="inline-flex rounded-md bg-red-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-red-600">
        Rejected
      </span>
    `;
  }

  return `
    <span class="inline-flex rounded-md bg-gray-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
      Not Applied
    </span>
  `;
}

function createCard(job) {
  return `
    <article class="rounded-xl bg-white p-5 shadow-card">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3 class="text-[20px] font-extrabold text-title">${job.companyName}</h3>
          <p class="mt-1 text-sm font-medium text-body">${job.position}</p>
        </div>

        <button data-action="delete" data-id="${job.id}" class="rounded-md p-2 text-gray-400 hover:text-red-500">
          ✕
        </button>
      </div>

      <div class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-body">
        <span>${job.location}</span>
        <span>•</span>
        <span>${job.type}</span>
        <span>•</span>
        <span>${job.salary}</span>
      </div>

      <div class="mt-4">
        ${getStatusBadge(job)}
      </div>

      <p class="mt-4 text-sm leading-7 text-body">${job.description}</p>

      <div class="mt-5 flex flex-wrap items-center gap-3">
        <button data-action="interview" data-id="${job.id}" class="rounded-md border border-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-500 hover:bg-emerald-50">
          Interview
        </button>

        <button data-action="rejected" data-id="${job.id}" class="rounded-md border border-red-500 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50">
          Rejected
        </button>
      </div>
    </article>
  `;
}

function renderJobs() {
  updateDashboard();
  updateTabs();
  const visibleJobs = getVisibleJobs();
  jobListEl.innerHTML = visibleJobs.map(createCard).join("");
}

document.addEventListener("click", function (event) {
  const tabBtn = event.target.closest("[data-tab]");
  if (!tabBtn) return;

  activeTab = tabBtn.dataset.tab;
  renderJobs();
});

document.addEventListener("click", function (event) {
  const actionBtn = event.target.closest("[data-action]");
  if (!actionBtn) return;

  const action = actionBtn.dataset.action;
  const jobId = Number(actionBtn.dataset.id);
  const job = jobs.find(item => item.id === jobId);

  if (!job) return;

  if (action === "interview") {
    job.status = job.status === "interview" ? "not_applied" : "interview";
    renderJobs();
    return;
  }

  if (action === "rejected") {
    job.status = job.status === "rejected" ? "not_applied" : "rejected";
    renderJobs();
  }
});

renderJobs();