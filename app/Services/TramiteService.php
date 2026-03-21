<?php

namespace App\Services;

use App\Enums\TramiteStatus;
use App\Models\Tramite;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

class TramiteService
{
    public function __construct(
        private readonly AuditService $auditService,
        private readonly NotificacionService $notificacionService
    ) {}

    public function list(User $user): LengthAwarePaginator
    {
        $query = Tramite::with(['procedimiento', 'ciudadano'])->latest();

        if ($user->isCiudadano()) {
            $query->where('ciudadano_id', $user->id);
        }

        return $query->paginate(15);
    }

    public function create(array $data, User $user): Tramite
    {
        $tramite = Tramite::create([
            ...$data,
            'ciudadano_id' => $user->id,
            'status' => TramiteStatus::PENDING,
        ]);

        $this->auditService->log('tramite.created', $tramite, $user);

        return $tramite->load(['procedimiento', 'ciudadano']);
    }

    public function updateStatus(Tramite $tramite, array $data, User $actor): Tramite
    {
        $oldStatus = $tramite->status;

        $tramite->update($data);

        $this->auditService->log('tramite.status_changed', $tramite, $actor, [
            'old_status' => $oldStatus->value,
            'new_status' => $tramite->status->value,
        ]);

        $this->notificacionService->notifyStatusChange($tramite, $oldStatus);

        return $tramite->fresh();
    }

    public function delete(Tramite $tramite, User $actor): void
    {
        $this->auditService->log('tramite.deleted', $tramite, $actor);

        $tramite->delete();
    }
}
