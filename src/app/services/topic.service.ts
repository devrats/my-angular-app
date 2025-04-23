import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { FormArray } from '@angular/forms';

@Injectable()
export class TopicService {
  constructor(private http: HttpClient) {}

  progress: any = [];

  async getTopics(): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('token') || '', // Replace with your actual token
    });
    return await firstValueFrom(
      this.http.get('https://backend-yvsj.onrender.com/api/data/allTopics', { headers })
    );
  }

  async getProgress(): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('token') || '', // Replace with your actual token
    });
    return await firstValueFrom(
      this.http.post(
        'https://backend-yvsj.onrender.com/api/data/progress',
        { email: localStorage.getItem('email') },
        { headers }
      )
    );
  }

  markTopicDone(topicId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('token') || '', // Replace with your actual token
    });
    return this.http.put<any>(
      'https://backend-yvsj.onrender.com/api/topics/' + topicId + '/progress',
      {},
      { headers }
    );
  }

  async markAsDone(data: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('token') || '', // Replace with your actual token
    });
    return await firstValueFrom(
      this.http.post('https://backend-yvsj.onrender.com/api/data/update', data, { headers })
    );
  }

  markAsDoneObject(topics: any, topicForm: FormArray) {
    let markAsDoneObject: any = {
      email: localStorage.getItem('email'),
      topics: [],
    };
    for (let i = 0; i < topics.length; i++) {
      let problems = [];
      for (let problem of topics[i].problems) {
        let problemObj = {
          title: problem.title,
          opted: topicForm.at(i).value[problem.title],
        };
        problems.push(problemObj);
      }
      markAsDoneObject.topics.push({
        topic: topics[i].topic,
        problems: problems,
      });
    }
    return markAsDoneObject;
  }
}
