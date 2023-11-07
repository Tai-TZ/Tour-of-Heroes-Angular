import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL web api



  constructor(private messageService: MessageService, private http: HttpClient) {  //tiem MessageService vao 

  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message} `)
  }



  private handleError<T>(operation = 'operation', result?: T) {  //name act   -    option 
    return (error: any): Observable<T> => { //nhận error từ catcherror
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T); //trả về observable[] và không bị dừng khi lỗi
    };
  }



  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')), //tap thực hiện 1 act phụ 
        catchError(this.handleError<Hero[]>('getHeroes', [])) //xử lý lỗi, trả về mảng rỗng
      );
  }



  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetch hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }




  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) //option send data JSON
  }
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`update hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      )

  }


  //POST: thêm mới hero
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`added hero id=${_.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      )
  }


  //DELETE: xoa hero
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`delete hero id= ${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      )
  }



  // GET search: tim kiem
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]) // "of" trả về 1 luồng Observable rỗng 
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe( //hàm pipe dùng để xử lý luồng observable ngay sau khi nhận respon từ server
      tap(x => x.length ? this.log(`Found heroes matching "${term}"`) : this.log(`No heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    )
  }

} 