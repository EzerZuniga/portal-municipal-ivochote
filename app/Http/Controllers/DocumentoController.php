<?php

namespace App\Http\Controllers;

use App\Http\Requests\UploadDocumentoRequest;
use App\Models\Documento;
use App\Models\Tramite;
use App\Services\DocumentoService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DocumentoController extends Controller
{
    public function __construct(private readonly DocumentoService $documentoService) {}

    public function index(Tramite $tramite): JsonResponse
    {
        $this->authorize('view', $tramite);

        return response()->json($tramite->documentos);
    }

    public function upload(UploadDocumentoRequest $request, Tramite $tramite): JsonResponse
    {
        $this->authorize('view', $tramite);

        $documento = $this->documentoService->upload(
            $request->file('archivo'),
            $tramite,
            $request->validated()
        );

        return response()->json([
            'message' => 'Documento subido correctamente.',
            'data'    => $documento,
        ], 201);
    }

    public function download(Documento $documento): StreamedResponse
    {
        $this->authorize('download', $documento);

        return $this->documentoService->download($documento);
    }

    public function destroy(Documento $documento): JsonResponse
    {
        $this->authorize('delete', $documento);

        $this->documentoService->delete($documento);

        return response()->json(['message' => 'Documento eliminado correctamente.']);
    }
}
