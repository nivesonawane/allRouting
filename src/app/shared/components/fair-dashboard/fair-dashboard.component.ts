import { Component, inject, OnInit } from '@angular/core';
import { FairsService } from '../../services/fairs.service';
import { Ifairr } from '../../models/fairs.interface';

@Component({
  selector: 'app-fair-dashboard',
  templateUrl: './fair-dashboard.component.html',
  styleUrls: ['./fair-dashboard.component.scss']
})
export class FairDashboardComponent implements OnInit {
  allFairs !: Array<Ifairr>;

  private _fairService = inject(FairsService);
  constructor() { }

  ngOnInit(): void {
    this.allFairs = this._fairService.fetchAllFairs();
  }

}
