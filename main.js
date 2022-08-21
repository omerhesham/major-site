let duration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--mainTransition")) * 1000
// header
let megaLinks = document.querySelector(".megalinks"),
linksBtn = document.querySelector(".btn-mega"),
overLink = false;

linksBtn.addEventListener("click", () => {
    megaLinks.style.display = "flex"
    setTimeout(() => {
        megaLinks.classList.toggle("active")
        linksBtn.classList.toggle("active")
    }, 1);
})
addEventListener("click", (e) => {
    megaLinksRA(e)
})
megaLinks.onmouseover = _ => {overLink = true};
megaLinks.onmouseleave = _ => {overLink = false} 
function megaLinksRA(e) {
    if (e.target !== linksBtn && overLink === false) {
        if (megaLinks.classList.contains("active")) {
            megaLinks.classList.remove("active")
            linksBtn.classList.remove("active")
        }
    }
}
// header
// article
let allHiddenText = Array.from(document.querySelectorAll(".articles .text span")),
allMoreBtn = Array.from(document.querySelectorAll(".articles .more")),
allBoxes = Array.from(document.querySelectorAll(".articles .box"))
allProgress = Array.from(document.querySelectorAll(".articles .progress"));
let overBtn = false;

allMoreBtn.forEach((e, i) => e.addEventListener("click", (e) => e.target.classList.contains("more") ? showText(e.target, i) : showText(e.target.parentElement, i)))

function showText(ele, index) {
    currentIndex = index;
    if (allHiddenText[index].classList.contains("active")) {
        allHiddenText[index].style.display = "none"
        allHiddenText[index].classList.remove("active")
    } else {
        for (let i = 0; i < allHiddenText.length; i++) {
            allHiddenText[i].classList.remove("active")
            allHiddenText[i].style.display = "none"
            allProgress[i].classList.remove("active")
        }
        allHiddenText[index].style.display = "inline"
        setTimeout(() => {
            allHiddenText[index].classList.add("active")
        }, 1)
    }    
}

allBoxes.forEach((e, i) => e.onmouseover = function (e) {
    if (allHiddenText[i].classList.contains("active")) {
        allProgress[i].classList.remove("active")
        allProgress[i].classList.remove("dieEffect")
        overBtn = true
    }
})
allBoxes.forEach((e, i) => e.onmouseleave = function (e) {
    overBtn = false
    let width = allProgress[i].children[0].dataset.width
    if (allHiddenText[i].classList.contains("active")) {
        allProgress[i].classList.add("active")
        let interval = setInterval(() => {
            moveProgress(e, i, width, interval)
            width--;
        }, 100)
    }
})

function moveProgress(e, i, t, v) {
    allProgress[i].children[0].style.width = `${t}%`
    if (overBtn === false) {
        if (t <= 40) {
            allProgress[i].classList.add("dieEffect")
        }
        if (t <= 0) {
            allHiddenText[i].style.display = "none"
            allHiddenText[i].classList.remove("active")
            allProgress[i].classList.remove("active")
            allProgress[i].classList.remove("dieEffect")
            clearInterval(v)
        }
    } else {
        clearInterval(v)
    }
}

// article
// gallery
let allImg = document.querySelectorAll(".gallery .box img")
let allBoxGallery = document.querySelectorAll(".gallery .box")

