import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { UserLoginDto } from '../interfaces/users/user-login-dto.interface';
import { Token } from '../interfaces/authentication/token.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private endpoint = `${environment.host}/api/authentication`;
  private httpClient = inject(HttpClient);

  login(userLoginDto: UserLoginDto) {
    return lastValueFrom(
      this.httpClient.post<Token>(`${this.endpoint}/login`, userLoginDto)
    );
  }
}
