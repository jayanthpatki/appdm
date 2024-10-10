// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
    private userId: number | null = null;

    setUserId(id: number) {
        this.userId = id;
    }

    getUserId(): number | null {
        return this.userId;
    }
}
