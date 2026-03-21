<?php

namespace App\Jobs;

use App\Models\Documento;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ComprimirArchivoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries   = 3;
    public int $timeout = 120;

    public function __construct(private readonly Documento $documento) {}

    public function handle(): void
    {
        $ruta = $this->documento->ruta;

        if (!Storage::disk('local')->exists($ruta)) {
            Log::warning('Archivo no encontrado para comprimir', ['ruta' => $ruta]);
            return;
        }

        $contenido  = Storage::disk('local')->get($ruta);
        $comprimido = gzencode($contenido, 6);
        $rutaGz     = $ruta . '.gz';

        Storage::disk('local')->put($rutaGz, $comprimido);

        Log::info('Archivo comprimido', [
            'original'   => strlen($contenido),
            'comprimido' => strlen($comprimido),
            'ruta_gz'    => $rutaGz,
        ]);
    }

    public function failed(\Throwable $exception): void
    {
        Log::error('Error al comprimir archivo', [
            'documento_id' => $this->documento->id,
            'error'        => $exception->getMessage(),
        ]);
    }
}
