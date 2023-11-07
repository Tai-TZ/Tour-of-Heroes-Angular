import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})

export class HeroesComponent {

  //constructor: ham tao
  constructor(private HeroService: HeroService, private MessageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes()
  }


  heroes: Hero[] = [];
  selectedHero?: Hero; //có thể không có gía trị



  getHeroes(): void {
    //subcribe được gọi để lắng nghe dữ liệu từ observable
    this.HeroService.getHeroes().subscribe(heroes => this.heroes = heroes)
  }


  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    else {
      this.HeroService.addHero({ name } as Hero) //{} = object
        .subscribe(hero => {
          this.heroes.push(hero);
        });
    }
  }



  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero) // new list 
    this.HeroService.deleteHero(hero.id).subscribe(hero => { console.log('delete') })
  }


}