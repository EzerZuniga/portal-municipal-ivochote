<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tramites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ciudadano_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('procedimiento_id')->constrained('procedimientos')->restrictOnDelete();
            $table->text('descripcion');
            $table->string('status')->default('pending');
            $table->text('observacion')->nullable();
            $table->json('datos_adicionales')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['ciudadano_id', 'status']);
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tramites');
    }
};
