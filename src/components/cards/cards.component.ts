import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss'],
    imports: [NgFor],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent implements OnInit {
    public readonly cards = [0, 1, 2, 3, 5, 8, 13, 21];
    constructor(
    ) { }

    async ngOnInit() {

    }
}
