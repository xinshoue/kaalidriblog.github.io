const rowsPerPageOptions = [10, 50, 100]; // Different rows per page
let currentPage = 4; // Starting on page 4
let totalPages = 100; // Total number of pages (example)

const links = document.querySelectorAll(".pagination-links .link");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

function updatePagination() {
  // Set active class on current page
  links.forEach(link => {
    link.classList.remove("active");
  });
  document.querySelector(`.pagination-links .link[data-page="${currentPage}"]`).classList.add("active");

  // Show/Hide dots based on current page
  const dots = document.querySelectorAll(".pagination-links .dots");
  dots.forEach(dot => {
    dot.style.display = "none"; // Hide dots initially
  });

  // Handle previous and next button visibility
  prevButton.disabled = currentPage <= 1;
  nextButton.disabled = currentPage >= totalPages;

  // Handle the pagination numbers logic
  let pageNumbers = Array.from(links).filter(link => link !== prevButton && link !== nextButton && !link.classList.contains("dots"));
  
  // Show only nearby page numbers with dots in between
  pageNumbers.forEach(link => {
    const pageNum = parseInt(link.dataset.page);
    if (pageNum < currentPage - 1 || pageNum > currentPage + 1) {
      link.style.display = "none";
    } else {
      link.style.display = "inline-block";
    }
  });

  // Show the dots if necessary
  if (currentPage > 3) {
    document.querySelector(".pagination-links .dots:first-child").style.display = "inline-block";
  }
  if (currentPage < totalPages - 2) {
    document.querySelector(".pagination-links .dots:last-child").style.display = "inline-block";
  }
}

prevButton.addEventListener("click", () => {
  if (currentPage > 1) currentPage--;
  updatePagination();
});

nextButton.addEventListener("click", () => {
  if (currentPage < totalPages) currentPage++;
  updatePagination();
});

// Pagination links
links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = parseInt(link.dataset.page);
    if (page !== currentPage) {
      currentPage = page;
      updatePagination();
    }
  });
});

// Items per page select
document.getElementById("items-per-page").addEventListener("change", (e) => {
  const rowsPerPage = parseInt(e.target.value);
  // Update content or re-fetch data here if needed
  console.log(`Items per page: ${rowsPerPage}`);
});

updatePagination(); // Initialize pagination