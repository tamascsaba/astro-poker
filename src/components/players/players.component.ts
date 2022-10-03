import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../services/player.service';
import { RoomService } from '../../services/room.service';
import type { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-poker',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss'],
    imports: [CommonModule],
    providers: [PlayerService, RoomService],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersComponent implements OnInit {
    players: BehaviorSubject<Array<string>>;
    player: string | null = null;
    constructor(
        private readonly playerService: PlayerService
    ) {
        this.players = this.playerService.players;
    }

    async ngOnInit() {
        this.player = this.playerService.player;
        const players = await this.playerService.getPlayers();

        if (this.player && !players?.includes(this.player)) {
            await this.playerService.addPlayer(this.player);
            await this.playerService.getPlayers();
        }
    }

    public play(player: string) {
        this.playerService.setPlayer(player);

        if (!this.players.getValue()?.includes(player)) {
            this.playerService.addPlayer(player);
            this.playerService.getPlayers().then(() => {
                this.player = player;
            });
        }
    }
}
