/**
 * PuzzleManager
 * Sistema central de puzzles usando el Observer Pattern.
 * Gestiona la lógica de validación de respuestas y coordina los observadores.
 */
import { Scene } from '@babylonjs/core';
import { InteractableObject } from '../interactables/InteractableObject';

export class PuzzleManager {
    private scene: Scene;
    private interactables: InteractableObject[];
    private currentPuzzleId: string;

    constructor(scene: Scene) {
        this.scene = scene;
        this.interactables = [];
        this.currentPuzzleId = '';
    }

    /**
     * Registra un objeto interactable en el puzzle actual
     */
    public registerInteractable(interactable: InteractableObject): void {
        this.interactables.push(interactable);
    }

    /**
     * Inicializa un nuevo puzzle
     */
    public setupPuzzle(puzzleId: string): void {
        this.currentPuzzleId = puzzleId;
        console.log(`Puzzle ${puzzleId} configurado`);
    }

    /**
     * Valida si el puzzle actual está completo
     */
    public isPuzzleComplete(): boolean {
        // Lógica de validación (se expandirá en futuras historias)
        return false;
    }

    /**
     * Limpia los interactables del puzzle actual
     */
    public clearPuzzle(): void {
        this.interactables = [];
    }
}
