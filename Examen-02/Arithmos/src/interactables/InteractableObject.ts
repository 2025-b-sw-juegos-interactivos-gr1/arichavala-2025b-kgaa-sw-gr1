/**
 * InteractableObject
 * Clase base para cualquier objeto cliqueable en el mundo.
 * Utiliza el Observer Pattern para notificar cuando se interactúa con el objeto.
 */
import { Mesh } from '@babylonjs/core';

export interface IObserver {
    onNotify(isCorrect: boolean): void;
}

export abstract class InteractableObject {
    protected id: string;
    protected value: number | string;
    protected isCorrect: boolean;
    protected mesh: Mesh | null;
    private observers: IObserver[] = [];

    constructor(id: string, value: number | string, isCorrect: boolean) {
        this.id = id;
        this.value = value;
        this.isCorrect = isCorrect;
        this.mesh = null;
    }

    /**
     * Añade un observador que será notificado cuando se interactúe con este objeto
     */
    public addObserver(observer: IObserver): void {
        this.observers.push(observer);
    }

    /**
     * Notifica a todos los observadores
     */
    protected notifyObservers(): void {
        this.observers.forEach(observer => {
            observer.onNotify(this.isCorrect);
        });
    }

    /**
     * Maneja el evento de clic/interacción
     */
    public onPointerDown(): void {
        console.log(`Objeto ${this.id} seleccionado. Valor: ${this.value}`);
        this.notifyObservers();
    }

    /**
     * Obtiene el valor del objeto
     */
    public getValue(): number | string {
        return this.value;
    }

    /**
     * Verifica si es la respuesta correcta
     */
    public getIsCorrect(): boolean {
        return this.isCorrect;
    }
}
