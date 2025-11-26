/**
 * COLLISIONMANAGER.JS
 * Sistema de detección de colisiones y proximidad
 * Usa BABYLON.Vector3.Distance() para calcular distancias
 */

class CollisionManager {
    constructor() {
        // No necesita inicialización especial
        console.log("✅ CollisionManager inicializado");
    }

    /**
     * Calcula la distancia entre dos posiciones
     * @param {BABYLON.Vector3} pos1 - Primera posición
     * @param {BABYLON.Vector3} pos2 - Segunda posición
     * @returns {number} - Distancia entre las posiciones
     */
    getDistance(pos1, pos2) {
        return BABYLON.Vector3.Distance(pos1, pos2);
    }

    /**
     * Verifica si dos objetos están dentro de un rango específico
     * @param {BABYLON.Vector3} pos1 - Posición del primer objeto
     * @param {BABYLON.Vector3} pos2 - Posición del segundo objeto
     * @param {number} range - Rango de detección
     * @returns {boolean} - true si están dentro del rango
     */
    isInRange(pos1, pos2, range) {
        const distance = this.getDistance(pos1, pos2);
        return distance <= range;
    }

    /**
     * Encuentra el objeto más cercano de una lista
     * @param {BABYLON.Vector3} position - Posición de referencia
     * @param {Array} objects - Array de objetos con propiedad .mesh
     * @returns {Object} - { object, distance } del más cercano, o null
     */
    findNearest(position, objects) {
        if (!objects || objects.length === 0) {
            return null;
        }

        let nearest = null;
        let minDistance = Infinity;

        for (let obj of objects) {
            if (!obj.mesh) continue;

            const distance = this.getDistance(position, obj.mesh.position);
            
            if (distance < minDistance) {
                minDistance = distance;
                nearest = obj;
            }
        }

        return nearest ? { object: nearest, distance: minDistance } : null;
    }

    /**
     * Verifica si el submarino puede recoger un buzo
     * @param {BABYLON.Vector3} submarinePos - Posición del submarino
     * @param {BABYLON.Vector3} diverPos - Posición del buzo
     * @returns {boolean} - true si puede recoger
     */
    canPickupDiver(submarinePos, diverPos) {
        return this.isInRange(submarinePos, diverPos, CONFIG.DIVER.PICKUP_DISTANCE);
    }

    /**
     * Verifica si el submarino puede entregar en el barco
     * @param {BABYLON.Vector3} submarinePos - Posición del submarino
     * @param {BABYLON.Vector3} shipPos - Posición del barco
     * @returns {boolean} - true si puede entregar
     */
    canDeliverToShip(submarinePos, shipPos) {
        return this.isInRange(submarinePos, shipPos, CONFIG.SHIP.DROP_DISTANCE);
    }

    /**
     * Encuentra el buzo más cercano que NO ha sido recogido
     * @param {BABYLON.Vector3} position - Posición de referencia (submarino)
     * @param {Array} divers - Array de buzos
     * @returns {Object} - { diver, distance } o null
     */
    findNearestAvailableDiver(position, divers) {
        const availableDivers = divers.filter(diver => !diver.isPickedUp);
        return this.findNearest(position, availableDivers);
    }

    /**
     * Debug: Muestra distancia en consola
     * @param {string} label - Etiqueta descriptiva
     * @param {BABYLON.Vector3} pos1 
     * @param {BABYLON.Vector3} pos2 
     */
    debugDistance(label, pos1, pos2) {
        const distance = this.getDistance(pos1, pos2);
        console.log(`📏 ${label}: ${distance.toFixed(2)} unidades`);
    }
}