// click
allBoxGallery.forEach((e, i) => e.addEventListener("click", () => {
    // create pop-up
    createPopup(e, i)
}))
function createPopup(e, i) {
    let popup = document.createElement("div")
    let popupImg = document.createElement("img")
    let overlay = document.createElement("div")
    let closePopup = document.createElement("div")
    closePopup.appendChild(document.createTextNode("X"))

    closePopup.classList.add("close")
    overlay.classList.add("overlay")
    popup.classList.add("popup")
    
    popupImg.src = allImg[i].src
    popup.append(popupImg)
    popup.appendChild(closePopup)
    document.body.prepend(popup)   
    document.body.prepend(overlay)   
    // diffrents ways to close popup
    // [1] click on close button
    closePopup.addEventListener("click", (e) => {
        popupClose(popup, overlay)
    })
    // [2] click on over to close
    overlay.addEventListener("click", (e) => {
        popupClose(popup, overlay)
    })
    // [3] keydown on escape key
    addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "escape") {
            popupClose(popup, overlay)
        }
    })
}
function popupClose(e, o) {
    e.classList.add("closed")
    o.classList.add("remove")
    setTimeout(() => {
        e.remove()
        o.remove()
    }, duration);
}
// gallery
// skills
let allSkillsProgress = document.querySelectorAll(".our-skills .progress .prog span"),
skills = document.querySelector(".our-skills"),
progress  = document.querySelector(".our-skills .progresses"),
allSkillsSpan = document.querySelectorAll(".our-skills .title span"),oneTime = true, prog;
allSkillsSpan.forEach((e) => e.innerHTML = "0%")

// if (this.scrollY >= (skills.offsetTop - skills.clientHeight) + progress.clientHeight + 30) {
//     checkY()
// }
//  && this.scrollY >= skills.offsetTop
onload = function () {
    checkY(this)
}
onscroll = function (e) {
    checkY(this)
    if (this.scrollY >= (skills.offsetTop - skills.clientHeight) + progress.clientHeight + 30 && prog === true) {
        progSkills()
    }
    statsIncrement()
    checkUp()
    // console.log(this.scrollY)
}
function checkY(e) {
    if (e.scrollY > skills.offsetTop) {
        prog = false
    } else {
        prog = true
    }
}
function progSkills() {
    if (oneTime === true) {
        allSkillsProgress.forEach((e) => {
            e.style.width = e.dataset.width
        })
        allSkillsSpan.forEach((e) => {
            let counter = 0;
            let interval = setInterval(() => {
                counter++;
                if (counter <= parseInt(e.dataset.span)) {
                    e.innerHTML = `${counter}%`
                } else {
                    this.clearInterval(interval)
                }
            }, 500 / parseInt(e.dataset.span));
        })
        oneTime = false
    }
}
// skills
// events
let spanYear = document.querySelector(".events .content .about .title span"),
currentDate = new Date();
let daysElement = document.querySelector(`.events .countdown .unites .unit[data-unit="days"]`),
hoursElement = document.querySelector(`.events .countdown .unites .unit[data-unit="hours"]`),
minutesElement = document.querySelector(`.events .countdown .unites .unit[data-unit="minutes"]`)
secondsElement = document.querySelector(`.events .countdown .unites .unit[data-unit="seconds"]`)
let submitButton = document.querySelector(`.events .container .subscribe .sub-btn`),
inputEmail = document.querySelector(`.events .container .subscribe input`),write = true;

spanYear.innerHTML = currentDate.getFullYear()

