import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router, Params  } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn:boolean = true;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public router: Router,
    private route: ActivatedRoute,
    private location : Location,
  ) {

  }

  ngOnInit() {
    this.userStatus();
  }
  async userStatus() {
    const user = await this.authService.isLoggedIn();
    if (user) {
      console.log("Logged In");
      this.isLoggedIn = true;
    } else {
      console.log("Logged Out");
      this.isLoggedIn = false;
    }
  }

  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.router.navigate(['/login']);
    }, (error) => {
      console.log("Logout error", error);
    });
  }



}
