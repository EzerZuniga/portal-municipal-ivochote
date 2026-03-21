<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Limpiar audit logs con más de 90 días
Schedule::command('model:prune', ['--model' => 'App\\Models\\AuditLog'])
    ->daily()
    ->description('Eliminar audit logs con más de 90 días');
