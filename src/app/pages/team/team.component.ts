import { Component, OnInit } from '@angular/core';
import { FibreServiceService } from '../../services/fibre-service.service';
import { TeamMember } from '../../models/service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teamMembers: TeamMember[] = [];

  constructor(private fibreService: FibreServiceService) {}

  ngOnInit() {
    this.loadTeamMembers();
  }

  loadTeamMembers() {
    this.fibreService.getTeamMembers().subscribe(members => {
      this.teamMembers = members;
    });
  }
}
