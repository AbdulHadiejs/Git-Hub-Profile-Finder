const formEl = document.querySelector("#Main-Form");
const divEl = document.querySelector("#Main-div");
const error = document.querySelector("#error");

formEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    let value = event.target.children[0].value;
    let img = divEl.children[0];
    let userName = divEl.children[1];
    let repos = divEl.children[2];
    let proLink = divEl.children[3];
    event.target.style.display = "none";
    
    try {
        error.innerText = "";
        const response = await axios(`https://api.github.com/users/${value}`);
        
        console.log(response);

        img.src = response.data.avatar_url;
        userName.innerText = response.data.name || "No Name Provided";
        repos.innerText = `Repositories: ${response.data.public_repos}`;
        proLink.href = response.data.html_url;
        proLink.innerText = "View Profile";

        divEl.style.display = "block";
    } catch(err) {
        console.log(err.response.data.message);  
        error.innerText = err.response.data.message;

        img.src = "";
        userName.innerText = "";
        repos.innerText = "";
        proLink.href = "#";
        divEl.style.display = "none";
    }
});
