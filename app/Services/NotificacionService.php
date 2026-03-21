<?php

namespace App\Services;

use App\Enums\TramiteStatus;
use App\Jobs\SendNotificacionJob;
use App\Models\Tramite;
use App\Notifications\TramiteAprobado;
use App\Notifications\TramiteStatusChanged;

class NotificacionService
{
    public function notifyStatusChange(Tramite $tramite, TramiteStatus $oldStatus): void
    {
        if ($tramite->status === $oldStatus) {
            return;
        }

        if ($tramite->status === TramiteStatus::APPROVED) {
            SendNotificacionJob::dispatch(
                $tramite->ciudadano,
                TramiteAprobado::class,
                [$tramite]
            );
        } else {
            SendNotificacionJob::dispatch(
                $tramite->ciudadano,
                TramiteStatusChanged::class,
                [$tramite, $oldStatus]
            );
        }
    }
}
