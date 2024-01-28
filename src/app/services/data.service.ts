import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { fixturesQuery, matchesQuery, playerStatsQuery, playersQuery, standingsQuery, teamStatsQuery, teamsQuery } from '../../lib/queries'
import { SanityClientService } from '../sanity-client.service';
import { Club, Player, fixture } from './data.types';
import { format } from 'date-fns';
import { PlayerStats, TeamStats } from 'src/lib/@types';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private sanityClient: SanityClientService) { }
  private fixturesSubject: BehaviorSubject<fixture[]> = new BehaviorSubject<any>(null);
  private playedMatchesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private standingsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private playerStatsSubject: BehaviorSubject<Record<string,PlayerStats[]>> = new BehaviorSubject<any>(null);
  private clubsSubject: BehaviorSubject<Club[]> = new BehaviorSubject<any>(null);
  private playersSubject: BehaviorSubject<Player[]> = new BehaviorSubject<any>(null);
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private teamStatsSubject: BehaviorSubject<Record<string,TeamStats[]>> = new BehaviorSubject<any>(false);


  public readonly playedMatches$: Observable<any> = this.playedMatchesSubject.asObservable();
  public readonly standings$: Observable<any> = this.standingsSubject.asObservable();
  public readonly loading$: Observable<boolean> = this.loadingSubject.asObservable();
  public readonly fixtures$: Observable<fixture[]> = this.fixturesSubject.asObservable()
  public readonly clubs$: Observable<Club[]> = this.clubsSubject.asObservable()
  public readonly players$: Observable<Player[]> = this.playersSubject.asObservable()
  public readonly playerStats$: Observable<Record<string,PlayerStats[]>> = this.playerStatsSubject.asObservable()
  public readonly teamStats$: Observable<Record<string,TeamStats[]>> = this.teamStatsSubject.asObservable()


  async getMatches() {
    this.loadingSubject.next(true);
    await this.sanityClient
      .fetch(matchesQuery)
      .then(result => {
        this.playedMatchesSubject.next(result.map((e: any) => ({
          ...e, homeGoals: e.homeGoals ?? 0,
          awayGoals: e.awayGoals?? 0, date: format(new Date(e.date), 'dd MMMM yyyy')
        })));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        this.loadingSubject.next(false);
      });
  }

  public async getFixtures(): Promise<void> {
    this.loadingSubject.next(true);
    await this.sanityClient
      .fetch(fixturesQuery)
      .then(result => {
        this.fixturesSubject.next(result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        this.loadingSubject.next(false);
      });
  }

  async getClubs():Promise<void> {
    this.loadingSubject.next(true);
    await this.sanityClient
      .fetch(teamsQuery)
      .then(result => {
        this.clubsSubject.next(result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        this.loadingSubject.next(false);
      });
  }

  async getPlayers():Promise<void> {
    this.loadingSubject.next(true);
    await this.sanityClient
      .fetch(playersQuery)
      .then(result => {
        this.playersSubject.next(result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        this.loadingSubject.next(false);
      });
  }

  async getPlayerStats():Promise<void> {
    this.loadingSubject.next(true);
    await this.sanityClient
      .fetch(playerStatsQuery)
      .then(result => {
        console.log(result)
        const refinedValues = result.map((result:any) => ({
          ...result,
          goals: result.goals.reduce((accumulator:number, currentValue:{count:number}) => accumulator + currentValue.count, 0),
          assists: result.assists.reduce((accumulator:number, currentValue:{count:number}) => accumulator + currentValue.count, 0),
          passes: result.passes.reduce((accumulator:number, currentValue:number) => accumulator + currentValue, 0),
          tackles: result.tackles.reduce((accumulator:number, currentValue:number) => accumulator + currentValue, 0),
        }))
        console.log(refinedValues);
        const res = getPlayersStats(refinedValues);
        console.log(res);
        this.playerStatsSubject.next(res);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        this.loadingSubject.next(false);
      });
  }

  async getTeamStats():Promise<void> {
    this.loadingSubject.next(true);
    await this.sanityClient
      .fetch(teamStatsQuery)
      .then(result => {
        console.log(result)
        const refinedValues = result.map((result:any) => ({
          ...result,
          shots: result.shots.reduce((accumulator:number, currentValue:number) => accumulator + currentValue, 0),
          shotsOnTarget: result.shotsOnTarget.reduce((accumulator:number, currentValue:number) => accumulator + currentValue, 0),
          corners: result.corners.reduce((accumulator:number, currentValue:number) => accumulator + currentValue, 0),
          freeKicks: result.freeKicks.reduce((accumulator:number, currentValue:number) => accumulator + currentValue, 0),
        }))
        console.log(refinedValues)
        const res = getTeamStats(refinedValues);
        console.log(res);
        this.teamStatsSubject.next(res);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        this.loadingSubject.next(false);
      });
  }
  

  public async getStandings(): Promise<void> {
    this.loadingSubject.next(true);

    await this.sanityClient
      .fetch(standingsQuery)
      .then(result => {
        const res = calculateStats(result)
       return this.standingsSubject.next(res);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        this.loadingSubject.next(false);
      });
  }
}




// UTIL FUNCTIONS

// GETTING THE STANDINGS SORTED
interface Team {
  name: string;
  playedMatches: { forwardGoals: number; againstGoals: number }[];
  logo: string;
}

const calculateStats = (teams: Team[]) => {
  return teams.map(team => {
    const wins = team.playedMatches.filter(match => match.forwardGoals > match.againstGoals).length;
    const losses = team.playedMatches.filter(match => match.forwardGoals < match.againstGoals).length;
    const draws = team.playedMatches.filter(match => match.forwardGoals === match.againstGoals).length;
    const goalsFor = team.playedMatches.reduce((accumulator, currentValue) => accumulator + currentValue.forwardGoals, 0);
    const goalsAgainst = team.playedMatches.reduce((accumulator, currentValue) => accumulator + currentValue.againstGoals, 0);
    const goalsDifference = goalsFor - goalsAgainst;
    const playedMatches = team.playedMatches.length;
    const points = wins * 3 + draws;

    return {
      ...team,
      wins,
      losses,
      draws,
      playedMatches,
      points,
      goalsFor,
      goalsAgainst,
      goalsDifference
    };
  }).sort((a, b) => b.points - a.points);
};


// GETTING THE PLAYER STATS SORTED

const sortPlayersBy = (data: any[], stat:"assists" | "tackles" | "passes" | "goals"): PlayerStats[] => {
  return data.sort((a, b) => {
    const aValue: number = a[stat] as number;
    const bValue: number = b[stat] as number;
    return bValue - aValue;
  });
}
const getPlayersStats =(data:any[]): {
  mostTackles: PlayerStats[];
  mostPasses: PlayerStats[];
  mostAssists: PlayerStats[];
  mostGoals: PlayerStats[];
} => {
  return {
    mostTackles: sortPlayersBy(data,'tackles').map((e:any)=>({...e, value: e.tackles})).slice(0,10),
    mostPasses: sortPlayersBy(data,'passes').map((e:any)=>({...e, value: e.passes})).slice(0,10),
    mostAssists: sortPlayersBy(data,'assists').map((e:any)=>({...e, value: e.assists})).slice(0,10),
    mostGoals: sortPlayersBy(data,'goals').map((e:any)=>({...e, value: e.goals})).slice(0,10),
  };
}

// GETTNG TEAM STATS

const sortTeamsBy = (data: any[], stat:"corners" | "shotsOnTarget" | "shots" | "freeKicks"): TeamStats[] => {
  return data.sort((a, b) => {
    const aValue: number = a[stat] as number;
    const bValue: number = b[stat] as number;
    return bValue - aValue;
  });
}

const getTeamStats =(data:any[]): {
  mostCorners: TeamStats[];
  mostShotsOnTarget: TeamStats[];
  mostShots: TeamStats[];
  mostFreeKicks: TeamStats[];
} => {
  console.log(data);
  return {
    mostCorners: sortTeamsBy(data,'corners').map((e:any)=>({...e, value: e.corners})).slice(0,10),
    mostShotsOnTarget: sortTeamsBy(data,'shotsOnTarget').map((e:any)=>({...e, value: e.shotsOnTarget})).slice(0,10),
    mostShots: sortTeamsBy(data,'shots').map((e:any)=>({...e, value: e.shots})).slice(0,10),
    mostFreeKicks: sortTeamsBy(data,'freeKicks').map((e:any)=>({...e, value: e.freeKicks})).slice(0,10),
  };
}
