import { Component, OnInit } from "@angular/core"
import { Bread } from "./bread"
import { filter, distinctUntilChanged } from "rxjs/operators"
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router"
 import { MenuItem } from "primeng/api"

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.css"],
})
export class BreadcrumbsComponent implements OnInit {
  constructor(private router: Router,
     private activatedRoute: ActivatedRoute) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root)
  }

  public breadcrumbs: Bread[]

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root)
      })
  }

  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = "",
    breadcrumbs: Bread[] = []
  ): Bread[] {
    let label =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.data.breadcrumb
        : ""

    let path =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.path : ""

    //Generate next url
    const nextUrl = path ? `${url}/${path}` : url

    const breadcrumb: Bread = {
      label: label,
      url: nextUrl,
    }

    const newBreadcrumbs = breadcrumb.label
      ? [...breadcrumbs, breadcrumb]
      : [...breadcrumbs]

    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs)
    }

    return newBreadcrumbs
  }
}
