import { Component, Input } from '@angular/core';
import { Hero } from '../hero'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent {
  constructor(
    private route: ActivatedRoute, //url
    private heroService: HeroService,
    private location: Location
  ) { }

  hero?: Hero; // ? cho phép có thể có value|| không cần có value

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
      })
  }


  Save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack()) //sub để theo dõi, nhận giá trị của luồng dữ liệu observable
    }
  }

  goBack(): void {
    this.location.back()
  }

}
