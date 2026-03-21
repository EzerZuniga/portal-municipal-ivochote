<?php

namespace App\Services;

use App\Jobs\ComprimirArchivoJob;
use App\Jobs\ProcessDocumentJob;
use App\Models\Documento;
use App\Models\Tramite;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DocumentoService
{
    private string $disk = 'documentos';

    public function upload(UploadedFile $file, Tramite $tramite, array $data): Documento
    {
        $path = $file->store('tramite-'.$tramite->id, $this->disk);

        $documento = Documento::create([
            'tramite_id' => $tramite->id,
            'nombre' => $data['nombre'],
            'descripcion' => $data['descripcion'] ?? null,
            'ruta' => $path,
            'mime_type' => $file->getMimeType(),
            'tamano' => $file->getSize(),
        ]);

        ProcessDocumentJob::dispatch($documento);
        ComprimirArchivoJob::dispatch($documento);

        return $documento;
    }

    public function download(Documento $documento): StreamedResponse
    {
        if (! Storage::disk($this->disk)->exists($documento->ruta)) {
            abort(404, 'El documento no fue encontrado.');
        }

        return Storage::disk($this->disk)->download($documento->ruta, $documento->nombre);
    }

    public function delete(Documento $documento): void
    {
        Storage::disk($this->disk)->delete($documento->ruta);

        $documento->delete();
    }
}
