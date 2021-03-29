function slider(timeBetweenChange = 15000, animationTime = 10000) {
    const countImages = 21;
    const images = [];

    for (let i=1; i<=countImages; i++) {
        const img = new Image();
        img.src = `images/bg${i}.jpg`;
        images.push(img);
    }

    let index = Math.floor(Math.random() * (images.length-1));
    document.body.style.backgroundImage = `url(${images[index].src})`;

    const bgEl = document.querySelector(".bg");

    function changeSlide() {
        index++;
        if (index > images.length - 1) {
            index = 0;
        }

        bgEl.style.backgroundImage = `url(${images[index].src})`;

        const anime = bgEl.animate([
            {
                opacity: 0,
                transform: `rotate(6deg) translate(0, -50px) scale(1.5)`
            },
            {
                opacity: 1,
                transform: `rotate(0deg) translate(0, 0) scale(1)`
            }
        ], {
            easing: 'ease-out',
            duration: animationTime,
            iterations: 1,
        })

        anime.onfinish = function() {
            document.body.style.backgroundImage = `url(${images[index].src})`;

            setTimeout(() => {
                changeSlide();
            }, timeBetweenChange)
        }
    }

    setTimeout(() => {
        changeSlide();
    }, timeBetweenChange)
}