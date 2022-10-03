import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import {supabase} from '../api/supabase';
import { RoomChange } from '../interfaces/room.interface';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    name: string = location.hash.substring(1);
    constructor(private readonly ngZone: NgZone) {}
    public onRoomChange() {
        return new Observable((observer) => {
            supabase
                .channel('public:rooms:name=eq.' + this.name)
                .on('postgres_changes', { event: '*', schema: '*' }, (payload: RoomChange) => {
                    this.ngZone.run(() => {
                        observer.next(payload.new);
                    })
                })
                .subscribe()
        });
    }
}