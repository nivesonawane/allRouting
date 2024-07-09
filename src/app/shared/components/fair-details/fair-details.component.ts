import { Component, inject, OnInit } from '@angular/core';
import { Ifairr } from '../../models/fairs.interface';
import { ActivatedRoute } from '@angular/router';
import { FairsService } from '../../services/fairs.service';

@Component({
  selector: 'app-fair-details',
  templateUrl: './fair-details.component.html',
  styleUrls: ['./fair-details.component.scss']
})
export class FairDetailsComponent implements OnInit {
  fairId !: string;
  fairObj !: Ifairr;

  private _route = inject(ActivatedRoute);
  private _fairservice = inject(FairsService);

  constructor() { }

  ngOnInit(): void {
    this._route.params.subscribe(res => {
      this.fairId = res['fairId'];
      if(this.fairId){
        this.fairObj = this._fairservice.fetchFair(this.fairId);
      }
    })
  }

}
