class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.intervalId = null;
    }

    addClock(time, callback) {
        if (!time || !callback) {
            throw new Error('Отсутствуют обязательные аргументы');
        }

        if (this.alarmCollection.some(alarm => alarm.time === time)) {
            console.warn('Уже присутствует звонок на это же время');
        }

        this.alarmCollection.push({
            time: time,
            callback: callback,
            canCall: true
        });
    }

    removeClock(time) {
        this.alarmCollection = this.alarmCollection.filter(alarm => alarm.time !== time);
    }

    getCurrentFormattedTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    start() {
        if (this.intervalId !== null) {
            return;
        }

        this.intervalId = setInterval(() => {
            const currentTime = this.getCurrentFormattedTime();

            this.alarmCollection.forEach(alarm => {
                if (alarm.time === currentTime && alarm.canCall) {
                    alarm.canCall = false;
                    alarm.callback();
                }
            });
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    resetAllCalls() {
        this.alarmCollection.forEach(alarm => {
            alarm.canCall = true;
        });
    }

    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    }
}

const alarm = new AlarmClock();

alarm.addClock("06:45", () => console.log("Подъем!"));
alarm.addClock("06:47", () => console.log("Вставай!"));
alarm.addClock("06:45", () => console.log("Снова 06:45"));

alarm.start();
