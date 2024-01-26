import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { fixturesQuery, matchQuery, matchesQuery, playersQuery, standingsQuery, teamsQuery } from '../../lib/queries'
import { SanityClientService } from '../sanity-client.service';
import { Club, Player, fixture } from './data.types';
import { format } from 'date-fns';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private sanityClient: SanityClientService) { }
  private fixturesSubject: BehaviorSubject<fixture[]> = new BehaviorSubject<any>(null);
  private playedMatchesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private standingsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private clubsSubject: BehaviorSubject<Club[]> = new BehaviorSubject<any>(null);
  private playersSubject: BehaviorSubject<Player[]> = new BehaviorSubject<any>(null);
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  public readonly playedMatches$: Observable<any> = this.playedMatchesSubject.asObservable();
  public readonly standings$: Observable<any> = this.standingsSubject.asObservable();
  public readonly loading$: Observable<boolean> = this.loadingSubject.asObservable();
  public readonly fixtures$: Observable<fixture[]> = this.fixturesSubject.asObservable()
  public readonly clubs$: Observable<Club[]> = this.clubsSubject.asObservable()
  public readonly players$: Observable<Player[]> = this.playersSubject.asObservable()


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

