<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTramiteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'procedimiento_id' => 'required|exists:procedimientos,id',
            'descripcion' => 'required|string|max:1000',
            'datos_adicionales' => 'nullable|array',
        ];
    }

    public function messages(): array
    {
        return [
            'procedimiento_id.required' => 'El procedimiento es obligatorio.',
            'procedimiento_id.exists' => 'El procedimiento seleccionado no existe.',
            'descripcion.required' => 'La descripción es obligatoria.',
        ];
    }
}
