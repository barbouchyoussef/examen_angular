import { Routes } from '@angular/router';
import { BookList } from "./components/book-list/book-list";
import { BookDetails } from "./components/book-details/book-details";
export const routes: Routes = [
  { path: '', component: BookList },
  { path: 'book/:id', component: BookDetails}
];
