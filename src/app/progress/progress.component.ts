import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopicService } from '../services/topic.service';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [NavBarComponent, CommonModule, FormsModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {

  constructor(private topicService : TopicService) { }

  progressData = this.topicService.progress;

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
