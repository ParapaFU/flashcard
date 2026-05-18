// ===== DOM =====
// btn tambah card
const addCardBtn = document.getElementById("add-card-btn");

// form new card
const formCardContainer = document.getElementById("form-card-container");

// form card
const formCard = document.getElementById("form-card");

// semua input | form card
const inputForms = document.querySelectorAll(".input-text");

// btn create card | form card
const createBtn = document.getElementById("create-btn");

// simpan tambah card || form card
const simpanTambahBtn = document.getElementById("simpan-tambah-btn");

// btn cancel | form new card
const cancelBtn = document.getElementById("cancel-btn");

// container data
const dataContainer = document.getElementById("container-data");

// item | data
const items = dataContainer.querySelectorAll(".item");

// text data
const textData = dataContainer.querySelector(".text");

// ===== FUNCTION =====
// check form
function checkForm() {
  const allInput = [...inputForms].every((input) => input.value.trim() !== "");

  simpanTambahBtn.disabled = !allInput;
  createBtn.disabled = !allInput;
}

// menampilkan data
function tampilkanData() {
  const data = JSON.parse(localStorage.getItem("itemsData")) || [];

  dataContainer.innerHTML = "";

  data.forEach((item) => {
    dataContainer.innerHTML += `
    <div class="item">
          <div class="text ${item.flipped ? "active" : ""}">
            <p class="text-front">${item.front}</p>
            <p class="text-behind">${item.behind}</p>
          </div>
          <button class="delete">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path
                  stroke-dasharray="24"
                  d="M12 20h5c0.5 0 1 -0.5 1 -1v-14M12 20h-5c-0.5 0 -1 -0.5 -1 -1v-14"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.5s"
                    values="24;0"
                  />
                </path>
                <path stroke-dasharray="18" stroke-dashoffset="18" d="M4 5h16">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.5s"
                    dur="0.3s"
                    to="0"
                  />
                </path>
                <path
                  stroke-dasharray="10"
                  stroke-dashoffset="10"
                  d="M10 4h4M10 9v7M14 9v7"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.8s"
                    dur="0.2s"
                    to="0"
                  />
                </path>
              </g>
            </svg>
          </button>
        </div>`;
  });
}

// ===== EVENT =====
// menampilkan form
addCardBtn.addEventListener("click", () => {
  formCardContainer.style.display = "flex";
});

// menghilangkan form
cancelBtn.addEventListener("click", () => {
  formCardContainer.style.display = "none";
  formCard.reset();
});

// pengecekan input terisi semua
formCard.addEventListener("input", checkForm);

// mengirim data
formCardContainer.addEventListener("submit", (e) => {
  e.preventDefault();

  const btn = e.submitter;

  const frontText = document.getElementById("input-text-front").value;
  const behindText = document.getElementById("input-text-behind").value;

  const dataLama = JSON.parse(localStorage.getItem("itemsData")) || [];

  dataLama.push({
    front: frontText,
    behind: behindText,
    flipped: false,
  });

  localStorage.setItem("itemsData", JSON.stringify(dataLama));

  formCard.reset();
  tampilkanData();

  if (btn.matches(".simpan-card")) {
    formCardContainer.style.display = "none";
  }
});

// form event
dataContainer.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete");
  const card = e.target.closest(".item");

  if (deleteBtn) {
    const item = deleteBtn.closest(".item");
    const allItem = [...dataContainer.querySelectorAll(".item")];
    const index = allItem.indexOf(item);

    const data = JSON.parse(localStorage.getItem("itemsData")) || [];
    data.splice(index, 1);

    localStorage.setItem("itemsData", JSON.stringify(data));
    tampilkanData();
  }

  if (card && !deleteBtn) {
    const text = card.querySelector(".text");
    text.classList.toggle("active");

    const allItem = [...dataContainer.querySelectorAll(".item")];
    const index = allItem.indexOf(card);

    const data = JSON.parse(localStorage.getItem("itemsData")) || [];
    data[index].flipped = text.classList.contains("active");

    localStorage.setItem("itemsData", JSON.stringify(data));
  }
});

// ===== PROGRAM =====
checkForm();
tampilkanData();
