document.getElementById("submit").addEventListener("click", () => {
    const url = document.getElementById("url").value;
    const loadingMarkup = `<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`;
    const newLinkMarkup = `<div id="input-div" class="input-group d-flex flex-row mb-3"><span class="input-group-text" id="basic-addon1"><i class="bi bi-link-45deg"></i></span><input class="form-control" id="new-url" type="url" name="new-url" /><input class="btn btn-secondary" id="copy" type="submit" value="Copy It" /></div>`;
    const heading = document.getElementById("heading");
    const inputDiv = document.getElementById("input-div");
    heading.innerHTML = "";
    inputDiv.innerHTML = loadingMarkup;
    fetch("https://jurl.cyclic.app/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ url: url }),
    })
        .then(response => response.json())
        .then(result => {
            heading.innerHTML = "Here it is:";
            inputDiv.innerHTML = newLinkMarkup;
            const newInput = document.getElementById("new-url");
            newInput.value = result.newUrl;
            document.getElementById("copy").addEventListener("click", () => {
                newInput.select();
                newInput.setSelectionRange(0, 99999); /* For mobile devices */
                document.execCommand("copy");
            })
        })
        .then(() => {
            document.getElementById("copy").id = "copied";
            document.getElementById("copied").value = "Copied";
        })
        .catch(error => console.error("Error:", error));
});

// document.getElementById("submit").addEventListener("click", openAd);
// function openAd() {
//   window.open("https://www.highrevenuegate.com/ir35h5961?key=514c3c144def0eb0405097f88b9d40b4")
// }