<?php

namespace Database\Seeders;

use App\Models\Procedimiento;
use Illuminate\Database\Seeder;

class ProcedimientoSeeder extends Seeder
{
    public function run(): void
    {
        $procedimientos = [
            [
                'nombre'      => 'Licencia de Funcionamiento',
                'descripcion' => 'Autorización para operar un establecimiento comercial.',
                'requisitos'  => [
                    'DNI del titular',
                    'Contrato de alquiler o título de propiedad',
                    'Certificado de Defensa Civil',
                    'Llenado de formulario F-001',
                ],
                'costo'      => 120.00,
                'plazo_dias' => 15,
                'activo'     => true,
            ],
            [
                'nombre'      => 'Constancia de Residencia',
                'descripcion' => 'Documento que acredita el lugar de residencia del ciudadano.',
                'requisitos'  => [
                    'DNI vigente',
                    'Recibo de luz o agua',
                ],
                'costo'      => 20.00,
                'plazo_dias' => 3,
                'activo'     => true,
            ],
            [
                'nombre'      => 'Certificado de Posesión',
                'descripcion' => 'Acredita la posesión de un predio dentro del distrito.',
                'requisitos'  => [
                    'DNI del solicitante',
                    'Declaración jurada',
                    'Plano de ubicación',
                ],
                'costo'      => 80.00,
                'plazo_dias' => 10,
                'activo'     => true,
            ],
        ];

        foreach ($procedimientos as $data) {
            Procedimiento::create($data);
        }
    }
}
