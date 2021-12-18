input.onButtonPressed(Button.A, function () {
    Ship.turn(Direction.Left, 45)
})
input.onButtonPressed(Button.AB, function () {
    if (moving == 0) {
        moving = 1
    } else {
        moving = 0
    }
})
input.onButtonPressed(Button.B, function () {
    Ship.turn(Direction.Right, 45)
})
let moving = 0
let Ship: game.LedSprite = null
let StationPan = images.createBigImage(`
    # . . . . . . # . .
    . . . # . . # # # .
    . . . . . . # # # .
    . . # . . . . # . .
    . . . . . . . # . .
    `)
let Station = images.createImage(`
    . . # . .
    . # # # .
    . # # # .
    . . # . .
    . . # . .
    `)
StationPan.scrollImage(1, 200)
basic.pause(2000)
let Starbase = game.createSprite(2, 1)
Ship = game.createSprite(4, 4)
moving = 1
basic.forever(function () {
    if (moving == 1) {
        Ship.move(1)
        Ship.ifOnEdgeBounce()
        basic.pause(100)
    }
})
