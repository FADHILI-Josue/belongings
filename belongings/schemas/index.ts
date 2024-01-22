import blockContent from './objects/blockContent'
import match from './documents/match'
import player from './documents/player'
import team from './documents/team'
import referee from './documents/referee'
import socialMedia from './objects/socialMedia'
import coach from './documents/coach'
import lineup from './objects/lineup'

export const schemaTypes = [
  // Document types
  team,
  player,
  match,
  referee,
  coach,

  // Other types
  blockContent,
  socialMedia,

  // objects
  lineup
]
