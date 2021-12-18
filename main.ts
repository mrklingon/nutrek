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
let newY = 0
let newX = 0
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
Ship.set(LedSpriteProperty.Direction, 0)
basic.forever(function () {
    if (moving == 1) {
        Ship.move(1)
        newX = Ship.get(LedSpriteProperty.X)
        newY = Ship.get(LedSpriteProperty.Y)
        if (Ship.isTouchingEdge()) {
            if (Ship.get(LedSpriteProperty.X) == 0) {
                newX = 4
            }
            if (Ship.get(LedSpriteProperty.X) == 4) {
                newX = 0
            }
            if (Ship.get(LedSpriteProperty.Y) == 4) {
                newY = 0
            }
            if (Ship.get(LedSpriteProperty.Y) == 0) {
                newY = 4
            }
            Ship.set(LedSpriteProperty.X, newX)
            Ship.set(LedSpriteProperty.Y, newY)
        }
        basic.pause(300)
        if (Ship.isTouching(Starbase)) {
            moving = 0
            Station.showImage(0)
        }
    }
})
