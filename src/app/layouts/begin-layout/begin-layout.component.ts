import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterOutlet } from '@angular/router';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-begin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatIcon],
  templateUrl: './begin-layout.component.html',
  styleUrl: './begin-layout.component.css'
})
export class BeginLayoutComponent extends BaseComponent {

}