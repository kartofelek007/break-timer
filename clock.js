class Clock {
    constructor() {
    }

    lz(i) {
        return `${i}`.padStart(2, "0");
    }

    setTimer(minutes) {
        this.startDate = new Date().getTime();
        this.now = new Date();
        this.targetDate = this.now.getTime() + minutes*60000;
    }

    count() {
        const now = new Date();
        const nowTime = now.getTime();
        const timeDifference = (this.targetDate - nowTime);
        if (timeDifference <= 0) {
            return {
                time : {
                    days : 0,
                    hours : 0,
                    minutes : 0,
                    seconds : 0
                },
                progress : 100
            }
        }
        const msInADay = 24 * 60 * 60 * 1000; //1 dzień w milisekundach - to w nich przecież zwracany czas metodą getTime

        //const newDate = new Date();
        //newDate.setTime(importantDate.getTime() - now.getTime())


        const eDaysToDate = timeDifference / msInADay;
        const daysToDate = Math.floor(eDaysToDate);

        //musimy tutaj sprawdzić, czy powyższa zmienna nie jest 0,
        //bo inaczej poniżej byśmy mieli dzielenie przez 0
        let daysToDateFix = (daysToDate < 1)? 1 : daysToDate;

        const eHoursToDate = (eDaysToDate % daysToDateFix)*24;
        const hoursToDate = Math.floor(eHoursToDate);

        const eMinutesToDate = (eHoursToDate - hoursToDate)*60;
        const minutesToDate = Math.floor(eMinutesToDate);

        const eSecondsToDate = Math.floor((eMinutesToDate - minutesToDate)*60);
        const secondsToDate = Math.floor(eSecondsToDate);

        const sum = (this.targetDate - this.startDate);
        const part = (nowTime - this.startDate);
        const progress = Math.min(100, part / sum * 100);

        return {
            time: {
                days: daysToDate,
                hours: hoursToDate,
                minutes: minutesToDate,
                seconds: secondsToDate
            },
            progress
        }
    }
}