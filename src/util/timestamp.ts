export type MomentFormat = 'LLL' | 'LL' | 'L' | 'LLLL' | 'LTS' | 'LT'

export const DISCORD_FORMATS = [undefined, 'd', 'D', 'f', 'F', 'R', 't', 'T'] as const
export type DiscordFormat = (typeof DISCORD_FORMATS)[number]

export function getMomentFormat(letter: DiscordFormat): MomentFormat {
    if (letter === 'f') return 'LLL'
    if (letter === 'D') return 'LL'
    if (letter === 'd') return 'L'
    if (letter === 'F') return 'LLLL'
    if (letter === 'T') return 'LTS'
    if (letter === 't') return 'LT'
    return 'LLL'
}
