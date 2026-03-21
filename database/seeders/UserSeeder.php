<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(['email' => 'admin@municipalidad-megantoni.gob.pe'], [
            'name'     => 'Administrador Municipal',
            'email'    => 'admin@municipalidad-megantoni.gob.pe',
            'password' => $this->resolvePassword('SEED_ADMIN_PASSWORD'),
            'role'     => UserRole::ADMIN,
        ]);

        User::updateOrCreate(['email' => 'funcionario@municipalidad-megantoni.gob.pe'], [
            'name'     => 'Juan Pérez Funcionario',
            'email'    => 'funcionario@municipalidad-megantoni.gob.pe',
            'password' => $this->resolvePassword('SEED_FUNCIONARIO_PASSWORD'),
            'role'     => UserRole::FUNCIONARIO,
        ]);

        User::updateOrCreate(['email' => 'ciudadano@example.com'], [
            'name'     => 'María García Ciudadana',
            'email'    => 'ciudadano@example.com',
            'password' => $this->resolvePassword('SEED_CIUDADANO_PASSWORD'),
            'role'     => UserRole::CIUDADANO,
        ]);
    }

    private function resolvePassword(string $key): string
    {
        $password = env($key);

        if (! is_string($password) || trim($password) === '') {
            // Fallback seguro para evitar contraseñas hardcodeadas en repositorio.
            $password = Str::password(24);
            $this->command?->warn("{$key} no definido. Se generó una contraseña aleatoria para este seed.");
        }

        return Hash::make($password);
    }
}
