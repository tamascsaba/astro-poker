import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { PlayerService } from '../../services/player.service';
import { RoomService } from '../../services/room.service';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss'],
    imports: [NgFor],
    providers: [PlayerService, RoomService],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent implements OnInit {
    public readonly cards = [0, 1, 2, 3, 5, 8, 13, 21];
    constructor(
        private readonly playerService: PlayerService,
        private readonly roomService: RoomService
    ) { }

    async ngOnInit() {

    }
}
