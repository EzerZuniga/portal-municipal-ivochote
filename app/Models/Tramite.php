<?php

namespace App\Models;

use App\Enums\TramiteStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tramite extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'ciudadano_id',
        'procedimiento_id',
        'descripcion',
        'status',
        'observacion',
        'datos_adicionales',
    ];

    protected function casts(): array
    {
        return [
            'status'            => TramiteStatus::class,
            'datos_adicionales' => 'array',
        ];
    }

    public function ciudadano(): BelongsTo
    {
        return $this->belongsTo(User::class, 'ciudadano_id');
    }

    public function procedimiento(): BelongsTo
    {
        return $this->belongsTo(Procedimiento::class);
    }

    public function documentos(): HasMany
    {
        return $this->hasMany(Documento::class);
    }

    public function auditLogs(): HasMany
    {
        return $this->hasMany(AuditLog::class, 'model_id')
            ->where('model_type', self::class);
    }

    public function isPending(): bool
    {
        return $this->status === TramiteStatus::PENDING;
    }

    public function isApproved(): bool
    {
        return $this->status === TramiteStatus::APPROVED;
    }
}
