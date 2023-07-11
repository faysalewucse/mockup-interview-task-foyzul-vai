const myHeaders = new Headers();
const generate_btn = document.getElementById("generate-btn");
const short_url_container = document.getElementById("short-url-container");
const copyBtn = document.getElementById("copy-btn");
const error = document.getElementById("error");

myHeaders.append("apikey", "Vro4zKiNagGl7qza7yv7VMkZbp29b9p1");

function generateShortUrl() {
  error.innerHTML = "";
  short_url_container.innerHTML = "";
  copyBtn.classList.add("hidden");
  generate_btn.innerHTML = `Generating <div
              class="ml-2 animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"
            ></div>`;

  const long_url = document.getElementById("long_url").value;

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
        short_url_container.innerHTML = `Short URL:  <a target="_blank" class="ml-5 text-indigo-400 underline" id="short-url" href="${result.short_url}">${result.short_url}</a>`;
        copyBtn.classList.remove("hidden");
      } else error.innerHTML = `Error Occured: ${result.message}`;
      generate_btn.innerHTML = "Generate";
    })
    .catch((error) => console.log(error));
}

function copyToClipboard() {
  const short_url = document.getElementById("short-url");
  navigator.clipboard.writeText(short_url.innerText);

  alert("Copied the URL: " + short_url.innerText);
}
