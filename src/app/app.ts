import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadBar } from "./components/head-bar/head-bar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeadBar 
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('open-library-app');
}
