/**
 * GameState (State Pattern)
 * Clase base abstracta para todos los estados del juego.
 * Implementa el patrón State para gestionar transiciones.
 */
export abstract class GameState {
    protected stateName: string;

    constructor(stateName: string) {
        this.stateName = stateName;
    }

    /**
     * Se ejecuta al entrar en este estado
     */
    public abstract onEnter(): void;

    /**
     * Se ejecuta cada frame mientras el estado está activo
     */
    public abstract update(): void;

    /**
     * Se ejecuta al salir de este estado
     */
    public abstract onExit(): void;

    /**
     * Obtiene el nombre del estado
     */
    public getStateName(): string {
        return this.stateName;
    }
}
