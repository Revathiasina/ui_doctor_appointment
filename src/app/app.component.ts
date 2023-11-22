import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appointment';
  show_form: boolean = false

  checkSlots() {
    this.show_form = !this.show_form
  }
}
