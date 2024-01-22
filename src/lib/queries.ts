// const getMatchs

export const standingsQuery = `*[_type == 'team'] {
  name,
  abbr,
  'image': logo.asset->url,
  'playedMatches': *[_type == 'match' && (^._id == homeTeam._ref || ^._id == awayTeam._ref) && status in ["played", "forfeit"]] {
    'forwardGoals': coalesce(count(goals[team->_id == ^.^._id]), 0),
    "againstGoals": coalesce(count(goals[team->_id != ^.^._id]), 0),
  },
}
`

export const fixturesQuery = `*[_type == 'match' && status == 'fixture'] | order(date asc) {
  _id,
  date,
  venue,
  'homeTeam': {
    'name': homeTeam->name,
    'abbr': homeTeam->abbr,
    'teamId': homeTeam->_id,
    'logo':homeTeam->logo.asset->url
  },
  'awayTeam': {
    'name': awayTeam->name,
    'abbr': awayTeam->abbr,
    'teamId': awayTeam->_id,
    'logo':awayTeam->logo.asset->url
  },
  'referee': referee->name,
}
`
export const matchQuery = `*[_type == 'match' && status=='played' && _id==$id] | order(date asc) {
  _id,
  date,
  venue,
  'homeTeam': {
    'name': homeTeam->name,
    'abbr': homeTeam->abbr,
    'teamId': homeTeam->_id,
  },
  'awayTeam': {
    'name': awayTeam->name,
    'abbr': awayTeam->abbr,
    'teamId': awayTeam->_id,
  },
  'referee': referee->name,
  goals[] {
      scorer->{
        'id':_id,
        wearingNumber,
        name,
        position
      },
      timestamp
  },
  assists[] {
    assister->{
      'id':_id,
      wearingNumber,
      name,
      position
    },
    timestamp
  },
  yellowCards[]-> {
    name,
    wearingNumber,
    position,
    "image": image.asset->url
  },
  redCards[]-> {
    name,
    wearingNumber,
    position,
    "image": image.asset->url
  },
  teamStats[] {
    team->{
      "id": _id,
      name,
      abbr
    },
    corners,
    shotsOnTarget,
    shots,
    freeKicks,
    possession
  },
  homeTeamLineup {
    formation,
    startingEleven[]->{
      "image":image.asset->url,
      position,
      
    }
  },
  awayTeamLineup {
    formation,
    startingEleven[]->{
      "image":image.asset->url,
      position,
      
    }
  },
}`

export const matchesQuery = `*[_type == 'match' && status=='played'] | order(date asc) {
  _id,
  venue,
  date,
  homeTeam->{
    name,
    abbr,
    "logo":logo.asset->url,
  },
  awayTeam->{
    name,
    abbr,
    "logo":logo.asset->url,
  },
  'homeGoals': count(goals[scorer->team->name == ^.homeTeam->name]),
  'awayGoals': count(goals[scorer->team->name == ^.awayTeam->name ])
}
`

const playerStatsQuery = `*[_type == 'player'] {
  _id,
  name,
  'goals': count(*[_type == 'match' && ^._id in goals[].scorer._ref]),
  'assists': count(*[_type == 'match' && ^._id in assists[].assister._ref]),
  'passes': count(*[_type == 'match' && ^._id in passes[].player._ref]),
  'tackles': count(*[_type == 'match' && ^._id in tackles[].player._ref])
}
`

const playerStatsQueryOnMatch = `*[_type == 'match' && (
    references($playerId, homeTeam[*].players) || references($playerId, awayTeam[*].players)
)]`

export const playersQuery = `
*[_type == 'player'] {
  name,
  position,
  "image": coalesce(image.asset->url,"https://www.elfutbolero.us/_next/image?url=https%3A%2F%2Fwww.elfutbolero.us%2Fimage%2Felfutbolerous%2Fthe-footballer-who-shines-in-europe-and-who-real-madrid-are-looking-for-1702068663-hq.webp&w=3840&q=75"),
    team->{
      name,
      "logo": logo.asset->url
    }
  
}
`

export const teamsQuery = `
*[_type == 'team'] {
  name,
  "logo":logo.asset->url
}
`