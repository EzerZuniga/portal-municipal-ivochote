<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name'     => 'Administrador Municipal',
            'email'    => 'admin@municipalidad-megantoni.gob.pe',
            'password' => Hash::make('Admin1234!'),
            'role'     => UserRole::ADMIN,
        ]);

        User::create([
            'name'     => 'Juan Pérez Funcionario',
            'email'    => 'funcionario@municipalidad-megantoni.gob.pe',
            'password' => Hash::make('Func1234!'),
            'role'     => UserRole::FUNCIONARIO,
        ]);

        User::create([
            'name'     => 'María García Ciudadana',
            'email'    => 'ciudadano@example.com',
            'password' => Hash::make('Ciud1234!'),
            'role'     => UserRole::CIUDADANO,
        ]);
    }
}
