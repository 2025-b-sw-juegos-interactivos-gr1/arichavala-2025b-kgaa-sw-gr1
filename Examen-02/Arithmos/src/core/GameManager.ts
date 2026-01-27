/**
 * GameManager (Singleton Pattern)
 * El cerebro del juego. Controla el estado actual y carga las escenas.
 * Asegura que solo exista una instancia global coordinando el flujo del juego.
 */
export class GameManager {
    private static instance: GameManager;
    private currentState: string;

    private constructor() {
        this.currentState = 'Init';
    }

    /**
     * Obtiene la única instancia de GameManager (Singleton)
     */
    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    /**
     * Cambia el estado del juego
     * @param newState - Nuevo estado ('Menu', 'Gameplay', 'Transition', 'Win')
     */
    public setState(newState: string): void {
        console.log(`Estado cambiado: ${this.currentState} -> ${newState}`);
        this.currentState = newState;
    }

    /**
     * Obtiene el estado actual
     */
    public getCurrentState(): string {
        return this.currentState;
    }

    /**
     * Inicializa el juego
     */
    public init(): void {
        console.log('GameManager inicializado');
        this.setState('Menu');
    }
}
