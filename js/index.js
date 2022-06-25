"use strict"
const api_key = `api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR3pR9W60favN1ABJJWeHACl-NacR0sFa2_hUmNRb1SGVshuykMmkKbDJvk`;
const based_url = `https://api.themoviedb.org/3`;
const api_url = based_url + `/discover/movie?sort_by=popularity.desc&` + api_key;
const searchURL = based_url + `/search/movie?` + api_key;
let moviesList;

async function getData(url) {
    let respons = await fetch(url)
    let resultData = await respons.json();
    moviesList =resultData.results;
    displayData(moviesList)
}
(async function () {await getData(api_url)})()
function displayData(list) {
    let temp = ``; 

    for (let i = 0; i < list.length; i++) {
        let  {title,poster_path,vote_average,overview,first_air_date,release_date} = list[i];
        temp += `
            <div class="movie col-md-6 col-xl-4 g-4 overflow-hidden">
                <div class="ineer position-relative overflow-hidden">
                    <div class="img">
                        <img src='https://image.tmdb.org/t/p/w500${poster_path}' alt="" class="w-100 rounded-3">
                    </div>

                    <div class="content h-100 p-3 text-center d-flex flex-column justify-content-center align-items-center position-absolute rounded-3">
                        <h3>${title}</h3>
                        <p>${overview}</p>
                        <span class="fs-">rate: ${vote_average}</span>
                        <span class="fs-">${first_air_date ||release_date}</span>
                    </div>
                </div>
            </div>
    `;
    }
    document.getElementById("displayMovies").innerHTML = temp;
}


// navbar
$(function () {
    let nav = $("nav");
    let link = $("nav a");
    let outerWidthNavLinks = $("#navLinks").outerWidth();
    let iconNavOpen = $("#iconNavOpen");
    let iconNavClose = $("#iconNavClose");
    
    $(nav).css({left: `-${outerWidthNavLinks}px`});

$(iconNavOpen).click((e)=> {
    $(nav).animate({left: `0px`},500);
    $(link).css({bottom:"0",transition: `bottom 1.5s, color .3s,opacity 3s 2s`,opacity: '1'});
    $(iconNavOpen).addClass("d-none");
    $(iconNavClose).removeClass("d-none").addClass("d-block");
})
$(iconNavClose).click(()=> {
    $(nav).animate({left: `-${outerWidthNavLinks}px`},500);
    $(link).css({bottom:"-300px",transition: `bottom 2s .1s, opacity 1s`,opacity: '0'});;
    $(iconNavOpen).removeClass("d-none").addClass("d-block");
    $(iconNavClose).addClass("d-none");
})
$("#inSection").click((e)=> {
    let getHref =$(e.target).attr("href");
    let offaet = $(getHref).offset().top;
    $("html,body").animate({scrollTop:offaet},3000)
    console.log();
})
$("a.linkOne").click(()=> {
    let NowURL="https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
    getData(NowURL)
})
$("a.linkTow").click(()=> {
    let popularURL="https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
    getData(popularURL)
})
$("a.linkThree").click(()=> {
    let topratedURL="https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
    getData(topratedURL)
})
$("a.linkFour").click(()=> {
    let trendingURL="https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
    getData(trendingURL)
})
$("a.linkFive").click(()=> {
    let upcomingURL="https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
    getData(upcomingURL)
})
})

// search inputs
$(function () {
    let searchWordInput = document.getElementById("searchWordInput");
    let searchMovieInput = $("#searchMovieInput");
    $(searchWordInput).keyup((e)=> {searchWord(e.target.value)})
    function searchWord(searchTermWord) {
    let searchResult = [];
    for (let i = 0; i < moviesList.length; i++) {
        if (moviesList[i].overview.toLowerCase().includes(searchTermWord.toLowerCase()) == true) {
            searchResult.push(moviesList[i]);
        }
    }
    displayData(searchResult)
}
$(searchMovieInput).keyup((e)=> {
    const searchTerm = e.target.value;
    if (searchTerm) {
        getData(searchURL+ '&query=' + searchTerm);
    }
})
})

// form of contact
$(function () {
let userName = document.getElementById("userName");
let userEmail = document.getElementById("userEmail");
let userPhone = document.getElementById("userPhone");
let userAge = document.getElementById("userAge");
let password = document.getElementById("password");
let confPassword = document.getElementById("confPassword");
let submit = document.getElementById("submit");

(userName).addEventListener("keyup", regexName)
function regexName() {
    let regex = /^[a-zA-Z]{3,15}$/;
    if (regex.test(userName.value) == true) {
        isValid(userName)
        return true;
    }else {
        isInValid(userName)
        return false;
    }
}
userEmail.addEventListener("keyup", regexEmail)
function regexEmail() {
    let regex = /^[a-zA-Z]{3,15}[._][a-zA-Z0-9]{3,15}?$/;
    if (regex.test(userEmail.value) == true) {
        isValid(userEmail)
        return true;
    }else {
        isInValid(userEmail)
        return false;
    }
}
userPhone.addEventListener("keyup", regexPhone)
function regexPhone() {
    let regex = /^01(0|1|2|5)[0-9]{8}$/;
    if (regex.test(userPhone.value) == true) {
        isValid(userPhone)
        return true;
    }else {
        isInValid(userPhone)
        return false;
    }
}
userAge.addEventListener("keyup", regexAge)
function regexAge() {
    let regex = /^([1-7][0-9]|(80))$/;
    if (regex.test(userAge.value) == true ) {
        isValid(userAge)
        return true;
    }else {
        isInValid(userAge)
        return false;
    }
}
password.addEventListener("keyup",regexPassword )
function regexPassword() {
    let regex = /^.{8,20}$/;
    if (regex.test(password.value) == true) {
        isValid(password)
        return true;
    }else {
        isInValid(password)
        return false;
    }
}
confPassword.addEventListener("keyup", regexConfPassword)
function regexConfPassword() {
    let regex = /^.{8,20}$/;
    if (regex.test(confPassword.value) == true && confPassword.value === password.value) {
        isValid(confPassword)
        return true;
    }else {
        isInValid(confPassword)
        return false;
    }
}
function isValid(input) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid")
}
function isInValid(input) {
    input.classList.add("is-invalid")
    input.classList.remove("is-valid");
}
submit.addEventListener("click", ()=> submitData())
function submitData() {
    if (regexName() == true && regexEmail() == true &&
        regexPhone() == true && regexAge() == true && 
        regexPassword() == true && regexConfPassword() == true) {
        location.reload("/index.html")
    }
}
});