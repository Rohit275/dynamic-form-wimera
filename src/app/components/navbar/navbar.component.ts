import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentService } from '../component.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cmpService: ComponentService,
    private observer: BreakpointObserver
  ) {}
  public id: any;

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      // console.log(params);
      let currentId = params.get('id');
      this.id = currentId;
      // this.cmpService.currentId = currentId;
    });
    // console.log(this.id);
    this.cmpService.currentId = this.id;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.observer.observe(['(max-width: 1024px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    });
  }

  createForm() {
    // console.log('ID: ', this.id);
    this.router.navigate(['/user', this.id, 'create']);
  }
  viewForm() {
    // console.log('ID: ', this.id);

    this.router.navigate(['/user', this.id, 'view']);
  }

  sidenavToggle() {
    // console.log('Toggle');
    this.sidenav.toggle();
  }
  events = [];
}
