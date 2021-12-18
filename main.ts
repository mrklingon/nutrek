input.onButtonPressed(Button.A, function () {
    Ship.turn(Direction.Left, 45)
})
function DoGenesis () {
    for (let index = 0; index < 49; index++) {
        Universe.push(0)
        Stations.push(0)
    }
    for (let index = 0; index <= Diameter * Diameter - 1; index++) {
        if (randint(0, 10) < 4) {
            Universe[index] = randint(1, 3)
        }
        if (randint(0, 10) < 4) {
            Stations[index] = 1
            Universe[index] = 0
        }
    }
}
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
function uniIndx () {
    Spot = qX + qY * Diameter
    return Spot
}
function enterQ () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    Mode = AtStars
    moving = 0
    for (let value of Enemies) {
        value.delete()
    }
    if (Stations[uniIndx()] == 1) {
        StationPan.scrollImage(1, 200)
        Mode = AtStat
    } else {
        Pan.scrollImage(1, 200)
        if (Universe[uniIndx()] > 0) {
            Mode = AtEnemies
            basic.showLeds(`
                . # # # .
                . # . . .
                . # # . .
                . # . . .
                . # # # .
                `)
            basic.pause(100)
            for (let index = 0; index < Universe[uniIndx()]; index++) {
                Enemies.push(game.createSprite(randint(0, 4), randint(0, 4)))
            }
            for (let value of Enemies) {
                value.set(LedSpriteProperty.Direction, randint(0, 360))
            }
        }
    }
}
let newY = 0
let newX = 0
let Loc = 0
let Spot = 0
let qY = 0
let qX = 0
let moving = 0
let Ship: game.LedSprite = null
let Pan: Image = null
let StationPan: Image = null
let Mode = 0
let AtEnemies = 0
let AtStat = 0
let AtStars = 0
let Enemies: game.LedSprite[] = []
let Stations: number[] = []
let Universe: number[] = []
let Diameter = 0
Diameter = 7
Universe = []
Stations = []
Enemies = []
AtStars = 0
AtStat = 1
AtEnemies = 2
Mode = 0
game.setLife(5)
StationPan = images.createBigImage(`
    # . . . . . . # . .
    . . . # . . # # # .
    . . . . . . # # # .
    . . # . . . . # . .
    . . . . . . . # . .
    `)
Pan = images.createBigImage(`
    . . . . . . . # . .
    . . . # . . . . . .
    # . . . . . . . # .
    . . # . . . # . . .
    . . . . . . . . . .
    `)
let Station = images.createImage(`
    . . # . .
    . # # # .
    . # # # .
    . . # . .
    . . # . .
    `)
DoGenesis()
basic.pause(2000)
let Starbase = game.createSprite(2, 1)
Ship = game.createSprite(3, 3)
moving = 1
Ship.set(LedSpriteProperty.Direction, 0)
qX = 3
qY = 3
enterQ()
basic.forever(function () {
    if (moving == 1) {
        Loc = uniIndx()
        Ship.move(1)
        newX = Ship.get(LedSpriteProperty.X)
        newY = Ship.get(LedSpriteProperty.Y)
        if (Ship.isTouchingEdge()) {
            if (Ship.get(LedSpriteProperty.X) == 0) {
                newX = 4
                qX += -1
                if (qX < 0) {
                    qX = Diameter - 1
                }
            }
            if (Ship.get(LedSpriteProperty.X) == 4) {
                newX = 0
                qX += 1
                if (qX > Diameter - 1) {
                    qX = 0
                }
            }
            if (Ship.get(LedSpriteProperty.Y) == 4) {
                newY = 0
                qY += 1
                if (qY > Diameter - 1) {
                    qY = 0
                }
            }
            if (Ship.get(LedSpriteProperty.Y) == 0) {
                newY = 4
                qY += -1
                if (qY < 0) {
                    qY = Diameter - 1
                }
            }
            Ship.set(LedSpriteProperty.X, newX)
            Ship.set(LedSpriteProperty.Y, newY)
        }
        basic.pause(400)
        if (Ship.isTouching(Starbase)) {
            moving = 0
            Station.showImage(0)
            game.addLife(1)
        }
        if (Loc != uniIndx()) {
            enterQ()
        }
    }
})
basic.forever(function () {
    if (AtEnemies == Mode) {
        for (let value of Enemies) {
            value.move(1)
            value.ifOnEdgeBounce()
            if (Ship.isTouching(value)) {
                game.removeLife(1)
            }
            basic.pause(500)
        }
    }
})
