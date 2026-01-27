/**
 * FeedbackSystem
 * Sistema de retroalimentación visual y auditiva para el jugador.
 * E2-HU-08: Sistema de Feedback
 * E4-HU-14: Implementar Audio (beeps procedurales)
 * 
 * Responsable de:
 * - Feedback visual (colores, animaciones, partículas)
 * - Feedback auditivo (sonidos de éxito/error)
 * - Efectos de UI (mensajes en pantalla)
 */
import { Mesh, Animation, Color3, StandardMaterial, Sound, Scene, Vector3 } from '@babylonjs/core';

export class FeedbackSystem {
    private scene: Scene;
    private backgroundMusicContext: AudioContext | null = null;
    private backgroundMusicSource: OscillatorNode | null = null;
    private backgroundMusicGain: GainNode | null = null;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    /**
     * E4-HU-14: Inicia música de fondo del nivel
     */
    public startBackgroundMusic(): void {
        if (this.backgroundMusicContext) {
            return; // Ya está sonando
        }

        try {
            this.backgroundMusicContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.backgroundMusicGain = this.backgroundMusicContext.createGain();
            this.backgroundMusicGain.connect(this.backgroundMusicContext.destination);
            this.backgroundMusicGain.gain.value = 0.15;

            // Crear loop de notas ambiente (Do - Mi - Sol - Mi)
            const playAmbientLoop = () => {
                const notes = [261.63, 329.63, 392.00, 329.63]; // C - E - G - E
                let noteIndex = 0;

                const playNote = () => {
                    if (!this.backgroundMusicContext) return;

                    const osc = this.backgroundMusicContext.createOscillator();
                    const gain = this.backgroundMusicContext.createGain();

                    osc.connect(gain);
                    gain.connect(this.backgroundMusicGain!);

                    osc.type = 'triangle'; // Sonido más suave
                    osc.frequency.value = notes[noteIndex];

                    const now = this.backgroundMusicContext.currentTime;
                    gain.gain.setValueAtTime(0, now);
                    gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
                    gain.gain.linearRampToValueAtTime(0, now + 1.2);

                    osc.start(now);
                    osc.stop(now + 1.2);

                    noteIndex = (noteIndex + 1) % notes.length;
                    
                    if (this.backgroundMusicContext) {
                        setTimeout(playNote, 1200);
                    }
                };

                playNote();
            };

            playAmbientLoop();
            console.log('🎵 Música de fondo iniciada');
        } catch (error) {
            console.warn('No se pudo iniciar música de fondo:', error);
        }
    }

    /**
     * E4-HU-14: Detiene música de fondo del nivel
     */
    public stopBackgroundMusic(): void {
        if (this.backgroundMusicContext) {
            this.backgroundMusicContext.close();
            this.backgroundMusicContext = null;
            this.backgroundMusicGain = null;
        }
        console.log('🎵 Música de fondo detenida');
    }

    /**
     * E4-HU-14: Sonido de victoria al completar el nivel
     */
    public playVictorySound(): void {
        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const duration = 1.5; // 1.5 segundos
            
            // Melodía de victoria: Do-Mi-Sol-Do (ascendente) más elaborada
            const notes = [
                { freq: 523.25, start: 0, duration: 0.2 },      // Do
                { freq: 659.25, start: 0.2, duration: 0.2 },    // Mi
                { freq: 783.99, start: 0.4, duration: 0.2 },    // Sol
                { freq: 1046.50, start: 0.6, duration: 0.9 }    // Do (más largo)
            ];

            notes.forEach(note => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.frequency.value = note.freq;
                oscillator.type = 'sine';

                // Envelope para cada nota
                const startTime = audioContext.currentTime + note.start;
                const endTime = startTime + note.duration;
                
                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
                gainNode.gain.exponentialRampToValueAtTime(0.01, endTime);

                oscillator.start(startTime);
                oscillator.stop(endTime);
            });

            console.log('🎉 Sonido de victoria');
        } catch (error) {
            console.warn('No se pudo reproducir sonido de victoria:', error);
        }
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
     * E4-HU-14: Beep procedural (arpegio ascendente)
     */
    private playSuccessSound(): void {
        this.playBeep(800, 0.2, 'sine'); // Tono agudo
    }

    /**
     * Reproduce sonido de error
     * E4-HU-14: Beep procedural (tono grave)
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
