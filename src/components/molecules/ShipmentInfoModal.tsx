
import React from 'react';
import { DynamicIcon } from 'lucide-react/dynamic';

interface ShipmentInfoModalProps {
    onClose: () => void;
}

const ShipmentInfoModal: React.FC<ShipmentInfoModalProps> = ({ setShowShipment }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
                {/* Botón para cerrar el modal */}
                <button
                    onClick={() => setShowShipment(false)}
                    className="absolute top-3 right-3 text-pink-300 hover:text-pink-500 bg-gray-100 p-2 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                    aria-label="Cerrar"
                >
                    <DynamicIcon name="x" color="currentColor" className="text-pink-500" />
                </button>

                <h2 className="text-3xl font-bold mb-4 text-purple-400">Información de Envío</h2>
                
                <div className="text-gray-700 space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-purple-300 mb-2">Envíos a todo El Salvador</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li><span className="font-bold">$3.75 adicionales</span> por medio de <span className="font-semibold">Aeromall</span>.</li>
                            <li><span className="font-bold">$4.00 o más</span> por medio de <span className="font-semibold">C807 Envíos</span> directamente a su casa (sin hora de entrega estimada ⚠️).</li>
                            <li><span className="font-bold">Desde $1.50</span> con <span className="font-semibold">Melo Express</span> o encomiendas (en casillero o punto de entrega).</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-green-500 mb-2">Puntos de Entrega GRATIS</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Multiplaza</li>
                            <li>Soho / Mall Las Cascadas</li>
                            <li>La Gran Vía</li>
                            <li>El Principito</li>
                            <li>UJMD Campus 1 y 2</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-orange-500 mb-2">Entregas con Costo Adicional</h3>
                        <p className="mb-2"><span className="font-bold text-orange-600">Por $0.50 adicionales:</span></p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>Plaza Merliot</li>
                            <li>Zona Peatonal UCA</li>
                        </ul>
                        <p className="mt-3 mb-2"><span className="font-bold text-orange-600">Por $1.00 adicional:</span></p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>Millenium Plaza / Mall Galerías</li>
                            <li>El Salvador del Mundo (Frente a E4CC o parada de buses)</li>
                            <li>Antiguo Cuscatlán (Parque Central)</li>
                        </ul>
                        <p className="mt-3 mb-2"><span className="font-bold text-orange-600">Por $2.00 adicionales:</span></p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>Metrocentro y Metrosur S.S</li>
                            <li>Bambú City Place</li>
                            <li>Universidad Nacional (UES)</li>
                            <li>Universidad Tecnológica (Edificio “Simón Bolivar”)</li>
                            <li>C.C. Autopista Sur</li>
                            <li>Plaza San Luis (Mejicanos)</li>
                            <li>Zaragoza (Súper Selectos 253)</li>
                        </ul>
                    </div>
                    <p className="text-sm text-gray-500 pt-2">
                        * Nota: En la Universidad Matias la entrega depende de la hora, de lo contrario se realizará en La Gran Vía.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShipmentInfoModal;
