<?php

namespace App\Services;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Request;

class AuditService
{
    public function log(string $action, Model $model, ?User $user = null, array $metadata = []): AuditLog
    {
        // ip() y userAgent() devuelven null fuera del contexto HTTP (e.g. jobs de cola)
        return AuditLog::create([
            'action'     => $action,
            'model_type' => get_class($model),
            'model_id'   => $model->getKey(),
            'user_id'    => $user?->id,
            'metadata'   => $metadata,
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent(),
        ]);
    }
}
