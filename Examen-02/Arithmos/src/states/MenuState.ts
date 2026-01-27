/**
 * MenuState
 * Estado del menú principal.
 * El tiempo de juego está detenido, esperando que el jugador presione "Iniciar".
 */
import { GameState } from './GameState';

export class MenuState extends GameState {
    constructor() {
        super('Menu');
    }

    public onEnter(): void {
        console.log('Entrando al estado: Menu');
        // Se implementará la UI del menú en futuras historias
    }

    public update(): void {
        // No hay lógica de actualización en el menú por ahora
    }

    public onExit(): void {
        console.log('Saliendo del estado: Menu');
    }
}
