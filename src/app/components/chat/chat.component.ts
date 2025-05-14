import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NgClass,
    NgFor,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  prompt: string = '';
  messages: { text: string; sender: 'user' | 'bot' }[] = [];

  constructor(private api: ApiService) {}

  askQuestion(): void {
    const question = this.prompt.trim();
    if (!question) return;

    this.messages.push({ text: question, sender: 'user' });

    this.api.sendPrompt(question).subscribe({
      next: (res) => {
        this.messages.push({ text: res.answer, sender: 'bot' });
      },
      error: () => {
        this.messages.push({
          text: 'Błąd podczas przetwarzania pytania.',
          sender: 'bot',
        });
      },
    });

    this.prompt = '';
  }
}
