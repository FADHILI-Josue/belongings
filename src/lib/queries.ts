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
export const matchQuery = `
*[_type == 'match' && _id==$id] {
  venue,
  homeTeam->{
    name,
    "logo": logo.asset->url
    },
  awayTeam->{
    name,
    "logo": logo.asset->url
  },
  'homeTeamGoals': count(goals[scorer->team->_id == ^.homeTeam->_id]),
  'awayTeamGoals': count(goals[scorer->team->_id == ^.awayTeam->_id ]),
  "homeTeamEvents": [
    ...goals[team._ref == ^.homeTeam->_id]{
      "player":scorer->name + " ⚽",
      timestamp
    },
    ...yellowCards[team._ref == ^.homeTeam->_id]{
      "player":player->name + " 🟨",
      timestamp
    },
    ...redCards[team._ref == ^.homeTeam->_id]{
      "player":player->name + " 🟥",
      timestamp
    },
  ] | order(timestamp),
  "awayTeamEvents": [ 
    ...goals[team._ref == ^.awayTeam->_id]{
      "player":scorer->name + " ⚽",
      timestamp
    },
    ...yellowCards[team._ref == ^.awayTeam->_id]{
      "player":player->name + " 🟨",
      timestamp
    },
    ...redCards[team._ref == ^.awayTeam->_id]{
      "player":player->name + " 🟥",
      timestamp
    },
  ] | order(timestamp),
  manOfTheMatch->{name},
  "homeTeamAccuracy": teamStats[team->_id == ^.homeTeam->_id]{
    cornersAccuracy,
    shootingAccuracy,
    passAccuracy,
    tackleAccuracy,
    freeKickAccuracy
  }[0],
  "awayTeamAccuracy":
    teamStats[team->_id == ^.awayTeam->_id]{
    cornersAccuracy,
    shootingAccuracy,
    passAccuracy,
    tackleAccuracy,
    freeKickAccuracy,
  }[0],
  clubReport,
  "referee": referee->name,
  "homeTeamStats": teamStats[team->_id == ^.homeTeam->_id] {
    corners,
    shotsOnTarget,
    shots,
    freeKicks,
    possession,
    Offsides,
    foulsConceded,
    "passes": math::sum(^.passes[team->_id == ^.^.homeTeam->_id].passes),
    "tackles": math::sum(^.tackles[team->_id == ^.^.homeTeam->_id].tackles),
    "yellowCards":coalesce(count( ^.yellowCards[team->_id == ^.^.homeTeam->_id])),
    "redCards":coalesce(count( ^.redCards[team->_id == ^.^.homeTeam->_id]),0),
  }[0],
  "awayTeamStats": teamStats[team->_id == ^.awayTeam->_id] {
    corners,
    shotsOnTarget,
    shots,
    freeKicks,
    possession,
    Offsides,
    foulsConceded,
    "passes": math::sum(^.passes[team->_id == ^.^.awayTeam->_id].passes),
    "tackles": math::sum(^.tackles[team->_id == ^.^.awayTeam->_id].tackles),
    "yellowCards":coalesce(count( ^.yellowCards[team->_id == ^.^.awayTeam->_id])),
    "redCards":coalesce(count( ^.redCards[team->_id == ^.^.awayTeam->_id]),0),
  }[0],
  homeTeamLineup{
    formation,
    startingEleven[]->{name, position}
  },
  awayTeamLineup{
    formation,
    startingEleven[]->{name, position}
  }
}
`

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
  'homeGoals': count(goals[scorer->team->_id == ^.homeTeam->_id]),
  'awayGoals': count(goals[scorer->team->_id == ^.awayTeam->_id ])
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