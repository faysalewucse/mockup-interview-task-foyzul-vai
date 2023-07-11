const url_list_container = document.getElementById("url-list-container");

function displayStoredUrl() {
  const storedUrls = JSON.parse(localStorage.getItem("shortUrls"));

  storedUrls.forEach((url, index) => {
    const listItem = document.createElement("div");
    listItem.innerHTML = `
        <div class="border p-2 mt-5">      
          <div class="flex items-center">
            <h6 class="w-20 text-indigo-500">Long URL:</h6>
            <input id="${index}" type="text" value="${url.long_url}" class="border border-indigo-100 rounded-md inline-block flex-grow p-1 focus:outline-none focus:z-10 focus:shadow"/>
          </div>
          <h5 class="my-2 text-green-600">Short URL: <span class="text-black">${url.short_url}</span></h5>
          <button class="bg-indigo-500 text-white py-2 px-4 text-sm rounded">
            Update
          </button>
        </div>`;
    url_list_container.appendChild(listItem);
  });
}

displayStoredUrl();
