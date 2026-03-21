<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadDocumentoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'archivo'     => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240',
            'nombre'      => 'required|string|max:255',
            'descripcion' => 'nullable|string|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'archivo.required' => 'El archivo es obligatorio.',
            'archivo.mimes'    => 'El archivo debe ser PDF, JPG o PNG.',
            'archivo.max'      => 'El archivo no debe superar los 10 MB.',
        ];
    }
}
