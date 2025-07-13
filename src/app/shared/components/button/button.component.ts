import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() text = '';
  @Input() to: string[] = [];
  @Input() type: 'button' | 'submit' = 'button';
  @Input() isPrimary = true;
}
