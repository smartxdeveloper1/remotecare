
import { BackendService } from 'src/app/backend.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Renderer2, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { OverlayContainer } from '@angular/cdk/overlay'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  theme = "blue";

  changeTheme(primary: string) {
    document.documentElement.style.setProperty('--primary-color', primary);
  }

  public register
  public dashboard
  userType: Boolean
  istrue: boolean = false

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    public service: BackendService,
    public router: Router,
    private renderer: Renderer2,
    public overlaycontainer: OverlayContainer,

  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }



  onSetTheme() {
    // this.overlaycontainer.getContainerElement().classList.add(theme);
    this.istrue = !this.istrue

  }


  public showMenu() {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))

    if (userInfo.userType === "superadmin") {
      return true
    } else {
      return false;
    };
  }

  public user() {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))

    if (userInfo.userType === "admin") {
      return true
    } else {
      return false;
    };
  }
  public showuser() {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))

    if (userInfo.userType === "superadmin" || userInfo.userType === "smartxengineer") {
      return true
    } else {
      return false;
    };
  }
  public showcountry() {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))

    if (userInfo.userType === "superadmin" || userInfo.userType === "admin") {
      return true
    } else {
      return false;
    };
  }


  ngOnInit() {
    this.changeTheme(this.theme);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  logout() {
    var x;
    x = confirm("Are You Sure You Want To Logout")
    if (x == true) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
  changeColor() {
    this.changeTheme(this.theme);
  }
}




