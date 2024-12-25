import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-awards-roster',
  templateUrl: './awards-roster.component.html',
  styleUrls: ['./awards-roster.component.scss'],
})
export class AwardsRosterComponent implements OnInit {
  @Input()
  siteSection: string;

  isGeneral: boolean = false;

  userPersona: string;

  @Input() awardsAndAppreciationsLabels;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.getEmpDataStatus().subscribe((loaded: boolean) => {
      if (loaded) {
        this.commonService.fetchPersonaInfo().subscribe((userPersona) => {
          if (userPersona === 'General') {
            this.isGeneral = true;
          }
        });
      }
    });
  }
}
