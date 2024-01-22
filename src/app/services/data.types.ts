interface FixtureTeam {
    name: String,
    teamId: String,
    logo: string,
    abbr: string
}
export interface fixture {
    _id: String
    date: Date
    venue: String
    homeTeam: FixtureTeam
    awayTeam: FixtureTeam
    referee: String
}

export interface Club {
    name: String,
    logo: String
}

export interface Player {
    name: String,
    image: String,
    position: playerPosition,
    team : {
        logo: String,
        name: string
    }
}

export enum playerPosition {
    GK = "Goalkeeper",
    CB = "Center Back",
    FB = "Fullback",
    WB = "Wing Back",
    CM = "Central Midfielder",
    DM = "Defensive Midfielder",
    AM = "Attacking Midfielder",
    WM = "Winger",
    CF = "Central Forward",
    ST = "Striker",
    W = "Wide Player",
}