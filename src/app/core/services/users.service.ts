import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UserSignupDto } from '../interfaces/users/user-signup-dto.interface';
import { UserUpdateDto } from '../interfaces/users/user-update-dto.interface';
import { Token } from '../interfaces/authentication/token.interface';
import { UserResponseDto } from '../interfaces/users/user-response-dto.interface';
import { Message } from '../interfaces/shared/Message.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private endpoint = `${environment.host}/api/user`;
  private httpClient = inject(HttpClient);

  get() {
    return lastValueFrom(this.httpClient.get<UserResponseDto>(this.endpoint));
  }

  create(userSignupDto: UserSignupDto) {
    return lastValueFrom(
      this.httpClient.post<Token>(`${this.endpoint}/login`, userSignupDto)
    );
  }

  update(userUpdateDto: UserUpdateDto) {
    return lastValueFrom(
      this.httpClient.put<Message>(this.endpoint, userUpdateDto)
    );
  }

  delete() {
    return lastValueFrom(this.httpClient.delete<Message>(this.endpoint));
  }
}
