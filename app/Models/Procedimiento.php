<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Procedimiento extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nombre',
        'descripcion',
        'requisitos',
        'costo',
        'plazo_dias',
        'activo',
    ];

    protected function casts(): array
    {
        return [
            'requisitos' => 'array',
            'costo' => 'decimal:2',
            'activo' => 'boolean',
        ];
    }

    public function tramites(): HasMany
    {
        return $this->hasMany(Tramite::class);
    }
}
