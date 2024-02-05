const loadPhone = async (phone, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phone}`
  );
  const data = await res.json();
  const phones = data.data;

  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  // clear phone container cards before adding new cards
  phoneContainer.textContent = "";

  // display show all button if there are more then 6 phones
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 6 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 6);
  }

  // display only first six phones

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-86 bg-gray-100 shadow-xl`;
    phoneCard.innerHTML = `
    <figure><img class="m-5" src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2  class="card-title  ">${phone.phone_name}</h2>
    
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-end">
        <button onclick="handleShowDetail('${phone.slug}'); " class="btn btn-primary mx-auto">Show Details</button>
      </div>
    </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });

  // hide loading spinner
  toggleLoadingSpinner(false);
};

//
const handleShowDetail = async (id) => {
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;

  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);

  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
    <img class="w-86 mx-auto rounded-xl"  src="${phone.image}">
    <h3 class="font-bold text-lg text-center mt-3">${phone.name}</h3>
    
    <p class="mb-2"><span class="font-bold ">Chipset: </span>${phone.mainFeatures.chipSet}</p>
    <p class="mb-2"><span class="font-bold">Storage:</span> ${phone.mainFeatures.storage}</p>
    <p class="mb-2"><span class="font-bold">Display Size:</span> ${phone.mainFeatures.displaySize}</p>
    <p class="mb-2"><span class="font-bold">Memory:</span> ${phone.mainFeatures.memory}</p>
    <p class="mb-2"><span class="font-bold">Release date: </span>${phone.releaseDate}</p>
    <p class="mb-2"><span class="font-bold">Brand:</span> ${phone.brand}</p>
    <p><span class="font-bold">GPS: </span>${phone.others?.GPS}</p>
  `;

  // show the modal
  show_details_modal.showModal();
};

// handle search button

const handleSearchBtn = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-input");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};
// recap
// const handleSearch2 = () => {
//   toggleLoadingSpinner(true);
//   const searchField = document.getElementById("search-field2");
//   const searchText = searchField.value;
//   loadPhone(searchText);
// };

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// kora uchit na ei bhabe
const handleShowAll = () => {
  toggleLoadingSpinner(true);
  handleSearchBtn(true);
};

loadPhone();
