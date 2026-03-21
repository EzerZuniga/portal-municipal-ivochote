<?php

namespace App\Enums;

enum UserRole: string
{
    case CIUDADANO   = 'ciudadano';
    case FUNCIONARIO = 'funcionario';
    case ADMIN       = 'admin';

    public function label(): string
    {
        return match ($this) {
            self::CIUDADANO   => 'Ciudadano',
            self::FUNCIONARIO => 'Funcionario',
            self::ADMIN       => 'Administrador',
        };
    }

    public function permissions(): array
    {
        return match ($this) {
            self::CIUDADANO   => ['tramites.create', 'tramites.view.own', 'documentos.upload'],
            self::FUNCIONARIO => ['tramites.view.all', 'tramites.update_status', 'documentos.view'],
            self::ADMIN       => ['*'],
        };
    }
}
