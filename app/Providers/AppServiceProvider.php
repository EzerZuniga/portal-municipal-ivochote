<?php

namespace App\Providers;

use App\Models\Documento;
use App\Models\Tramite;
use App\Policies\DocumentoPolicy;
use App\Policies\TramitePolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Registro de policies por modelo.
     */
    protected array $policies = [
        Tramite::class => TramitePolicy::class,
        Documento::class => DocumentoPolicy::class,
    ];

    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        foreach ($this->policies as $model => $policy) {
            Gate::policy($model, $policy);
        }
    }
}
