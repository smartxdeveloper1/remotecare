import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('a[href^="#"]').on('click', function (event) {
      console.log('hello')
      var hrefName = event.target.getAttribute('href');
      var target = $(this.getAttribute('href'));
      if (target.length) {
        if (hrefName == "#location-bhubaneswar" || hrefName == "#location-chennai"
          || hrefName == '#write-us' || hrefName == "#sign-up" || hrefName == "#carrier-inplanttraing" || hrefName == "#carrier-internship") {

        } else {

          for (let x = 0; x < document.getElementsByClassName('nav-item').length; x++) {
            document.getElementsByClassName('nav-link')[x].className = document.getElementsByClassName('nav-link')[x].className.replace(/\ selectedMenu\b/g, "");
          }
          event.target.className += " selectedMenu";
          event.preventDefault();
          $('html, body').stop().animate({
            scrollTop: target.offset().top
          }, 1000);
        }

      }
    });
  }

}
