import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(private swUpdate: SwUpdate) {
    this.initializeApp();
  }

  initializeApp(): void {
    this.swUpdate.available.subscribe(e => {
      if(confirm("A new version is available. Load it?")) {
        window.location.reload();
      }
    });
  }
}
