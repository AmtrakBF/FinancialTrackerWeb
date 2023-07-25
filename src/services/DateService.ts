export default {
    GetMonth(monthNum:number, yearNum:number) : {week:number, days:Date[]}[] {
        let firstDateOfMonth = new Date(yearNum, monthNum)

        let lastDayOfMonth = new Date(yearNum, monthNum+1)
        lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 1);

        let weekIndex = 0
        let week = [] as Date[]
        let month = [] as {week:number, days:Date[]}[]

        let beforeMonthDayCount = firstDateOfMonth.getDay() - 0
        let afterMonthDayCount = 6 - lastDayOfMonth.getDay()

        const maxIterations = beforeMonthDayCount + afterMonthDayCount + lastDayOfMonth.getDate()
        
        for (let x = 0; x < maxIterations; x++) {
            let currentDate = new Date(yearNum, monthNum)
            currentDate.setDate(firstDateOfMonth.getDate() - beforeMonthDayCount)

            currentDate.setDate(currentDate.getDate() + x)
            week.push(currentDate)

            if (currentDate.getDay() == 6) {
                month.push({week:weekIndex++, days:week})
                week = []
            }
        }
        
        return month
    }
}