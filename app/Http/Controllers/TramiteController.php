<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTramiteRequest;
use App\Http\Requests\UpdateStatusRequest;
use App\Models\Tramite;
use App\Services\TramiteService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TramiteController extends Controller
{
    public function __construct(private readonly TramiteService $tramiteService) {}

    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', Tramite::class);

        $tramites = $this->tramiteService->list($request->user());

        return response()->json($tramites);
    }

    public function store(StoreTramiteRequest $request): JsonResponse
    {
        $this->authorize('create', Tramite::class);

        $tramite = $this->tramiteService->create($request->validated(), $request->user());

        return response()->json([
            'message' => 'Trámite creado correctamente.',
            'data'    => $tramite,
        ], 201);
    }

    public function show(Tramite $tramite): JsonResponse
    {
        $this->authorize('view', $tramite);

        return response()->json($tramite->load(['documentos', 'procedimiento', 'ciudadano']));
    }

    public function updateStatus(UpdateStatusRequest $request, Tramite $tramite): JsonResponse
    {
        $this->authorize('updateStatus', $tramite);

        $tramite = $this->tramiteService->updateStatus($tramite, $request->validated(), $request->user());

        return response()->json([
            'message' => 'Estado del trámite actualizado.',
            'data'    => $tramite,
        ]);
    }

    public function destroy(Request $request, Tramite $tramite): JsonResponse
    {
        $this->authorize('delete', $tramite);

        $this->tramiteService->delete($tramite, $request->user());

        return response()->json(['message' => 'Trámite eliminado correctamente.']);
    }
}
