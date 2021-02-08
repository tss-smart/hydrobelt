input.onButtonPressed(Button.A, function () {
    basic.pause(1000)
    nowTime = input.runningTime()
})
let STATE_GREET = 0
let nowTime = 0
let amountDrunk = 0
nowTime = input.runningTime()
let USER_TYPE_CHILD = 1
let USER_TYPE_ADULT = 2
let USER_TYPE_ELDERLY = 3
let DRINK_PERIOD_CHILD = 2700
let DRINK_PERIOD_ADULT = 3600
let DRINK_PERIOD_ELDERY = 2700
let DRINK_EACH_TIME_CHILD = 200
let DRINK_EACH_TIME_ADULT = 250
let DRINK_EACH_TIME_ELDERY = 200
let DRINK_AMOUNT_CHILD = 1500
let DRINK_AMOUNT_ADULT = 2000
let DRINK_AMOUNT_ELDERY = 2000
let STATE_SHOW_USER_TYPE = 1
let STATE_SHOW_AMOUNT_DRINK = 2
let STATE_WAITING = 3
let userType = USER_TYPE_CHILD
let nextRemindtime = nowTime + DRINK_PERIOD_CHILD
let state = STATE_GREET
basic.forever(function () {
    if (state == STATE_GREET) {
        basic.showString("HydroBelt")
    }
})
