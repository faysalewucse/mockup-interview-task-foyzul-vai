const myHeaders = new Headers();
myHeaders.append("apikey", "Vro4zKiNagGl7qza7yv7VMkZbp29b9p1");

const url_list_container = document.getElementById("url-list-container");

function displayStoredUrl() {
  const storedUrls = JSON.parse(localStorage.getItem("shortUrls"));

  if (storedUrls) {
    storedUrls.forEach((url) => {
      const listItem = document.createElement("div");
      listItem.innerHTML = `
        <div class="border p-2 mt-5">      
          <div class="flex items-center">
            <h6 class="w-20 text-indigo-500">Long URL:</h6>
            <input id="link_${url.id}" type="text" value="${url.long_url}" class="border border-indigo-100 rounded-md inline-block flex-grow p-1 focus:outline-none focus:z-10 focus:shadow"/>
          </div>
          <p class="text-red-500" id="errorFor${url.id}"></p>
          <h5 class="my-2 text-green-600">Short URL: <span class="text-black">${url.short_url}</span> <span onclick="copyToClipboard('${url.short_url}')" class="cursor-pointer ml-5 underline">copy</span></h5>
          <div>
            <button id="updateBtnFor${url.id}" onclick="updateUrl(${url.id})" class="disable bg-indigo-500 text-white py-2 px-4 text-sm hover:bg-indigo-600">
              Update
            </button>
            <button id="deleteBtnFor${url.id}" onclick="deleteUrl(${url.id})" class="disable bg-red-500 text-white py-2 px-4 text-sm hover:bg-red-600">
              Delete
            </button>
          </div>
        </div>`;
      url_list_container.appendChild(listItem);
    });
  } else {
    const noLinks = document.createElement("div");
    noLinks.innerHTML = `<p class="text-indigo-500">No Links Found.</p>`;
    url_list_container.appendChild(noLinks);
  }
}

function updateUrl(id) {
  const long_url = document.getElementById(`link_${id}`).value;
  const error = document.getElementById(`errorFor${id}`);
  const update_btn = document.getElementById(`updateBtnFor${id}`);

  update_btn.innerHTML = "Updating...";
  update_btn.disabled = true;
  update_btn.classList.add("cursor-not-allowed");

  const requestOptions = {
    method: "POST",
    redirect: "follow",
    headers: myHeaders,
    body: long_url,
  };

  fetch("https://api.apilayer.com/short_url/hash", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.short_url) {
        update_btn.innerHTML = "Update";
        update_btn.disabled = false;
        update_btn.classList.remove("cursor-not-allowed");
        updateFromLocalStorage(result.short_url, long_url, id);
        url_list_container.innerHTML = ``;
        displayStoredUrl();
      } else {
        error.innerHTML = `Error Occured: ${result.message}`;
        update_btn.innerHTML = "Update";
        update_btn.disabled = false;
        update_btn.classList.remove("cursor-not-allowed");
      }
    })
    .catch((error) => console.log(error));
}

function copyToClipboard(shortUrl) {
  navigator.clipboard.writeText(shortUrl);

  alert("Copied the URL: " + shortUrl);
}

function updateFromLocalStorage(short_url, long_url, id) {
  let storedUrls = JSON.parse(localStorage.getItem("shortUrls"));
  let updatedUrlList = [];

  if (storedUrls) {
    updatedUrlList = storedUrls.map((url) => {
      if (url.id == id) {
        return {
          ...url,
          long_url,
          short_url,
        };
      }
      return url;
    });
  } else {
    alert("Error Occured!");
  }
  localStorage.setItem("shortUrls", JSON.stringify(updatedUrlList));
}

function deleteUrl(id) {
  let storedUrls = JSON.parse(localStorage.getItem("shortUrls"));
  let updatedUrlList = [];

  if (storedUrls) {
    updatedUrlList = storedUrls.filter((url) => url.id !== id);
  } else {
    alert("Error Occured!");
  }
  localStorage.setItem("shortUrls", JSON.stringify(updatedUrlList));
  url_list_container.innerHTML = ``;
  displayStoredUrl();
}

displayStoredUrl();
