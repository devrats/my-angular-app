import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  async register(email: string, password: string): Promise<any> {
    return await firstValueFrom(
      this.http.post('http://backend-yvsj.onrender.com/api/auth/register', { email, password })
    );
  }

  async login(email: string, password: string): Promise<any> {
    return await firstValueFrom(
      this.http.post('http://backend-yvsj.onrender.com/api/auth/login', { email, password })
    );
  }
}
