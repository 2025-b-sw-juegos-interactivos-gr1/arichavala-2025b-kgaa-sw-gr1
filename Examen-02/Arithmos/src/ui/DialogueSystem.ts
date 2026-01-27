/**
 * DialogueSystem
 * Sistema simple de diálogos para mostrar mensajes del mentor Pipo
 */
import { Scene, MeshBuilder, StandardMaterial, Color3, DynamicTexture, Vector3 } from '@babylonjs/core';

export class DialogueSystem {
    private scene: Scene;
    private dialogueBox: any;
    private isVisible: boolean;
    private onCloseCallback: (() => void) | null;

    constructor(scene: Scene) {
        this.scene = scene;
        this.dialogueBox = null;
        this.isVisible = false;
        this.onCloseCallback = null;
    }

    /**
     * Muestra un diálogo de Pipo
     */
    public showDialogue(message: string, position?: Vector3, onClose?: () => void): void {
        if (this.isVisible) return;

        this.onCloseCallback = onClose || null;
        this.isVisible = true;

        // Crear caja de diálogo pequeña
        this.dialogueBox = MeshBuilder.CreatePlane(
            'dialogueBox',
            { width: 3.5, height: 1.5 },
            this.scene
        );

        // Posicionar en la ubicación especificada o frente al jugador
        if (position) {
            this.dialogueBox.position = position;
        } else {
            this.dialogueBox.position = new Vector3(0, 2, -3);
        }

        // Crear textura con el mensaje
        const texture = new DynamicTexture('dialogueTexture', { width: 1024, height: 512 }, this.scene);
        const ctx = texture.getContext() as CanvasRenderingContext2D;

        // Fondo púrpura
        const gradient = ctx.createLinearGradient(0, 0, 0, 512);
        gradient.addColorStop(0, '#6B5B95');
        gradient.addColorStop(1, '#8B7BA8');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1024, 512);

        // Borde blanco
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 6;
        ctx.strokeRect(10, 10, 1004, 492);

        // Título "Pipo dice:"
        ctx.font = 'bold 40px Arial';
        ctx.fillStyle = '#FFD700';
        ctx.textAlign = 'center';
        ctx.fillText('✨ Pipo:', 512, 70);

        // Mensaje (con salto de línea manual)
        ctx.font = 'bold 32px Arial';
        ctx.fillStyle = '#FFFFFF';
        
        const lines = this.wrapText(ctx, message, 900);
        let y = 150;
        lines.forEach(line => {
            ctx.fillText(line, 512, y);
            y += 40;
        });

        // Instrucción de cierre
        ctx.font = 'italic 28px Arial';
        ctx.fillStyle = '#E0E0E0';
        ctx.fillText('ESPACIO para continuar', 512, 470);

        texture.update();

        // Material del plano
        const planeMat = new StandardMaterial('dialogueMat', this.scene);
        planeMat.diffuseTexture = texture;
        planeMat.emissiveColor = new Color3(1, 1, 1);
        planeMat.backFaceCulling = false;
        this.dialogueBox.material = planeMat;

        this.dialogueBox.isPickable = false;

        // Listener para cerrar con ESPACIO
        this.setupCloseListener();

        console.log('💬 Diálogo mostrado');
    }

    /**
     * Divide el texto en líneas que caben en el ancho especificado
     */
    private wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = '';

        words.forEach(word => {
            const testLine = currentLine + word + ' ';
            const metrics = ctx.measureText(testLine);
            
            if (metrics.width > maxWidth && currentLine !== '') {
                lines.push(currentLine.trim());
                currentLine = word + ' ';
            } else {
                currentLine = testLine;
            }
        });
        
        lines.push(currentLine.trim());
        return lines;
    }

    /**
     * Configura el listener para cerrar el diálogo
     */
    private setupCloseListener(): void {
        const keyHandler = (evt: KeyboardEvent) => {
            if (evt.code === 'Space' && this.isVisible) {
                this.closeDialogue();
                window.removeEventListener('keydown', keyHandler);
            }
        };

        window.addEventListener('keydown', keyHandler);
    }

    /**
     * Cierra el diálogo
     */
    public closeDialogue(): void {
        if (this.dialogueBox) {
            this.dialogueBox.dispose();
            this.dialogueBox = null;
        }
        
        this.isVisible = false;

        if (this.onCloseCallback) {
            this.onCloseCallback();
        }

        console.log('💬 Diálogo cerrado');
    }

    public getIsVisible(): boolean {
        return this.isVisible;
    }
}
