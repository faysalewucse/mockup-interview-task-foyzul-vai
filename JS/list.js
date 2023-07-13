const url_list_container = document.getElementById("url-list-container");

function displayStoredUrl() {
  const storedUrls = JSON.parse(localStorage.getItem("shortUrls"));

  if (storedUrls) {
    storedUrls.forEach((url) => {
      const listItem = document.createElement("div");
      listItem.innerHTML = `
        <div class="border p-2 mt-5">      
          <p class="text-red-500" id="errorFor${url.id}"></p>
          <a target="_blank" href="${url.long_url}" class="my-2 text-green-600">Short URL: <span class="text-black underline">${url.short_url}</span></a>
          <p class="overflow-hidden text-sm text-gray-400">${url.long_url}</p>
        </div>`;
      url_list_container.appendChild(listItem);
    });
  } else {
    const noLinks = document.createElement("div");
    noLinks.innerHTML = `<p class="text-indigo-500">No Links Found.</p>`;
    url_list_container.appendChild(noLinks);
  }
}

displayStoredUrl();
