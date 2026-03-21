<?php

namespace App\Jobs;

use App\Models\Documento;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessDocumentJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;

    public int $timeout = 60;

    public function __construct(private readonly Documento $documento) {}

    public function handle(): void
    {
        Log::info('Procesando documento', ['id' => $this->documento->id]);

        // Validaciones de contenido, escaneo de virus, extracción de texto, etc.
    }

    public function failed(\Throwable $exception): void
    {
        Log::error('Error al procesar documento', [
            'documento_id' => $this->documento->id,
            'error' => $exception->getMessage(),
        ]);
    }
}
