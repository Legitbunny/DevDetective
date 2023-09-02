const profileImage = document.querySelector("[data-profileImg]");
const name = document.querySelector("[data-name]");
const doj = document.querySelector("[data-doj]");
const userName = document.querySelector("[data-githubUsername]");
const bio = document.querySelector("[data-profileBio]");
const noofRepos = document.querySelector("[data-noRepos]");
const followers = document.querySelector("[data-followers]");
const following = document.querySelector("[data-following]");
const loc = document.querySelector("[data-location]");
const github = document.querySelector("[data-github]");
const twitter = document.querySelector("[data-twitter]");
const office = document.querySelector("[data-office]");
const userUrl = document.querySelector("[data-url]");
let darkMode = false;

//API
const url = "https://api.github.com/users/";

//by default api call
fetchUserInfo(url + "legitbunny");


//search bar input
const searchForm = document.querySelector("[data-searchform]")

//Even listeners
searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    let searchedUserName = searchForm.value;

    if(searchedUserName == ""){
        return;
    }
    else{
        fetchUserInfo(url + searchedUserName);
    }
})

const input = document.querySelector("[data-inpUsername]")

input.addEventListener("keydown", (e) => {
    if(e.key == "Enter"){
        if(input.value !== ""){
            fetchUserInfo(url + input.value)
        }
    }
},
false
)


// const inp = get("input");
// const noresults = get("no-results")

// inp.addEventListener("input", function(){
//     noresults.style.display = "none";
// })

const btn = document.getElementById("btn-mode")

btn.addEventListener("click", () => {
    if(darkMode == false){
        darkModeProperties();
    }
    else{
        lightModeProperties();
    }
})


//functions
async function fetchUserInfo(giturl){
    try{
        const response = await fetch(giturl);
        const data = await response.json();
        renderUserInfo(data);
    }
    catch(err){
        throw err;
        //handle erroer
    }
}



function renderUserInfo(userInfo){
    if (userInfo.message !== "Not Found") {
        function checkNull(param1, param2) {
          if (param1 === "" || param1 === null) {
            param2.style.opacity = 0.5;
            param2.previousElementSibling.style.opacity = 0.5;
            return false;
          } else {
            return true;
          }
        }

    profileImage.src = userInfo?.avatar_url;
    name.innerText = userInfo.name === null ? userInfo.login : userInfo.name;
    doj.innerText =  `Joined ${dateFormatter(userInfo)}`;
    userUrl.innerHTML = `@${userInfo?.login}`;
    bio.innerHTML = userInfo.bio == null ? "This profile has no bio" : `${userInfo.bio}`;
    noofRepos.innerText = userInfo?.public_repos;
    followers.innerText = userInfo?.followers;
    following.innerText = userInfo?.following;
    loc.innerText = checkNull(userInfo.location, loc) ? userInfo.location : "Not Available";
    github.innerText = checkNull(userInfo.html_url, github) ? userInfo.html_url : "Not Available";
    twitter.innerText = checkNull(userInfo.twitter_username, twitter) ? userInfo.twitter_username : "Not Available"
    office.innerText = checkNull(userInfo.company, office) ? userInfo.company : "Not Available";
    userUrl.href = userInfo?.html_url;
    github.href = userInfo?.html_url;
    }}

var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

//format date coming from API response
function dateFormatter(userInfo){
    const date = userInfo?.created_at;
    const myDate = date.substring(0,10);
    const dt = myDate.split("-");

    //swap month and year
    let temp = dt[0];
    dt[0] = dt[2];
    dt[2] = temp;

    //convert month from number to month name
    let temp1 = parseInt(dt[1]);
    dt[1] = months[temp1 - 1];
    const res = dt[0] + " " + dt[1] + " " + dt[2]
    return res;
}

//dark mode default
const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
const root = document.documentElement.style;
const modetext = document.getElementById("mode-text");
const modeicon = document.getElementById("mode-icon")

if(localStorage.getItem("dark-mode")){
    darkMode = localStorage.getItem("dark-mode");
    darkModeProperties();
}else{
    localStorage.setItem("dark-mode", prefersDarkMode);
    darkMode = prefersDarkMode;
    lightModeProperties();
}

function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modetext.innerText = "LIGHT";
    modeicon.src = "./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    localStorage.setItem("dark-mode", true);
  }
  function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modetext.innerText = "DARK";
    modeicon.src = "./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
    localStorage.setItem("dark-mode", false);
  }
  