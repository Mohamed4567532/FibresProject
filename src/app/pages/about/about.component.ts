import { Component, OnInit } from '@angular/core';
import { FibreServiceService } from '../../services/fibre-service.service';
import { TeamMember } from '../../models/service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  teamMembers: TeamMember[] = [];

  constructor(private fibreService: FibreServiceService) {}

  ngOnInit() {
    this.loadTeamMembers();
  }

  loadTeamMembers() {
    this.fibreService.getTeamMembers().subscribe(members => {
      this.teamMembers = members.slice(0, 4); // Afficher seulement 4 membres sur la page about
    });
  }
}
