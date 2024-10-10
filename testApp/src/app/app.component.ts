import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <router-outlet></router-outlet> <!-- This enables routing -->
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
