import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {


  heroes$!: Observable<Hero[]>; //sử dụng dấu "!" sau biến để bỏ qua kiểm tra null



  private searchTerms = new Subject<string>(); //Subject là một loại Observable
  //cho phép gửi và đăng ký lắng nghe các sự kiện và dữ liệu trên luồng observable

  constructor(private heroService: HeroService) { }


  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(), //kiểm tra khác nhau giữa từ khoá mới và cũ 

      // khi có giá trị obversable mới, thì switchmap sẽ huỷ obversable cũ để gửi obversable mới cho api
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}