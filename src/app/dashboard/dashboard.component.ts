import { Component, OnInit } from '@angular/core';
import { TopicService } from '../services/topic.service';
import {
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormService } from '../services/form.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NavBarComponent],
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  topics: any = [];
  topicForm: any;
  expandedTopicIndex: number | null = null;
  topicsProgress: any;

  constructor(
    private topicService: TopicService,
    private formService: FormService
  ) {}

  async ngOnInit() {
    await this.getTopics();
    await this.getProgress();
    this.initForm();
    this.formService.loadTopics(
      this.topicsProgress.length > 0 ? this.topicsProgress : this.topics
    );
  }

  initForm() {
    this.topicForm = this.formService.topics;
  }

  async getTopics() {
    try {
      const result = await this.topicService.getTopics();
      this.topics = result.topics;
      console.log('Result:', result);
    } catch (error: any) {
      console.error('Error:', error);
      window.alert(error.error.message);
    }
  }

  async getProgress() {
    try {
      const result = await this.topicService.getProgress();
      this.topicsProgress = result.progressData;
      this.topicService.progress = this.topicsProgress;
      console.log('Result:', result);
    } catch (error: any) {
      console.error('Error:', error);
      window.alert(error.error.message);
    }
  }

  problemForm(index: number) {
    return (this.topicForm.controls as FormGroup[])[index];
  }

  toggleTopic(index: number) {
    this.expandedTopicIndex = this.expandedTopicIndex === index ? null : index;
  }

  async markDone() {
    let obj = this.topicService.markAsDoneObject(this.topics, this.topicForm);
    console.log(obj);
    try {
      const result = await this.topicService.markAsDone(obj);
      window.alert('Update successfull');
    } catch (error: any) {
      console.error('Error:', error);
      window.alert(error.error.message);
    }
  }
}
