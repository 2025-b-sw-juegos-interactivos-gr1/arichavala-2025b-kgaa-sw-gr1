/**
 * FeedbackSystem
 * Sistema de retroalimentación visual y auditiva para el jugador.
 * E2-HU-08: Sistema de Feedback
 * 
 * Responsable de:
 * - Feedback visual (colores, animaciones, partículas)
 * - Feedback auditivo (sonidos de éxito/error)
 * - Efectos de UI (mensajes en pantalla)
 */
import { Mesh, Animation, Color3, StandardMaterial, Sound, Scene, Vector3 } from '@babylonjs/core';

export class FeedbackSystem {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    /**
     * Feedback de respuesta correcta
     */
    public showSuccess(mesh?: Mesh): void {
        if (mesh) {
            this.flashColor(mesh, Color3.Green());
        }

        // Sonido de exito
        this.playSuccessSound();
    }

    /**
     * Feedback de respuesta incorrecta
     */
    public showError(mesh?: Mesh): void {
        if (mesh) {
            this.flashColor(mesh, Color3.Red());
            this.shakeObject(mesh);
        }

        // Sonido de error
        this.playErrorSound();
    }

    /**
     * Efecto de flash de color en un objeto
     */
    private flashColor(mesh: Mesh, color: Color3): void {
        const material = mesh.material as StandardMaterial;
        if (!material) return;

        const originalColor = material.diffuseColor.clone();

        // Cambiar a color de feedback
        material.diffuseColor = color;

        // Volver al color original después de 300ms
        setTimeout(() => {
            material.diffuseColor = originalColor;
        }, 300);
    }

    /**
     * Efecto de sacudida (shake) para objetos incorrectos
     */
    private shakeObject(mesh: Mesh): void {
        const originalPosition = mesh.position.clone();
        const shakeIntensity = 0.1;
        const shakeDuration = 200; // ms
        const shakeCount = 4;

        let currentShake = 0;
        const shakeInterval = setInterval(() => {
            if (currentShake >= shakeCount) {
                mesh.position = originalPosition;
                clearInterval(shakeInterval);
                return;
            }

            // Alternar posición izquierda/derecha
            if (currentShake % 2 === 0) {
                mesh.position.x = originalPosition.x + shakeIntensity;
            } else {
                mesh.position.x = originalPosition.x - shakeIntensity;
            }

            currentShake++;
        }, shakeDuration / shakeCount);
    }

    /**
     * Reproduce sonido de éxito
     * Usa Web Audio API para generar un tono (no requiere archivo externo)
     */
    private playSuccessSound(): void {
        this.playBeep(800, 0.2, 'sine'); // Tono agudo
    }

    /**
     * Reproduce sonido de error
     */
    private playErrorSound(): void {
        this.playBeep(200, 0.3, 'sawtooth'); // Tono grave
    }

    /**
     * Genera un beep usando Web Audio API
     * @param frequency - Frecuencia del tono (Hz)
     * @param duration - Duración en segundos
     * @param type - Tipo de onda ('sine', 'square', 'sawtooth', 'triangle')
     */
    private playBeep(frequency: number, duration: number, type: OscillatorType): void {
        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = type;

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        } catch (error) {
            console.warn('No se pudo reproducir el sonido:', error);
        }
    }

    /**
     * Muestra un mensaje flotante en el mundo 3D
     */
    public showFloatingText(text: string, position: Vector3): void {
        console.log(`💬 ${text}`);
        // TODO: Implementar texto 3D en futuras épicas
    }

    /**
     * Efecto de resplandor para resaltar objetos
     */
    public highlightObject(mesh: Mesh, enable: boolean): void {
        const material = mesh.material as StandardMaterial;
        if (!material) return;

        if (enable) {
            material.emissiveColor = new Color3(0.3, 0.3, 0.3);
        } else {
            material.emissiveColor = Color3.Black();
        }
    }
}
