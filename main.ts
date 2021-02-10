
let STATE_GREET = 0
let STATE_SHOW_USER_TYPE = 1
let STATE_SHOW_AMOUNT_DRINK = 2
let STATE_WAITING = 3
let STATE_SHOW_SCREEN_SAVER = 4
let STATE_REMIND_DRINK = 5
let STATE_SHOW_GOAL_ACHIEVED = 6
let STATE_SHOW_GOAL_ACHIEVED_WAITING = 7

let USER_TYPE_CHILD = 0
let USER_TYPE_ADULT = 1
let USER_TYPE_ELDERLY = 2

let USER_TYPE_STRS = ["Child", "Adult", "Elderly"]

let DRINK_GOAL_AMOUNTS = [1600, 2000, 2000]
let DRINK_EACH_TIMES = [200, 250, 200]

// let DRINK_PERIODS = [2700, 3600, 2700] // in seconds
let DRINK_PERIODS = [2700, 3600, 2700] // in seconds

let SCREEN_SAVER_PERIOD = 10 // in seconds

let userType = USER_TYPE_CHILD
let nextRemindTime = 0
let nextScreenSaveTime = 0
let nextShowGoalAchievedTime = 0
let nextBackWaitingTime = 0
let state = 0
let amountDrunk = 0

input.onButtonPressed(Button.A, function () {
    if (state == STATE_WAITING) {
        amountDrunk += DRINK_EACH_TIMES[userType]
        if (amountDrunk >= DRINK_GOAL_AMOUNTS[userType])
            state = STATE_SHOW_GOAL_ACHIEVED
        else
            state = STATE_SHOW_AMOUNT_DRINK          
    }
    else if (state == STATE_SHOW_GOAL_ACHIEVED_WAITING)
    {
        state = STATE_SHOW_USER_TYPE
    }
})

input.onButtonPressed(Button.B, function () {
    if (state == STATE_WAITING) {
        amountDrunk -= DRINK_EACH_TIMES[userType]
        if (amountDrunk <0)
            amountDrunk = 0 
        state = STATE_SHOW_AMOUNT_DRINK                
    }
    
})

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (state == STATE_WAITING) {
        userType += 1
        if (userType > USER_TYPE_ELDERLY)
            userType = USER_TYPE_CHILD        
        state = STATE_SHOW_USER_TYPE
    }
})

basic.forever(function () {
    if (state == STATE_GREET) {
        basic.showString("HydroBelt!", 100)
        state = STATE_SHOW_USER_TYPE
    } else if (state == STATE_SHOW_USER_TYPE) {
        amountDrunk = 0 
        basic.clearScreen()       
        basic.showString(USER_TYPE_STRS[userType], 100)
        state = STATE_SHOW_AMOUNT_DRINK
    } else if (state == STATE_SHOW_AMOUNT_DRINK) {
        basic.showString(amountDrunk.toString() + "ml", 100)
        nextScreenSaveTime = input.runningTime() + SCREEN_SAVER_PERIOD*1000
        nextRemindTime = input.runningTime() + DRINK_PERIODS[userType]*1000
        state = STATE_WAITING
    } else if (state == STATE_WAITING) {
        if (input.runningTime()>nextScreenSaveTime)
        {
            state=STATE_SHOW_SCREEN_SAVER
        } else if (input.runningTime()>nextRemindTime) 
        {
            state=STATE_REMIND_DRINK
        }
    } else if (state == STATE_REMIND_DRINK) {
        music.startMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once)
        nextRemindTime += DRINK_PERIODS[userType]*1000
        state=STATE_WAITING       
    } else if (state == STATE_SHOW_SCREEN_SAVER) {

    } else if (state == STATE_SHOW_GOAL_ACHIEVED) {
        basic.clearScreen()
        basic.showString("Goal!"+amountDrunk.toString() + "ml", 100)
        basic.showIcon(IconNames.Happy)
        nextShowGoalAchievedTime = input.runningTime() + 2000 
        state = STATE_SHOW_GOAL_ACHIEVED_WAITING
    } else if (state == STATE_SHOW_GOAL_ACHIEVED_WAITING) {
        if (input.runningTime()>=nextShowGoalAchievedTime)
            state = STATE_SHOW_GOAL_ACHIEVED
    }
})


