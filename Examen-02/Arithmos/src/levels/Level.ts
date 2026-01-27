/**
 * Level (Clase Base)
 * Clase abstracta para todos los niveles del juego.
 * Cada nivel implementará su propia lógica de construcción y puzzles.
 */
import { Scene } from '@babylonjs/core';
import { PuzzleManager } from '../puzzles/PuzzleManager';

export abstract class Level {
    protected scene: Scene;
    protected puzzleManager: PuzzleManager;
    protected levelId: number;
    protected levelName: string;

    constructor(scene: Scene, levelId: number, levelName: string) {
        this.scene = scene;
        this.levelId = levelId;
        this.levelName = levelName;
        this.puzzleManager = new PuzzleManager(scene);
    }

    /**
     * Construye la geometría del nivel (greyboxing)
     */
    public abstract buildGeometry(): void;

    /**
     * Configura los puzzles específicos del nivel
     */
    public abstract setupPuzzles(): void;

    /**
     * Limpia recursos del nivel
     */
    public dispose(): void {
        this.puzzleManager.clearPuzzle();
        console.log(`Nivel ${this.levelName} limpiado`);
    }

    /**
     * Obtiene el ID del nivel
     */
    public getLevelId(): number {
        return this.levelId;
    }
}
