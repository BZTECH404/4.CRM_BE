const Recurring = require("../models/Recurring");
const moment = require("moment"); // Install with npm install moment

const checkAndRunMissedTasks = async () => {
    const recurringTasks = await Recurring.find();

    console.log("\n[CHECKING FOR MISSED TASKS]");
    let executedTasks = 0;

    await recurringTasks.forEach(async (rec) => {
        // console.log(rec.lastRun)
        const now = moment();
        const lastRun = rec.lastRun ? moment(rec.lastRun) : null;

        console.log(`${shouldHaveRun(rec.frequency, lastRun, now)}- Task: ${rec.name} | Frequency: ${rec.frequency} | Last Run: ${lastRun ? lastRun.format("YYYY-MM-DD HH:mm:ss") : "Never"}`);

        // Determine if the task should have run but hasn't
        if (!lastRun || shouldHaveRun(rec.frequency, lastRun, now)) {
            console.log(`[EXECUTING MISSED TASK] ${rec.name} at ${now.format("YYYY-MM-DD HH:mm:ss")}`);
            rec.lastRun = now.toDate(); // Update lastRun timestamp
            await rec.save();
            executedTasks++;
            // console.log(executedTasks)
        }
    })

    console.log(`\n[CHECK COMPLETE] Executed ${executedTasks} missed tasks.\n`);
};

// Function to check if a task should have run but hasn't
const shouldHaveRun = (frequency, lastRun, now) => {
    const cronParts = frequency.split(" ");

    if (cronParts.length !== 5) {
        console.error(`[ERROR] Invalid cron format for task`);
        return false;
    }

    const [minute, hour, day, month, weekday] = cronParts.map(part => part.trim());

    // Generate all possible times the cron could have run between lastRun and now
    let checkTime = lastRun.clone();

    while (checkTime.isBefore(now)) {
        // Check if the time matches the cron schedule
        const matchesSchedule =
            (minute === "*" || checkTime.minute() == minute) &&
            (hour === "*" || checkTime.hour() == hour) &&
            (day === "*" || checkTime.date() == day) &&
            (month === "*" || checkTime.month() + 1 == month) &&
            (weekday === "*" || checkTime.day() == weekday);

        if (matchesSchedule) {
            return true;
        }

        // Move checkTime forward by one minute
        checkTime.add(1, "minute");
    }

    return false;
};

module.exports = checkAndRunMissedTasks;
