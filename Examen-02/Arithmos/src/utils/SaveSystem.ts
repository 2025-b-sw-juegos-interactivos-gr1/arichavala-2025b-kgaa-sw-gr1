/**
 * SaveSystem
 * Sistema de persistencia usando LocalStorage (JSON).
 * Gestiona el guardado y carga del progreso del jugador.
 */
export interface GameData {
    player_id: string;
    last_level_completed: number;
    settings: {
        sound_volume: number;
        music_enabled: boolean;
    };
}

export class SaveSystem {
    private static readonly SAVE_KEY = 'arithmos_save';

    /**
     * Guarda los datos del juego en LocalStorage
     */
    public static saveGame(data: GameData): void {
        try {
            localStorage.setItem(SaveSystem.SAVE_KEY, JSON.stringify(data));
            console.log('Partida guardada exitosamente');
        } catch (error) {
            console.error('Error al guardar la partida:', error);
        }
    }

    /**
     * Carga los datos del juego desde LocalStorage
     */
    public static loadGame(): GameData | null {
        try {
            const savedData = localStorage.getItem(SaveSystem.SAVE_KEY);
            if (savedData) {
                return JSON.parse(savedData) as GameData;
            }
            return null;
        } catch (error) {
            console.error('Error al cargar la partida:', error);
            return null;
        }
    }

    /**
     * Verifica si existe una partida guardada
     */
    public static hasSavedGame(): boolean {
        return localStorage.getItem(SaveSystem.SAVE_KEY) !== null;
    }

    /**
     * Elimina la partida guardada
     */
    public static deleteSave(): void {
        localStorage.removeItem(SaveSystem.SAVE_KEY);
        console.log('Partida eliminada');
    }
}
