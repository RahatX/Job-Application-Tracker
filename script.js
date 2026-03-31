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
const emptyStateEl = document.getElementById("emptyState");
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

  if (activeTab === "all") {
    tabJobCountEl.textContent = counts.total;
  } else if (activeTab === "interview") {
    tabJobCountEl.textContent = counts.interview;
  } else {
    tabJobCountEl.textContent = counts.rejected;
  }
}

function updateTabs() {
  tabButtons.forEach(button => {
    if (button.dataset.tab === activeTab) {
      button.className = "tab-btn rounded-md bg-[#3b82f6] px-5 py-2 text-[13px] font-semibold text-white transition";
    } else {
      button.className = "tab-btn rounded-md border border-[#e5e7eb] bg-[#f8fafc] px-5 py-2 text-[13px] font-semibold text-[#64748b] transition hover:bg-[#eef2f7]";
    }
  });
}

function getStatusBadge(job) {
  if (job.status === "interview") {
    return `<span class="inline-flex rounded-md bg-green-100 px-3 py-2 text-[12px] font-bold uppercase text-green-700">Interview</span>`;
  }

  if (job.status === "rejected") {
    return `<span class="inline-flex rounded-md bg-red-100 px-3 py-2 text-[12px] font-bold uppercase text-red-700">Rejected</span>`;
  }

  return `<span class="inline-flex rounded-md bg-blue-50 px-3 py-2 text-[12px] font-bold uppercase text-blue-900">Not Applied</span>`;
}

function createDeleteButton(jobId) {
  return `
    <button
      data-action="delete"
      data-id="${jobId}"
      class="flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#94a3b8] transition hover:bg-[#f8fafc] hover:text-red-500"
      aria-label="Delete job"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 7h12M9 7V5h6v2m-7 4v6m4-6v6M5 7l1 12h12l1-12"/>
      </svg>
    </button>
  `;
}

function createCard(job) {
  return `
    <article class="rounded-2xl border border-[#e7ebf0] bg-white p-5 shadow-card sm:p-6">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3 class="text-[20px] font-extrabold leading-tight tracking-[-0.02em] text-title">
            ${job.companyName}
          </h3>
          <p class="mt-1 text-[14px] font-medium text-body">
            ${job.position}
          </p>
        </div>

        ${createDeleteButton(job.id)}
      </div>

      <div class="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-body">
        <span>${job.location}</span>
        <span>•</span>
        <span>${job.type}</span>
        <span>•</span>
        <span>${job.salary}</span>
      </div>

      <div class="mt-4">
        ${getStatusBadge(job)}
      </div>

      <p class="mt-4 text-[14px] leading-7 text-body">
        ${job.description}
      </p>

      <div class="mt-5 flex flex-wrap items-center gap-3">
        <button
          data-action="interview"
          data-id="${job.id}"
          class="rounded-md border border-[#10b981] bg-white px-4 py-2 text-[13px] font-semibold text-[#10b981] transition hover:bg-green-50"
        >
          Interview
        </button>

        <button
          data-action="rejected"
          data-id="${job.id}"
          class="rounded-md border border-[#ef4444] bg-white px-4 py-2 text-[13px] font-semibold text-[#ef4444] transition hover:bg-red-50"
        >
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

  if (visibleJobs.length === 0) {
    jobListEl.innerHTML = "";
    emptyStateEl.classList.remove("hidden");
    return;
  }

  emptyStateEl.classList.add("hidden");
  jobListEl.innerHTML = visibleJobs.map(createCard).join("");
}

document.addEventListener("click", function (event) {
  const tabBtn = event.target.closest("[data-tab]");
  if (tabBtn) {
    activeTab = tabBtn.dataset.tab;
    renderJobs();
    return;
  }

  const actionBtn = event.target.closest("[data-action]");
  if (!actionBtn) return;

  const action = actionBtn.dataset.action;
  const jobId = Number(actionBtn.dataset.id);
  const job = jobs.find(item => item.id === jobId);

  if (!job) return;

  if (action === "delete") {
    const index = jobs.findIndex(item => item.id === jobId);
    jobs.splice(index, 1);
    renderJobs();
    return;
  }

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