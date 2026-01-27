/**
 * WinState
 * Estado de victoria.
 * Muestra el mensaje final y guarda el progreso.
 */
import { GameState } from './GameState';

export class WinState extends GameState {
    constructor() {
        super('Win');
    }

    public onEnter(): void {
        console.log('Entrando al estado: Win');
        console.log('¡Nivel Completado!');
        this.saveProgress();
    }

    public update(): void {
        // Mostrar UI de victoria
    }

    public onExit(): void {
        console.log('Saliendo del estado: Win');
    }

    /**
     * Guarda el progreso del jugador en LocalStorage
     */
    private saveProgress(): void {
        const gameData = {
            player_id: 'student_01',
            last_level_completed: 4,
            settings: {
                sound_volume: 0.8,
                music_enabled: true
            }
        };

        localStorage.setItem('arithmos_save', JSON.stringify(gameData));
        console.log('Progreso guardado en LocalStorage');
    }
}
