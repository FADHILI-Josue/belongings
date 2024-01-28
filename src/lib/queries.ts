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

export const playerStatsQuery = `*[_type == 'player'] {
  _id,
  name,
  team->{
    name,
    "logo": logo.asset->url
  },
  'goals': coalesce(*[_type == 'match' && ^._id in goals[].scorer._ref]{
    "count": count(goals[^.^._id == scorer._ref]),
  }, 0),
  'assists': coalesce(*[_type == 'match' && ^._id in assists[].assister._ref]{
    "count": count(assists[^.^._id == assister._ref]),
  }, 0),
  'passes': *[_type == 'match' && ^._id in passes[].player._ref].passes[^._id == player._ref].passes,
  'tackles': *[_type == 'match' && ^._id in tackles[].player._ref].tackles[^._id == player._ref].tackles,
}
`

const playerStatsQueryOnMatch = `*[_type == 'match' && (
    references($playerId, homeTeam[*].players) || references($playerId, awayTeam[*].players)
)]`

export const playersQuery = `
*[_type == 'player'] {
  name,
  position,
  "image": coalesce(image.asset->url,"https://images2.minutemediacdn.com/image/upload/c_crop,w_4026,h_2264,x_0,y_125/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/GettyImages/mmsport/90min_en_international_web/01h9t34b6e4f292pncf7.jpg"),
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

export const teamStatsQuery = `
*[_type == 'team'] {
  name,
  abbr,
  stadium,
  'image': logo.asset->url,
  'corners': *[_type == 'match' && (^._id == homeTeam._ref || ^._id == awayTeam._ref) && status=="played"].teamStats[^._id==team._ref].corners,
  'shotsOnTarget': *[_type == 'match' && (^._id == homeTeam._ref || ^._id == awayTeam._ref) && status=="played"].teamStats[^._id==team._ref].shotsOnTarget,
  'shots': *[_type == 'match' && (^._id == homeTeam._ref || ^._id == awayTeam._ref) && status=="played"].teamStats[^._id==team._ref].shots,
  'freeKicks': *[_type == 'match' && (^._id == homeTeam._ref || ^._id == awayTeam._ref) && status=="played"].teamStats[^._id==team._ref].freeKicks,
}
`