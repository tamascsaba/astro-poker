import { Injectable, ChangeDetectorRef } from '@angular/core';
import { from, BehaviorSubject } from 'rxjs';
import { supabase } from '../api/supabase';
import { RoomService } from './room.service';
import type { Room } from '../interfaces/room.interface';


@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    public players = new BehaviorSubject<Array<string>>([]);
    constructor(
        private readonly roomService: RoomService,
        private readonly ch: ChangeDetectorRef,
    ) {
        this.roomService.onRoomChange().subscribe((change)  => {
            this.players.next((<Room>change).players);
        })
    }
    public async addPlayer(name: string) {
        const players = this.players.getValue();

        return supabase
            .from('rooms')
            .update({ players: [...(players || []), name] })
            .match({ name: this.roomService.name })
    }

    public async getPlayers(): Promise<string[]> {
        const {data} = await supabase
            .from('rooms')
            .select('players')
            .match({ name: this.roomService.name })
            .single();

        this.players.next(data?.players);
        this.ch.detectChanges();
        return data?.players;
    }

    public getPlayers$() {
        return from(this.getPlayers());
    }

    public get player() {
        return localStorage.getItem('player');
    }

    public setPlayer(name: string): any {
        localStorage.setItem('player', name);
    }
}