/**
 * GameplayState
 * Estado de juego activo.
 * El jugador puede moverse e interactuar con el mundo.
 */
import { GameState } from './GameState';

export class GameplayState extends GameState {
    constructor() {
        super('Gameplay');
    }

    public onEnter(): void {
        console.log('Entrando al estado: Gameplay');
        // Cargar nivel activo
    }

    public update(): void {
        // Actualizar PlayerController y PuzzleManager
    }

    public onExit(): void {
        console.log('Saliendo del estado: Gameplay');
    }
}