let dateDecrement = setInterval(() => {
    let currentDate = new Date()
    let specialDate = new Date(2022,9,28,12,00,00)
    let dateDiffrence = specialDate - currentDate;

    let days = Math.floor(dateDiffrence / (1000 * 60 * 60 * 24)),
    hours = Math.floor(dateDiffrence % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
    minutes = Math.floor(dateDiffrence % (1000 * 60 * 60) / (1000 * 60)),
    seconds = Math.floor(dateDiffrence % (1000 * 60) / (1000));

    daysElement.innerHTML = days < 10 ? `0${days}` : days
    hoursElement.innerHTML = hours < 10 ? `0${hours}` : hours
    minutesElement.innerHTML = minutes < 10 ? `0${minutes}` : minutes
    secondsElement.innerHTML = seconds < 10 ? `0${seconds}` : seconds
}, 1000)

if (localStorage.getItem("subscribeStatus") === "true") {
    subscribed()
}

submitButton.onclick = () => {
    let emailReg = new RegExp(/\w+@\w+.(com || net || org || mail)/ig)
    let email = inputEmail.value
    let match = [];
    match = email.match(emailReg)
    // check match
    if (match === null) {
        console.log(match)
        localStorage.setItem("subscribeStatus", false)
        inputEmail.value = "Invalid Email"
        inputEmail.style.color = "red"
        write = false;
        setTimeout(() => {
            inputEmail.style.color = "black"
            inputEmail.value = ""
            write = true
        }, 800);
    } else {
        console.log(match + "Eslse")
        localStorage.setItem("subscribeStatus", true)
        subscribed();
    }
}
inputEmail.oninput = () => {
    if (write === false) {
        inputEmail.blur()
        inputEmail.value = "Invalid Email"
        console.log("writer")
    }
}
inputEmail.onfocus = () => {
    if (write === false) {
        inputEmail.blur()
    }
} 

function subscribed() {
    inputEmail.style.opacity = "0"
    setTimeout(() => {
        inputEmail.remove()
    }, duration);
    submitButton.innerHTML = "Subscribed"
    submitButton.classList.add("active")
    write = false
}
// events
// plans
let popluarPlan = document.querySelector(".pricing-plans .popluar"),
label = document.createElement("div"),
labelText = document.createTextNode("Most Popular");

label.appendChild(labelText)
label.classList.add("label")

popluarPlan.append(label)

// plans
// video
let containerVideo = document.querySelector(".videos.div")
let listVideos = document.querySelector(".videos .holder .list ul")
let statsDiv = document.querySelector(".stats.div")
let video = document.querySelector(".my-video")
let myVideo = document.querySelector(".my-video > video")
let controlVideo = document.querySelector(".my-video .controls"),
mouseOverVid, mouseOverControl, clearControlTime, counterIdle, move, videoPlayed, defaultValue = "fa-solid", checkIdleStatus = false;

let videoContainer = document.querySelector(".videos .container")
let playBtn = document.querySelector(".my-video .icons .play")
let fullscreen = document.querySelector(".my-video .icons .fullscreen")
let picInPic = document.querySelector(".my-video .icons .picinpic")
let forward = document.querySelector(".my-video .icons .for")
let backward = document.querySelector(".my-video .icons .back")
let menuSetting = document.querySelector(".my-video .icons .settings")
let settingBtn = document.querySelector(".my-video .icons .settingBtn")
let allLisSetting = document.querySelectorAll(".my-video .icons .settings li")
let volumeBtn = document.querySelector(".my-video .icons .volumeBtn")
let volumeContainer = document.querySelector(".my-video .icons .volume-prog")
let volumeProgress = document.querySelector(`.my-video .icons input[type="range"]`)
let beforeThumb = document.querySelector(`.my-video .icons .fillValue`)
let videoCont = document.querySelector(".my-video .icons .volume")
let arrayOfVolume = ["fa-volume-high", "fa-volume-low", "fa-volume-off"]
// progress bar and duration video
let progressBar = document.querySelector(".my-video .controls .progress-bar .progress")
let targetTimeEle = document.querySelector(".my-video .duration .target")
let currentTimeEle = document.querySelector(".my-video .duration .current")
let intervalDuration, intervalProgress;

controlVideo.classList.add("active")

// play or pause and fullscreen
playBtn.addEventListener("click", () => {
    playOrPause()
})
myVideo.addEventListener("click", () => {
    playOrPause()
})
function playOrPause() {
    if (controlVideo.classList.contains("active")) {
        videoPlayed = true
        controlVideo.classList.remove("active")
    } else {
        videoPlayed = false
        checkIdleStatus = false
        clearInterval(counterIdle)
        video.classList.remove("idle")
        video.classList.add("hover")
    }
    changeIcon()
}
function changeIcon() {
    playBtn.classList.toggle("active")
    if (playBtn.classList.contains("active")) {
        videoPlayed = true
    } else {
        videoPlayed = false
    }
    if (videoPlayed === true) {
        myVideo.play()
        playBtn.classList.value = ""
        playBtn.classList.value = `${defaultValue} fa-pause play active`
    } else {
        myVideo.pause()
        controlVideo.classList.add("active")
        clearInterval(counterIdle)
        playBtn.classList.value = ""
        playBtn.classList.value = `${defaultValue} fa-play play`
    }
}
let x,y,i;
video.onmousemove = function (e) {
    x = e.x;
    y = e.y;
}
myVideo.onplay = function () {
    videoPlayed = true
    // scrolStatus = true  
    currentDuration()
    setCurrentValue()
    checkIdle(x, y)
}
myVideo.onpause = function () {
    videoPlayed = false
    clearInterval(intervalDuration)
    clearInterval(intervalProgress)
}
controlVideo.onmouseenter = function () {
    mouseOverControl = true;
    clearInterval(counterIdle)
}
controlVideo.onmouseleave = function () {
    mouseOverControl = false
    checkIdle(x, y)
}
function checkIdle() {
    let counter = 0
    let ox = x
    let oy = y
    if (videoPlayed === true && mouseOverControl === false) {
        let idle = setInterval(() => {
            if (x === ox && y === oy) {
                counter++;
                if (counter >= 3) {
                    video.classList.add("idle")
                    video.classList.remove("hover")
                    controlVideo.classList.remove("active")
                    menuSetting.classList.remove("active")
                    clearInterval(idle)
                    checkIdle(ox, oy)
                }
            } else {
                video.classList.remove("idle")
                video.classList.add("hover")
                clearInterval(idle)
                checkIdle(ox, oy)
            }
        }, 1000);
        counterIdle = idle;
    }
}
let scrolStatus = false
let fullscreenStatus = false

onkeydown = function (e) {
    // fullscreen
    if (this.scrollY >= containerVideo.offsetTop - videoContainer.clientHeight - 2 && this.scrollY <= statsDiv.offsetTop - statsDiv.clientHeight - parseInt(this.getComputedStyle(this.document.documentElement).getPropertyValue("--main-padding-top")) * 2 + 200 || fullscreenStatus === true) {
        scrolStatus = true
    } else {
        scrolStatus = false
    }
    if (scrolStatus === true) {
        switch (e.keyCode) {
            case 70:
                fullScreen();
                break;
            case 75:
                playOrPause()
                break;
            case 32:
                playOrPause()
                break;
            case 37:
                backWard()
                break;
            case 39:
                forWard()
                break;
            case 38:
                if (myVideo.volume + 0.1 >= 1) {
                    myVideo.volume = 1
                    changeVolume()
                    fillVolume()
                }
                myVideo.volume += 0.1
                volumeProgress.value = myVideo.volume * 100
                changeVolume()
                fillVolume()
                break;
            case 40:
                if (myVideo.volume - 0.1 <= 0) {
                    myVideo.volume = 0
                    changeVolume()
                    fillVolume()
                }
                myVideo.volume -= 0.1
                volumeProgress.value = myVideo.volume * 100
                changeVolume()
                fillVolume()
                break;
            default:
                break;
        }
    }
}
video.ondblclick = function (e) {
    let controlPath = false;
    for (let i = 0; i < e.path.length; i++) {
        if (e.path[i] === controlVideo) {
            controlPath = true
        }
    }
    if (controlPath === false) {
        fullScreen()
    }
}
fullscreen.onclick = function () {
    fullScreen();
}
picInPic.onclick = function () {
    pictureInPicture()
}
function fullScreen() {
    fullscreen.classList.toggle("active")
    if (fullscreen.classList.contains("active")) {
        video.requestFullscreen()
        fullscreenStatus = true
    } else {
        document.exitFullscreen()
        fullscreenStatus = false
    }
}
function pictureInPicture() {
    picInPic.classList.toggle("active")
    if (picInPic.classList.contains("active")) {
        myVideo.requestPictureInPicture()
        console.log("picinpic")
    } else {
        document.exitPictureInPicture();
    }
}
// play or pause and fullscreen
// progress bar and duration
// set all videos in list
let previewName = document.querySelector(".videos .preview .name-video")
let videos = ["Learn JavaScript In Arabic 2021 2.mp4", "Learn JavaScript In Arabic 2021.mp4"]
// let videos = ["Surat Almoumenon.mp4", "Learn JavaScript In Arabic 2021.mp4", "Suret Almoumon3.mp4", "Suret Almoumon4.mp4", "Suret Almoumon5.mp4", "Suret Almoumon6.mp4", "Suret Almoumon7.mp4", "Suret Almoumon8.mp4", "Suret Almoumon9.mp4"]
let srcVideo = "videos/name"
let allLisVideos = []
// let srcVideo = myVideo.baseURI.slice(0, myVideo.baseURI.lastIndexOf("/")) + "/videos/name"
// let videoListDuration = []
for (let i = 0; i < videos.length; i++) {
    let li = document.createElement("li")
    let liText = document.createTextNode(`${videos[i].slice(0, videos[i].lastIndexOf("."))}`)
    li.appendChild(liText)
    if (localStorage.getItem("videoIndex")) {
        if (i === parseInt(localStorage.getItem("videoIndex"))) {
            li.classList.add("active")
            myVideo.src = srcVideo.replace("name", `${videos[i]}`)
        }
    } else if (i === 0) {
        li.classList.add("active")
        myVideo.src = srcVideo.replace("name", `${videos[i]}`)
    }
    listVideos.append(li)
    allLisVideos.push(li)
}
setPreviewName()
function setPreviewName() {
    allLisVideos.forEach((e, i) => {
        if (e.classList.contains("active")) {
            previewName.textContent = `${videos[i].slice(0, videos[i].lastIndexOf("."))}`
        }   
    })
}
allLisVideos.forEach((e, i) => {
    e.addEventListener("click", () => {
        videoPlayed = false
        playBtn.classList.remove("active")
        playBtn.classList.remove("fa-pause")
        playBtn.classList.add("fa-play")
        allLisVideos.forEach((e) => {
            e.classList.remove("active")
        })
        e.classList.add("active")
        myVideo.src = srcVideo.replace("name", `${videos[i]}`)
        localStorage.setItem("videoIndex", i)
        setPreviewName()
        let int = setInterval(() => {
            if (isNaN(myVideo.duration) === false) {
                setTargetDuration()
                clearInterval(int)
            }
        }, 1);
    })
})
video.oncontextmenu = function (e) {
    e.preventDefault()
}

let int = setInterval(() => {
    if (isNaN(myVideo.duration) === false) {
        setTargetDuration()
        clearInterval(int)
    }
}, 1);

window.onload = function () {
    setTargetDuration()
}

if (sessionStorage.getItem("currentTime")) {
    myVideo.currentTime = sessionStorage.getItem("currentTime")
    setCurrentValue()
} else {
    myVideo.currentTime = 0;
    setCurrentValue()
}

function currentDuration() {
    let durationInterval = setInterval(() => {
        let second = Math.floor(myVideo.currentTime % (60))
        second = second  < 10 ? `0${second}` : second
        let minutes = Math.floor(myVideo.currentTime / 60);
        minutes = minutes  < 10 ? `0${minutes}` : minutes
        let hours = Math.floor(myVideo.currentTime / (60 * 60))
        hours = hours < 10 ? `0${hours}:` : hours === 0 ? "" : `${hours}:`
        currentTimeEle.innerHTML = `${parseInt(hours) === 0 ? "" : hours}${minutes}:${second}`;
    }, 1);
    intervalDuration = durationInterval
}
function setTargetDuration() {
    let targetHour = Math.floor(myVideo.duration / (60 * 60)),
    targetMin  = Math.floor(myVideo.duration / (60)),
    targetSec  = Math.floor(myVideo.duration % (60))

    targetHour = targetHour < 10 ? `0${targetHour}:` : targetHour === 0 ? "" : `${targetHour}:`;
    targetMin = targetMin < 10 ? `0${targetMin}` : `${targetMin}`;
    targetSec = targetSec < 10 ? `0${targetSec}` : `${targetSec}`;
    targetTimeEle.innerHTML = `${parseInt(targetHour) === 0 ? "" : targetHour}${targetMin}:${targetSec}`
}
setMaxValue()
function setMaxValue() {
    let interval = setInterval(() => {
        progressBar.max = myVideo.duration
        if (progressBar.max === myVideo.duration) {
            clearInterval(interval)
            // console.clear()
        }
    }, 1)
}
progressBar.oninput = function () {
    myVideo.currentTime = progressBar.value
    let max = progressBar.max
    let val = progressBar.value
    let value = (val / max) * 100
    progressBar.style.backgroundSize = `calc(${value}%) 100%`
    setCurrentValue()
}
function setCurrentValue() {
    let moveProgressInt = setInterval(() => {
        progressBar.value = myVideo.currentTime;
        let max = progressBar.max
        let val = progressBar.value
        let value = (val / max) * 100
        progressBar.style.backgroundSize = `calc(${value}%) 100%`
        saveCurretTimeLocalTime()
    }, 1)
    intervalProgress = moveProgressInt
    currentDuration()
}
function saveCurretTimeLocalTime() {
    sessionStorage.setItem("currentTime", myVideo.currentTime)
}
forward.onclick = function () {
    forWard()
}
backward.onclick = function () {
    backWard()
}
function forWard() {
    myVideo.currentTime += 10
    setCurrentValue()
}
function backWard() {
    myVideo.currentTime -= 10
    setCurrentValue()
}

// settings

if (sessionStorage.getItem("playback")) {
    myVideo.playbackRate = sessionStorage.getItem("playback")
}

allLisSetting.forEach((e) => {
    if (parseFloat(e.dataset.speed) === myVideo.playbackRate) {
        e.classList.add("active")
    } else {
        e.classList.remove("active")
    }
})
settingBtn.addEventListener("click", () => {
    menuSetting.classList.toggle("active")    
})
allLisSetting.forEach((e) => {
    e.addEventListener("click", function () {
        allLisSetting.forEach((e) => {
            e.classList.remove("active")
            clearInterval(counterIdle)
        })
        e.classList.add("active")
        myVideo.playbackRate = parseFloat(e.dataset.speed)
        sessionStorage.setItem("playback", myVideo.playbackRate)
    })
})
video.onmouseleave = function () {
    if (videoPlayed === true) {
        menuSetting.classList.remove("active")
    }
}
// volume
if (localStorage.getItem("volume")) {
    myVideo.volume = localStorage.getItem("volume")
    volumeProgress.value = localStorage.getItem("volume") * 100
    changeVolume()  
    fillVolume()
}
videoCont.onmouseenter = function () {
    volumeContainer.classList.add("active")
}
videoCont.onmouseleave = function () {
    volumeContainer.classList.remove("active")
}
volumeProgress.oninput = function (e) {
    changeVolume()
    fillVolume()
}
function fillVolume() {
    volumeProgress.value = myVideo.volume * 100
    let max = volumeProgress.max
    let val = volumeProgress.value
    let value = (val / max) * 100
    volumeProgress.style.backgroundSize = `calc(${value}%) 100%`
}
function changeVolume() {
    myVideo.volume = volumeProgress.value / 100
    localStorage.setItem("volume", myVideo.volume)
}
myVideo.onvolumechange = function () {
    iconChangeVolume()
};
function iconChangeVolume() {
    if (myVideo.volume <= 1 && myVideo.volume > 0.5) {
        reset()
        volumeBtn.classList.add("fa-volume-high")
    } else if (myVideo.volume !== 0) {
        reset()
        volumeBtn.classList.add("fa-volume-low")
    } else {
        reset()
        volumeBtn.classList.add("fa-volume-off")
    }
    function reset() {
        for (let i = 0 ; i < arrayOfVolume.length; i++) {
            volumeBtn.classList.remove(`${arrayOfVolume[i]}`)
        }
    }
}
// video
// stats

// statsDiv
let allStatNumber = document.querySelectorAll(".stats .box span.number")
let statOneTime = false
function statsIncrement() {
    if (statOneTime === false) {
        if (this.scrollY >= statsDiv.offsetTop - statsDiv.clientHeight - 150) {
            statOneTime = true
            allStatNumber.forEach((e, i) => {
                let counter = 0
                let interval = setInterval(() => {
                    if (counter >= e.dataset.num) {
                        clearInterval(interval)
                    } else {
                        counter++
                        if (e.innerHTML.indexOf("k".toUpperCase()) !== -1) {
                            allStatNumber[i].innerHTML = `${counter}K`
                        } else {
                            e.innerHTML = `${counter}`
                        }
                    }
                }, 500 / e.dataset.num)
            })
        }
    }
}

// stats
// discount
let allInputs = document.querySelectorAll(".discount .form .input")
let allInputsContainer = document.querySelectorAll(".discount .form .inputs")
allInputs.forEach((e, i) => {
    let progress = document.createElement("progress")
    progress.min = 0
    progress.max = e.attributes["maxlength"].value
    progress.classList.add("progress")
    allInputsContainer[i].append(progress)
    e.oninput = function () {
        progress.value = e.value.length
        e.onkeydown = function (e) {
            if (e.keyCode === 13) {
                if (i !== allInputs.length - 1) {
                    e.blur
                    allInputs[i + 1].focus()
                    console.log("ok")
                }
            }
        }
        if (progress.value === progress.max && i !== allInputs.length - 1) {
            e.blur
            allInputs[i + 1].focus()
            console.log("ok")
        }
    }
})
document.querySelector(".discount form").onsubmit = function (event) {
    let counter = 0;
    allInputs.forEach((e) => {
        if (e.value === "") {
            counter++
        }
        if (counter > 0) {
            event.preventDefault()
        }
    })
}
// discount
// another
let upBtn = document.querySelector(".to-top")

function checkUp() {
    if(this.scrollY >= 400) {
        upBtn.classList.add("active")
    } else {
        upBtn.classList.remove("active")
    }
}

upBtn.addEventListener("click", function () {
    scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

let btnDiscord = document.querySelectorAll(".discord");

btnDiscord.forEach((e, i) => {
    createDisPopup(i)
    e.addEventListener("click", function () {
        let discordPopups = document.querySelectorAll(".discordPopup");
        discordPopups[i].style.display = "block"
        setTimeout(() => {
            discordPopups[i].classList.toggle("active")
        }, duration);        
    })
})

function createDisPopup(i) {
    let discordPopup = document.createElement("div"),
    content = document.createTextNode("JTR_Major#5556")
    discordPopup.appendChild(content)

    discordPopup.classList.add("discordPopup")

    discordPopup.style.cssText = `
    position: absolute;
    color: white;
    background: rgb(54, 57, 63);
    padding: 10px;
    border-radius: 20px;
    z-index: 4;
    left: 50%;
    top: 0;
    transition: var(--mainTransition);
    font-size: 12px;
    transform: translate(-55%, 0) scale(0);
    display: none;
    `
    
    btnDiscord[i].append(discordPopup)
    
    discordPopup.parentElement.style.position = `relative`
}
// another
