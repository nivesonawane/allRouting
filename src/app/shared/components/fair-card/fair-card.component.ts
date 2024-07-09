import { Component, Input, OnInit } from '@angular/core';
import { Ifairr } from '../../models/fairs.interface';

@Component({
  selector: 'app-fair-card',
  templateUrl: './fair-card.component.html',
  styleUrls: ['./fair-card.component.scss']
})
export class FairCardComponent implements OnInit {
  @Input() fairObj !: Ifairr;
  constructor() { }

  ngOnInit(): void {
  }

}
