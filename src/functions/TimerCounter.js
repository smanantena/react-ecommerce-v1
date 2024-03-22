class TimerCounter {
    static timesCountesReload(counterDelayInSecond, setCounterFunc) {
        let counterTemp = counterDelayInSecond
        setCounterFunc(counterTemp);
        // setCountActived(true);
        // while (counterTemp > 0) {
        //   setInterval(() => {
        //     counterTemp--
        //     setCounterFunc(counterTemp)
        //     console.log(counter);
        //   }, 1000);
        // }
        setInterval(() => {
            setCounterFunc(--counterTemp);
            // console.log(counterTemp);
            if (counterTemp == 0) {
                clearInterval();
            }
        }, 1000);
        // setCountActived(false)
        setTimeout(() => {
            location.reload()
        }, counterDelayInSecond * 1000);
        ;
    }

}

export default TimerCounter;