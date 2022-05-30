export function dateToUnix(date) {
    return Math.floor(date.getTime() / 1000)
}

export function getMomentFormat(letter) {
    if (!letter || letter === 'f') return 'LLL'
    if (letter === 'D') return 'LL'
    if (letter === 'd') return 'L'
    if (letter === 'F') return 'LLLL'
    if (letter === 'T') return 'LTS'
    if (letter === 't') return 'LT'
}
