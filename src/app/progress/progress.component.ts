import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopicService } from '../services/topic.service';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [NavBarComponent, CommonModule, FormsModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css',
})
export class ProgressComponent implements OnInit {
  constructor(private topicService: TopicService) {}

  async ngOnInit() {
    await this.getProgress();
  }

  progressData = this.topicService.progress;

  async getProgress() {
    try {
      const result = await this.topicService.getProgress();
      this.progressData = result.progressData;
      this.topicService.progress = this.progressData;
      console.log('Result:', result);
    } catch (error: any) {
      console.error('Error:', error);
      window.alert(error.error.message);
    }
  }

  toggleTopic(topic: any): void {
    topic.expanded = !topic.expanded;
  }

  getCompletedProblems(topic: any) {
    return topic.problems.filter((problem: any) => problem.opted);
  }

  getIncompleteProblems(topic: any) {
    return topic.problems.filter((problem: any) => !problem.opted);
  }
}
