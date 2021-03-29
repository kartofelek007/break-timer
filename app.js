const clock = new Clock();
const timerEl = document.querySelector(".timer-clock");
const timerElShadow = document.querySelector(".timer-clock-shadow");

const timerBar = document.querySelector(".timer-bar-progress");
const timerBg = document.querySelector(".timer-bg");

slider();

//aktualny ustawiony czas
let timeSet = 0;

function makeTimeSelect() {
    const targetEl = document.querySelector(".bar");
    const timeArr = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

    for (const time of timeArr) {
        const btn = document.createElement("button");
        btn.dataset.time = time;
        btn.addEventListener("click", e => {
            [...btn.parentElement.children].forEach(el => el.classList.remove("active"));
            btn.classList.add("active");
            timeSet = +btn.dataset.time;
            clock.setTimer(timeSet);
            timerEl.parentElement.classList.add("active");
            showClock();
        });
        btn.innerText = time;
        targetEl.append(btn);
    }
}

document.addEventListener("wheel", e => {
    if (e.deltaY < 0) {
        timeSet++;
    } else {
        timeSet--;
    }
    timeSet = Math.max(0, timeSet);
    clock.setTimer(timeSet);
    timerEl.parentElement.classList.add("active");
    showClock();
})

makeTimeSelect();

function showClock() {
    const {time, progress} = clock.count();

    [timerEl, timerElShadow].forEach(el => {
        el.innerHTML = `
            <span>${Math.floor(time.minutes / 10)}</span>
            <span>${time.minutes % 10}</span>
            :
            <span>${Math.floor(time.seconds / 10)}</span>
            <span>${time.seconds % 10}</span>
        `
    });

    timerBar.style.width = `${progress}%`
    timerBg.style.width = `${progress}%`

    requestAnimationFrame(showClock);
}



